import type { ArtifactStatus } from "./generated/prisma/client";
import type { AppProject } from "./app-types";
import type { PublishVisibility } from "./publish/visibility";
import { badgeVariantStyles, mutedTextStyles } from "./ui-theme";


export type ProjectStatusVariant = "success" | "info" | 'orange' | "muted";

export type projectStatusInfo = {
    label: string;
    variant: ProjectStatusVariant;
    detail: string;
};

export function getProjectStatus(project: AppProject): projectStatusInfo {
    if (project.deployment) {
        return {
            label: "Live",
            variant: "success",
            detail: publishVisibilityLabel(project.deployment.visibility)
        };
    }

    if (project.artifacts.length === 0) {
        return {
            label: "Empty",
            variant: "muted",
            detail: "No artifacts yet"
        }
    }

    const readyCount = project.artifacts.filter(
        (artifact) => artifact.status === "READY",
    ).length;

    if (readyCount === project.artifacts.length) {
        return {
            label: "Ready",
            variant: "info",
            detail: "All artifacts built."
        }
    }

    if (readyCount > 0) {
        return {
            label: "In progress",
            variant: "orange",
            detail: `${readyCount} of ${project.artifacts.length} artifacts ready`,
        };
    }

    if (project.fileCount > 0) {
        return {
            label: "Draft",
            variant: "muted",
            detail: `${project.fileCount} file ${project.fileCount === 1 ? "" : "s"}`
        };
    }

    return {
        label: "Draft",
        variant: "muted",
        detail: "Not started"
    };
}

export function artifactStatusLabel(status: ArtifactStatus) {
    return status === "READY" ? "Ready" : "Draft"
}

export function artifactStatusVariant(
    status: ArtifactStatus
): ProjectStatusVariant {
    return status === "READY" ? "info" : "muted";
}

function publishVisibilityLabel(visibility: PublishVisibility) {
    if (visibility === "public") return "Public";
    if (visibility === "workspace") return "Workspace";
    return "Private";
}
