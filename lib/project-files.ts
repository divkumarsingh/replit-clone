import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "./prisma";

export const PROJECT_WORKSPACE_ROOT = path.join(
    process.cwd(),
    "public",
    "project-workspace",
);

export function artifactWorkspaceDir(projectId: string, artifactSlug: string) {
    return path.join(PROJECT_WORKSPACE_ROOT, projectId, artifactSlug);
}

const MIME_BY_EXT: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".htm": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".txt": "text/plain; charset=utf-8",
};

export function getMimeType(filePath: string) {
    const ext = path.extname(filePath).toLowerCase();
    return MIME_BY_EXT[ext] ?? "application/octet-stream";
}

/** Ensures relative asset URLs in artifact HTML resolve under the preview API path. */
export function injectPreviewBaseHref(
    html: string,
    projectId: string,
    artifactSlug: string,
) {
    const baseHref = `/api/projects/${projectId}/preview/${artifactSlug}/`;
    const baseTag = `<base href="${baseHref}" />`;

    if (/<base\s/i.test(html)) {
        return html.replace(/<base\s[^>]*\/?>/i, baseTag);
    }

    if (/<head[^>]*>/i.test(html)) {
        return html.replace(/<head([^>]*)>/i, `<head$1>\n  ${baseTag}`);
    }

    return `${baseTag}\n${html}`;
}

/** Remove preview-only base tags so downloaded HTML works locally. */
export function stripPreviewBaseHref(html: string) {
    return html.replace(/<base\s[^>]*\/?>\s*/i, "");
}

export function normalizeRelativePath(input: string) {
    const segments = input
        .replace(/\\/g, "/")
        .split("/")
        .map((segment) => segment.trim())
        .filter((segment) => segment && segment !== "." && segment !== "..");

    return segments.join("/");
}

export function buildDbPath(artifactSlug: string, relativePath: string) {
    const normalized = normalizeRelativePath(relativePath);
    if (!normalized) {
        throw new Error("Invalid file path.");
    }

    return `${artifactSlug}/${normalized}`;
}

function getAbsolutePath(
    projectId: string,
    artifactSlug: string,
    relativePath: string,
) {
    const normalized = normalizeRelativePath(relativePath);
    if (!normalized) {
        throw new Error("Invalid file path.");
    }

    const artifactDir = path.join(
        PROJECT_WORKSPACE_ROOT,
        projectId,
        artifactSlug,
    );
    const absolute = path.resolve(artifactDir, normalized);

    if (!absolute.startsWith(path.resolve(artifactDir))) {
        throw new Error("Path escapes project workspace.");
    }

    return absolute;
}

export async function listProjectFiles(
    projectId: string,
    artifactSlug?: string,
) {
    const files = await prisma.projectFile.findMany({
        where: {
            projectId,
            ...(artifactSlug ? { path: { startsWith: `${artifactSlug}/` } } : {}),
        },
        orderBy: { path: "asc" },
        select: {
            id: true,
            path: true,
            artifactId: true,
            updatedAt: true,
            sizeBytes: true,
        },
    });

    return files.map((file) => ({
        ...file,
        updatedAt: file.updatedAt.toISOString(),
    }));
}

export async function readProjectFile(
    projectId: string,
    artifactSlug: string,
    relativePath: string,
) {
    const dbPath = buildDbPath(artifactSlug, relativePath);
    const record = await prisma.projectFile.findUnique({
        where: {
            projectId_path: { projectId, path: dbPath },
        },
        select: { path: true },
    });

    if (!record) {
        return null;
    }

    const absolute = getAbsolutePath(projectId, artifactSlug, relativePath);
    const content = await readFile(absolute, "utf8");
    return content;
}

export async function writeProjectFile({
    projectId,
    artifactSlug,
    artifactId,
    relativePath,
    content,
}: {
    projectId: string;
    artifactSlug: string;
    artifactId?: string | null;
    relativePath: string;
    content: string;
}) {
    const normalized = normalizeRelativePath(relativePath);
    if (!normalized) {
        throw new Error("Invalid file path.");
    }

    const dbPath = buildDbPath(artifactSlug, normalized);
    const absolute = getAbsolutePath(projectId, artifactSlug, normalized);
    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, content, "utf8");

    const sizeBytes = Buffer.byteLength(content, "utf8");
    const mimeType = getMimeType(normalized);
    const storageKey = `workspace/${projectId}/${artifactSlug}/${normalized}`;

    const file = await prisma.projectFile.upsert({
        where: {
            projectId_path: { projectId, path: dbPath },
        },
        create: {
            projectId,
            artifactId: artifactId ?? null,
            path: dbPath,
            storageKey,
            mimeType,
            sizeBytes,
        },
        update: {
            artifactId: artifactId ?? null,
            storageKey,
            mimeType,
            sizeBytes,
        },
        select: {
            path: true,
            updatedAt: true,
        },
    });

    return {
        path: file.path,
        relativePath: normalized,
        updatedAt: file.updatedAt.toISOString(),
    };
}
