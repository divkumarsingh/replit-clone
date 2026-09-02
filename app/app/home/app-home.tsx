"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { ExamplePrompt } from "@/lib/types";
import { getDisplayName } from "@/lib/app-data";
import type { ProjectCategory } from "@/lib/types";
import { useToast } from "@/components/ui/Toast";
import { CategoryCarousel } from "@/components/shared/category-carousel";
import { ExamplePrompts } from "@/components/shared/example-prompt";
import { AppPromptInput } from "@/components/app/home/app-prompt-input";
import { useHeroPromptDraftRestore } from "@/lib/hooks/use-hero-prompt-draft";
import { buildProjectFormData, clearHeroPromptState, loadHeroPromptDraft } from "@/lib/hero-prompt-draft";
import { authClient } from "@/lib/auth-client";

type AppHomeProps = {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
};

export function AppHome({
    user
}: AppHomeProps) {
    const { data: session } = authClient.useSession()
    const searchParams = useSearchParams();
    const { value, setValue, attachements, setAttachements, planMode, setPlanMode, selectedCategory, setSelectedCategory, ready } = useHeroPromptDraftRestore();
    const { error: toastError } = useToast();
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const autostartedRef = useRef(false);
    const displayName = getDisplayName(session?.user?.name, session?.user?.email);


    function submitProject(prompt: string, nextAttachements: typeof attachements, nextPlanMode: boolean, nextCategory: ProjectCategory | null) {
        setError(null);
        startTransition(async () => {
            const formData = buildProjectFormData({
                prompt,
                planMode: nextPlanMode,
                //@ts-ignore
                categoryId: nextCategory?.id,
                attachements: nextAttachements,
            });
            const result = await { action: "actions" };//create project action;
            if (result && "error" in result && result.error) {
                setError(result.error);
                toastError(result.error);
                return;
            }
            await clearHeroPromptState();
        });
    }

    useEffect(() => {
        if (!ready || autostartedRef.current || isPending) return;

        const shouldAutoStart = searchParams.get("autostart") === "1" || loadHeroPromptDraft()?.autostart;

        if (!shouldAutoStart) return;

        const draft = loadHeroPromptDraft();
        const prompt = draft?.value?.trim() ?? value.trim();
        const hasContent = Boolean(prompt) || attachements.length > 0;

        if (!hasContent) return;

        autostartedRef.current = true;
        void clearHeroPromptState();
        setTimeout(() => {
            setTimeout(() => {
                submitProject(
                    prompt,
                    attachements,
                    draft?.planMode ?? planMode,
                    selectedCategory
                );
            }, 100);
        })
    }, [ready, searchParams, value, attachements, planMode, selectedCategory, isPending, submitProject]);


    function handleCategoryToggle(category: ProjectCategory) {
        setSelectedCategory((current) => {
            current?.id === category.id ? null : category;
        })
    }

    function handleSubmit(prompt: string) {
        submitProject(prompt, attachements, planMode, selectedCategory);

    }

    function handleExampleSelect(text: string) {
        setValue(text);
    }
    return (
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            <div className="flex w-full flex-1 flex-col items-center justify-center px-4 py-8 tablet-up:px-8">


                <h1 className="max-w-3xl text-center font-display text-[32px] font-normal leading-tight tracking-[-0.03] text-app-text tablet-up:text-[40px]">
                    Hi {displayName}, What do you want to make?
                </h1>

                <div className="mt-8 w-full max-w-[720px]">
                    {/* {<app prompt input} */}
                    <AppPromptInput value={value} onChange={setValue} onSubmit={handleSubmit} selectedCategory={selectedCategory}
                        onRemoveCategory={() => setSelectedCategory(null)} attachments={attachements} onAttachmentChange={setAttachements}
                        planMode={planMode} onPlanModeChange={setPlanMode} onError={toastError} disabled={isPending}
                    />

                    {error ? (
                        <p className="mt-3 text-center text-sm text-replit-orange">{error}</p>
                    ) : null}

                    {isPending ? (
                        <p className="mt-3 text-center text-sm text-app-muted">
                            Creating your Project
                        </p>
                    ) : null}

                </div>
                <div className="mx-auto mt-[17px] w-full max-w-hero-prompt tablet-up:max-w-hero-prompt-tablet">
                    <CategoryCarousel variant="app" selectedCategoryId={selectedCategory?.id ?? null} onCategoryToggle={handleCategoryToggle} />
                </div>
                <div className="mt-10 w-full max-w-[720px]">
                    <ExamplePrompts variant="app" onSelect={handleExampleSelect} />
                </div>
            </div>
        </main>
    )
} 