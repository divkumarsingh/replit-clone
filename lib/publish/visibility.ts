import type { DeploymentVisibility } from "../generated/prisma/client";

export type PublishVisibility = "private" | "workspace" | "public";

export function toDeploymentVisibility(
    visibility: PublishVisibility
): DeploymentVisibility {
    switch (visibility) {
        case "private":
            return "PRIVATE"
        case "workspace":
            return "WORKSPACE_ONLY"
        case "public":
            return "PUBLIC"
    }
}

export function fromDeploymentVisibility(
    visibility: DeploymentVisibility
): PublishVisibility {
    switch (visibility) {
        case "PRIVATE":
            return "private"
        case "WORKSPACE_ONLY":
            return "workspace"
        case "PUBLIC":
            return "public"
    }
}

export function publishPath(workspaceSlug: string, projectSlug: string) {
    return `/p/${workspaceSlug}/${projectSlug}`;
}