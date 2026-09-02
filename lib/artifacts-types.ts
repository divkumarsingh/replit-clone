import { PROMPT_ATTACHMENT_DIR, PromptAttachment } from "./prompt-attachments";
import type { ArtifactStatus, ArtifactType } from "./generated/prisma/client";
import type { ProjectCategory } from "./types";
import { artifactTypeLabels, type AppAgentMessage } from "./app-types";
import { HMR_MESSAGE_SENT_TO_SERVER } from "next/dist/server/dev/hot-reloader-types";


export const MAX_ARTIFACTS_PER_PROJECT = 7;
export const MIN_ARTIFACTS_PER_PROJECT = 1;

export const agentBuildableArtifactTypes = [
    "MOBILE_APP",
    "WEB_APP",
    "DESIGN",
] as const satisfies readonly ArtifactType[];

export function artifactSupportAgentBuild(type: ArtifactType) {
    return (agentBuildableArtifactTypes as readonly ArtifactType[]).includes(type);
}

export function artifactHasFiles(files: Array<{ path: string }>, artifactSlug: string) {
    return files.some((file) => {
        if (!file.path.startsWith(`${artifactSlug}/`)) return false;
        const relative = file.path.slice(`${artifactSlug}/`.length);
        return !relative.startsWith(`${PROMPT_ATTACHMENT_DIR}`)
    });
}

export function artifactHasPreviewContent(
    artifact: { slug: string; status: ArtifactStatus; },
    files: Array<{ path: string }>,
    messages: AppAgentMessage[] = []
) {
    if (artifactHasFiles(files, artifact.slug)) return true;
    if (artifact.status === "READY") return true;

    const prefix = `${artifact.slug}/`;
    return messages.some((message) =>
        message.metadata?.fileWrites?.some((file) => file.path.startsWith(prefix)),
    );
}

export function getArtifactEmptyStateMessage(type: ArtifactType) {
    if (!artifactSupportAgentBuild(type)) {
        return {
            description: `${artifactTypeLabels[type]} artifacts are not supported yet.`,
            hint: "Switch to web app or mobile app, or add new artifact with +."
        };
    };

    switch (type) {
        case "DESIGN":
            return {
                description: "Design mockups and wireframes will appear here.",
                hint: "Ask Agent to build a layout, or use plan mode to iterate without writing files."
            };
        case "MOBILE_APP":
            return {
                description: "A mobile-focused preview will render here.",
                hint: "Select this tab and ask Agent to build a phone-size version."
            }
        default:
            return {
                description: "Live preview will render here as Agent builds your app.",
                hint: "Select this tab and tell Agent what to build."
            };
    }
}

// Build add from + icon.
export const addableArtifactTypes: Array<{
    type: ArtifactType;
    label: string;
    icon: ProjectCategory["icon"];
}> = [
        { type: "WEB_APP", label: artifactTypeLabels.WEB_APP, icon: "website" },
        { type: "MOBILE_APP", label: artifactTypeLabels.MOBILE_APP, icon: "mobile" },
        { type: "DESIGN", label: artifactTypeLabels.DESIGN, icon: "design" }
    ]