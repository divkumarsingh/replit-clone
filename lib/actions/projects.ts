"use server"

import { redirect } from "next/navigation";
import { rm } from "node:fs/promises";
import { revalidatePath } from "next/cache";
import { getCachedSession } from "../auth/ cached";
import { validate, z } from "zod";
import path from "node:path";
import { validatePromptAttachment } from "../prompt-attachments";
import { getDefaultWorkspace } from "../queries/project";
import { getUserBillingFields } from "../queries/billing";
import { getAppTier, getProjectLimit, projectLimitMessage } from "../billing/entitlement";
import { prisma } from "../prisma";
import { projectSlugFromPrompt, uniqueProjectSlug } from "../server/project-slug";
import { ArtifactType } from "../generated/prisma/client";
import { categoryToArtifactType } from "../app-types";
import { createTelemetry } from "better-auth";


export async function createProjectAction(formData: FormData) {
    const session = await getCachedSession();
    const userId = session?.user?.id;

    if (!userId) {
        redirect('/?auth=login&callbackUrl=/app');
    }

    const prompt = String(formData.get('prompt') ?? '').trim();
    const categoryId = formData.get('categoryId');
    const planMode = formData.get('planMode') === 'true';

    const attachmentFiles: File[] = [];
    for (const [key, value] of formData.entries()) {
        if (
            key.startsWith('attachment-') &&
            value instanceof File &&
            value.size > 0
        ) {
            attachmentFiles.push(value);
        }
    }

    if (!prompt && attachmentFiles.length === 0) {
        return { error: 'Describe what you want to build or attacha file first.' };
    }

    for (const file of attachmentFiles) {
        const validationError = validatePromptAttachment(file);
        if (validationError) {
            return { error: validationError };
        }
    }

    const workspace = await getDefaultWorkspace(userId);
    if (!workspace) {
        return { error: 'No workspace found. Try signing in again.' };
    }

    const billingUser = await getUserBillingFields(userId);
    const projectLimit = getProjectLimit(getAppTier(billingUser));
    if (projectLimit !== null) {
        const activeProjectCount = await prisma.project.count({
            where: {
                deletedAt: null,
                OR: [
                    { createdById: userId },
                    { workspace: { ownerId: userId } },
                    { members: { some: { userId } } },
                ],
            },
        });

        if (activeProjectCount >= projectLimit) {
            return { error: projectLimitMessage(projectLimit) };
        }
    }

    const effectivePrompt =
        prompt ||
        `Review the attached file${attachmentFiles.length === 1 ? '' : 's'} and help me plan next steps.`;

    const baseName =
        effectivePrompt.length > 48
            ? `${effectivePrompt.slice(0, 45)}...`
            : effectivePrompt;
    const slug = await uniqueProjectSlug(
        workspace.id,
        projectSlugFromPrompt(effectivePrompt),
    );

    const artifactType: ArtifactType =
        categoryId &&
            typeof categoryId === 'string' &&
            categoryId in categoryToArtifactType
            ? categoryToArtifactType[
            categoryId as keyof typeof categoryToArtifactType
            ]
            : 'WEB_APP';

    const project = await prisma.project.create({
        data: {
            name: baseName,
            slug,
            description: effectivePrompt,
            workspaceId: workspace.id,
            createdById: userId,
            members: {
                create: {
                    userId,
                    role: 'OWNER',
                },
            },
            preferences: {
                create: {
                    userId,
                    lastOpenedAt: new Date(),
                },
            },
            artifacts: {
                create: {
                    name: 'Main artifact',
                    slug: 'main',
                    type: artifactType,
                    status: 'DRAFT',
                },
            },
            conversations: {
                create: {
                    userId,
                    title: planMode ? 'Planning' : 'New conversation',
                    messages: {
                        create: [
                            ...(planMode
                                ? [
                                    {
                                        role: 'SYSTEM' as const,
                                        content: "PLAN_MODE_SYSTEM_PROMPT",
                                    },
                                ]
                                : []),
                            {
                                role: 'USER' as const,
                                content: effectivePrompt,
                            },
                        ],
                    },
                },
            },
        },
        select: {
            id: true,
            slug: true,
            workspace: { select: { slug: true } },
            artifacts: {
                where: { slug: 'main' },
                select: { id: true, slug: true },
                take: 1,
            },
        },
    });

    const mainArtifact = project.artifacts[0];

    //have to write code on prompting.

}