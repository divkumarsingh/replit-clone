import type { Prisma } from '@/lib/generated/prisma/client';

import { prisma } from '@/lib/prisma';

export function projectMemberAccessOr(
    userId: string,
): Prisma.ProjectWhereInput['OR'] {
    return [
        { workspace: { ownerId: userId } },
        { workspace: { members: { some: { userId } } } },
        { members: { some: { userId } } },
    ];
}

export function projectAccessWhere(
    userId: string,
    opts?: { includeTrashed?: boolean },
): Prisma.ProjectWhereInput {
    return {
        ...(opts?.includeTrashed ? {} : { deletedAt: null }),
        OR: projectMemberAccessOr(userId),
    };
}

export async function getAccessibleProject<S extends Prisma.ProjectSelect>(
    projectId: string,
    userId: string,
    select: S,
    opts?: { includeTrashed?: boolean },
) {
    return prisma.project.findFirst({
        where: {
            id: projectId,
            ...projectAccessWhere(userId, opts),
        },
        select,
    });
}

export async function hasProjectAccess(
    projectId: string,
    userId: string,
    opts?: { includeTrashed?: boolean },
) {
    const project = await getAccessibleProject(
        projectId,
        userId,
        { id: true },
        opts,
    );
    return Boolean(project);
}
