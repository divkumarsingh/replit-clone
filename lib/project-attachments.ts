import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { formatFileSize } from "./app-utils";
import { buildDbPath, getMimeType, listProjectFiles, normalizeRelativePath } from "./project-files";
import { prisma } from "./prisma";
import { PROMPT_ATTACHMENT_DIR } from "./prompt-attachments";


const TEXT_EXTENSIONS = new Set([
    ".txt",
    ".md",
    ".csv",
    ".json",
    ".xml",
    ".html",
    ".htm",
    ".yaml",
    ".yml",
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".py",
    ".java",
    ".cpp",
    ".c",
    ".go",
    ".rs",
    ".css",
    ".svg",
    ".rtf",
]);

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

const MAX_ATTACHMENT_CONTEXT_CHARS = 12_000;
const MAX_VISION_IMAGES = 5;
const MAX_VISION_IMAGE_BYTES = 5 * 1024 * 1024;

export type StoredPromptAttachment = {
    name: string;
    path: string;
    mimeType: string | null;
    sizeBytes: number;
};

function getWorkspaceDir(projectId: string, artifactSlug: string) {
    return path.join(process.cwd(), "public", "project-workspace", projectId, artifactSlug);
}

function getAbsoluteAttachmentPath(
    projectId: string,
    artifactSlug: string,
    relativePath: string,
) {
    const normalized = normalizeRelativePath(relativePath);
    const artifactDir = getWorkspaceDir(projectId, artifactSlug);
    const absolute = path.resolve(artifactDir, normalized);

    if (!absolute.startsWith(path.resolve(artifactDir))) {
        throw new Error("Path escapes project workspace.");
    }

    return absolute;
}

function sanitizeFilename(filename: string) {
    const base = path.basename(filename).replace(/[^\w.\-() ]+/g, "_");
    return base || "attachment";
}

function uniqueFilename(filename: string, used: Set<string>) {
    const safeName = sanitizeFilename(filename);
    if (!used.has(safeName)) {
        used.add(safeName);
        return safeName;
    }

    const extension = path.extname(safeName);
    const stem = path.basename(safeName, extension);

    let index = 2;
    while (used.has(`${stem}-${index}${extension}`)) {
        index += 1;
    }

    const nextName = `${stem}-${index}${extension}`;
    used.add(nextName);
    return nextName;
}

export function isTextAttachmentPath(relativePath: string) {
    const extension = path.extname(relativePath).toLowerCase();
    return TEXT_EXTENSIONS.has(extension);
}

export function isImageAttachmentPath(relativePath: string, mimeType?: string | null) {
    const extension = path.extname(relativePath).toLowerCase();
    if (IMAGE_EXTENSIONS.has(extension)) return true;
    return Boolean(mimeType?.startsWith("image/") && mimeType !== "image/svg+xml");
}

export function formatAttachmentManifest(attachments: StoredPromptAttachment[]) {
    if (attachments.length === 0) return "";

    const lines = attachments.map(
        (attachment) =>
            `- ${attachment.name} (${formatFileSize(attachment.sizeBytes)}) → \`${attachment.path}\``,
    );

    return `\n\nAttached files (saved under \`_attachments/\`, use read_file or list_files):\n${lines.join("\n")}`;
}

function truncateText(content: string, maxChars: number) {
    if (content.length <= maxChars) return content;
    return `${content.slice(0, maxChars)}\n… [truncated]`;
}

export async function savePromptAttachmentsToArtifact({
    projectId,
    artifactId,
    artifactSlug,
    files,
}: {
    projectId: string;
    artifactId: string;
    artifactSlug: string;
    files: File[];
}): Promise<StoredPromptAttachment[]> {
    if (files.length === 0) return [];

    const stored: StoredPromptAttachment[] = [];
    const usedNames = new Set<string>();

    for (const file of files) {
        const filename = uniqueFilename(file.name, usedNames);
        const relativePath = `${PROMPT_ATTACHMENT_DIR}/${filename}`;
        const dbPath = buildDbPath(artifactSlug, relativePath);
        const absolute = getAbsoluteAttachmentPath(projectId, artifactSlug, relativePath);
        const bytes = Buffer.from(await file.arrayBuffer());
        const mimeType = file.type || getMimeType(filename);

        await mkdir(path.dirname(absolute), { recursive: true });
        await writeFile(absolute, bytes);

        await prisma.projectFile.create({
            data: {
                projectId,
                artifactId,
                path: dbPath,
                storageKey: `workspace/${projectId}/${artifactSlug}/${relativePath}`,
                mimeType,
                sizeBytes: bytes.length,
            },
        });

        stored.push({
            name: file.name,
            path: relativePath,
            mimeType,
            sizeBytes: bytes.length,
        });
    }

    return stored;
}

async function readAttachmentRecord(projectId: string, artifactSlug: string, relativePath: string) {
    const dbPath = buildDbPath(artifactSlug, relativePath);
    return prisma.projectFile.findUnique({
        where: {
            projectId_path: { projectId, path: dbPath },
        },
        select: {
            mimeType: true,
            sizeBytes: true,
        },
    });
}

export async function readAttachmentBuffer(
    projectId: string,
    artifactSlug: string,
    relativePath: string,
) {
    const absolute = getAbsoluteAttachmentPath(projectId, artifactSlug, relativePath);
    const content = await readFile(absolute);
    const record = await readAttachmentRecord(projectId, artifactSlug, relativePath);

    return {
        content,
        mimeType: record?.mimeType ?? getMimeType(relativePath),
        sizeBytes: record?.sizeBytes ?? content.length,
    };
}

export async function readAttachmentText(
    projectId: string,
    artifactSlug: string,
    relativePath: string,
) {
    const { content, mimeType, sizeBytes } = await readAttachmentBuffer(
        projectId,
        artifactSlug,
        relativePath,
    );

    return {
        text: content.toString("utf8"),
        mimeType,
        sizeBytes,
    };
}

export type AgentAttachmentImage = {
    path: string;
    mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
    data: string;
};

export async function buildAttachmentContextForAgent(
    projectId: string,
    artifactSlug: string,
): Promise<{
    summary: string;
    images: AgentAttachmentImage[];
    attachments: StoredPromptAttachment[];
}> {
    const files = await listProjectFiles(projectId, artifactSlug);
    const prefix = `${PROMPT_ATTACHMENT_DIR}/`;

    const attachments = files
        .filter((file) => file.path.replace(`${artifactSlug}/`, "").startsWith(prefix))
        .map((file) => ({
            name: path.basename(file.path),
            path: file.path.replace(`${artifactSlug}/`, ""),
            mimeType: null as string | null,
            sizeBytes: file.sizeBytes,
        }));

    if (attachments.length === 0) {
        return { summary: "", images: [], attachments: [] };
    }

    const sections: string[] = [
        "Prompt attachments provided by the user:",
        ...attachments.map(
            (attachment) =>
                `- ${attachment.name} → \`${attachment.path}\` (${formatFileSize(attachment.sizeBytes)})`,
        ),
        "",
        "Use list_files and read_file to access text attachments. Reference images with relative paths like `_attachments/filename.png` in HTML/CSS. Incorporate attachment content and assets into the build.",
    ];

    let usedChars = sections.join("\n").length;
    const images: AgentAttachmentImage[] = [];

    for (const attachment of attachments) {
        if (isImageAttachmentPath(attachment.path, attachment.mimeType)) {
            if (images.length >= MAX_VISION_IMAGES) continue;
            if (attachment.sizeBytes > MAX_VISION_IMAGE_BYTES) {
                sections.push(
                    `\nImage \`${attachment.path}\` is too large for inline vision (${formatFileSize(attachment.sizeBytes)}). Reference it by path in the artifact.`,
                );
                continue;
            }

            const { content, mimeType } = await readAttachmentBuffer(
                projectId,
                artifactSlug,
                attachment.path,
            );

            const mediaType = normalizeVisionMediaType(mimeType, attachment.path);
            if (!mediaType) continue;

            images.push({
                path: attachment.path,
                mediaType,
                data: content.toString("base64"),
            });
            continue;
        }

        if (!isTextAttachmentPath(attachment.path)) {
            sections.push(
                `\nBinary attachment \`${attachment.path}\` (${formatFileSize(attachment.sizeBytes)}) — not readable as text. Use the filename and user prompt for context.`,
            );
            continue;
        }

        if (usedChars >= MAX_ATTACHMENT_CONTEXT_CHARS) continue;

        const { text, sizeBytes } = await readAttachmentText(
            projectId,
            artifactSlug,
            attachment.path,
        );
        const remaining = MAX_ATTACHMENT_CONTEXT_CHARS - usedChars;
        const snippet = truncateText(text, Math.min(remaining, 4000));
        sections.push(`\n--- ${attachment.path} ---\n${snippet}`);
        usedChars += snippet.length + attachment.path.length + 8;

        attachment.mimeType = getMimeType(attachment.path);
        attachment.sizeBytes = sizeBytes;
    }

    return {
        summary: sections.join("\n"),
        images,
        attachments,
    };
}

function normalizeVisionMediaType(
    mimeType: string,
    relativePath: string,
): AgentAttachmentImage["mediaType"] | null {
    if (mimeType === "image/jpeg" || mimeType === "image/png" || mimeType === "image/gif" || mimeType === "image/webp") {
        return mimeType;
    }

    const extension = path.extname(relativePath).toLowerCase();
    if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
    if (extension === ".png") return "image/png";
    if (extension === ".gif") return "image/gif";
    if (extension === ".webp") return "image/webp";

    return null;
}
