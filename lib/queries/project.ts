import type { ArtifactType, ArtifactStatus, DeploymentVisibility } from "../generated/prisma/client";
import { fromDeploymentVisibility } from "../publish/visibility";
import { projectAccessWhere } from "../projects/access";
import { prisma } from "../prisma";

export async function getDefaultWorkspace(userId: string) {
    return prisma.workspace.findFirst({
        where: {
            ownerId: userId,
            type: "PERSONAL"
        },
        select: { id: true, name: true, slug: true, type: true },
    });
}