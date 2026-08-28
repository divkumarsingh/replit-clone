import { string } from "better-auth";
import { slugifyUserName, uniqueSlugWithSuffix } from "../app-utils";
import { prisma } from "../prisma";
import { defaultWorkspaceSlugFromUser } from "../workspace-slug";
import { uniqueWorkspaceSlug } from "../workspace-slug";
import { ReactJsxRuntime } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";

type ProvisionUserInput = {
    id: string;
    name?: string | null;
    email?: string | null;
    username?: string | null;
}

async function uniqueUsername(base: string) {
    return uniqueSlugWithSuffix(
        base,
        async (candidate) => {
            const existing = await prisma.user.findUnique({
                where: { username: candidate },
                select: { id: true }
            });
            return Boolean(existing);
        }, "user"
    );
};

export async function provisionNewUser(user: ProvisionUserInput) {
    if (!user.id) return;

    const userId = user.id;
    const baseUsername = slugifyUserName(
        user.username ?? user.name ?? user.email?.split("@")[0] ?? "user",

    );

    const username = user.username ?? (await uniqueUsername(baseUsername));
    const workspaceSlug = await uniqueWorkspaceSlug(
        defaultWorkspaceSlugFromUser({ username, name: user.name }),
    );

    if (!user.username) {
        await prisma.user.update({
            where: { id: userId },
            data: { username },
        })
    }

    const existingWorkspace = await prisma.workspace.findFirst({
        where: {
            ownerId: userId,
            type: "PERSONAL"
        },
        select: { id: true }
    });

    if (existingWorkspace) return;

    await prisma.workspace.create({
        data: {
            name: `${user.name ?? username}'s Workspace`,
            slug: workspaceSlug,
            type: "PERSONAL",
            ownerId: userId,
            members: {
                create: {
                    userId,
                    role: "ADMIN",
                }
            }
        }
    })
}