import type { ArtifactType, ArtifactStatus, DeploymentVisibility } from "../generated/prisma/client";
import { fromDeploymentVisibility } from "../publish/visibility";
import { projectAccessWhere } from "../projects/access";
import { prisma } from "../prisma";
import { StringFilter } from "../generated/prisma/commonInputTypes";

export async function getDefaultWorkspace(userId: string) {
    return prisma.workspace.findFirst({
        where: {
            ownerId: userId,
            type: "PERSONAL"
        },
        select: { id: true, name: true, slug: true, type: true },
    });
}

export async function getProjectBySlugs(
    userId: string,
    workspaceSlug: string,
    projectSlug: string
) {
    const project = await prisma.project.findFirst({
        where: {
            slug: projectSlug,
            workspace: { slug: workspaceSlug },
            ...projectAccessWhere(userId)
        },
        include: {
            workspace: { select: { id: true, name: true, slug: true } },
            artifacts: {
                orderBy: { sortOrder: "asc" },

            }
        }
    })
}