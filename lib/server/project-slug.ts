import { string } from "better-auth";
import { slugify, uniqueSlugWithSuffix } from "../app-utils";
import { prisma } from "../prisma";

const PROJECT_SLUG_MAX_LENGTH = 28;

export function projectSlugFromPrompt(prompt: string) {
    const words = prompt.trim().split(/\s+/).slice(0, 4).join(" ");
    const slug = slugify(words).slice(0, PROJECT_SLUG_MAX_LENGTH);
    return slug || "untitled";
}

export async function uniqueProjectSlug(workspaceId: string, base: string) {
    return uniqueSlugWithSuffix(
        base,
        async (candidate) => {
            const existing = await prisma.project.findUnique({
                where: {
                    workspaceId_slug: {
                        workspaceId,
                        slug: candidate
                    },

                },
                select: { id: true }
            });
            return Boolean(existing);
        },
        "untitled-project"
    );
}