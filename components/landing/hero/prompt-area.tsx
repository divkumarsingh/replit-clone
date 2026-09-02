"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ProjectCategory } from "@/lib/types";
import { useToast } from "@/components/ui/Toast";
import { Textarea } from "@/components/ui/Text-Area";
import { cn } from "@/lib/utils";
import { ExamplePrompts } from "@/components/shared/example-prompt";
import { CategoryCarousel } from "@/components/landing/hero/category-carousel"
import { authClient } from "@/lib/auth-client";
import { useAuthModal } from "@/components/app/auth/auth-modal-provider";
import { useHeroPromptDraftRestore } from "@/lib/hooks/use-hero-prompt-draft";
import { Session } from "better-auth";
import { AppPromptInput } from "@/components/app/home/app-prompt-input";
import { setEngine } from "crypto";
import { persistHeroPromptState } from "@/lib/hero-prompt-draft";
import { requestToBodyStream } from "next/dist/server/body-streams";

const APP_AUTOSTART_URL = "/app?autostart=1";


export function HeroPromptArea() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const { openAuthModal } = useAuthModal();
    const { error: toastError } = useToast();

    const { value, setValue, attachements, setAttachements, planMode, setPlanMode, selectedCategory, setSelectedCategory, ready } = useHeroPromptDraftRestore();

    useEffect(() => {
        if (!ready) return;
        void persistHeroPromptState({
            value,
            categoryId: selectedCategory?.id ?? null,
            planMode,
            attachements,
            autostart: false
        })
    }, [value, selectedCategory, planMode, attachements, ready])

    function handleSelect(text: string) {
        setValue(text);
    }

    function handleCategoryToggle(category: ProjectCategory) {
        setSelectedCategory((current) =>
            current?.id === category.id ? null : category
        )
    };

    function openLogin() {
        void persistHeroPromptState({
            value,
            categoryId: selectedCategory?.id ?? null,
            planMode,
            attachements,
            autostart: false
        });

        const params = new URLSearchParams(window.location.search);
        params.set("auth", "login");
        params.set("callbackUrl", APP_AUTOSTART_URL);
        const query = params.toString();
        window.history.replaceState(null, "", query ? `/?${query}` : "/");
        openAuthModal("login");
    }

    async function handleStart(prompt: string) {
        await persistHeroPromptState({
            value: prompt,
            categoryId: selectedCategory?.id ?? null,
            planMode,
            attachements,
            autostart: true
        })

        if (isPending) return;

        if (!session?.user) {
            openLogin();
            return;
        }

        router.push(APP_AUTOSTART_URL);
    }
    return (
        <>
            <div className="mx-auto w-full max-w-hero-prompt">
                <AppPromptInput variant="landing" value={value} onChange={setValue} onSubmit={handleStart} selectedCategory={selectedCategory}
                    onRemoveCategory={() => setSelectedCategory(null)} attachments={attachements} onAttachmentChange={setAttachements}
                    planMode={planMode} onPlanModeChange={setPlanMode} onError={toastError} />
            </div>
            <div className="mx-auto mt-[17px] w-full max-w-hero-prompt tablet-up:max-w-hero-prompt-tablet">
                {<CategoryCarousel
                    selectedCategoryId={selectedCategory?.id ?? null}
                    onCategoryToggle={handleCategoryToggle} />}
            </div>
            <div className="mx-auto mt-3.5 hidden w-full max-w-hero-prompt desktop:block">
                <ExamplePrompts onSelect={handleSelect} />
            </div>
        </>
    )
}





{/* <div className={cn(
                    "relative",
                    " rounded-[20px] border border-[#ffb199] bg-[#f3f3f1] transition-[min-height] duration-200"
                )}>
                    <div className={cn(
                        "px-3 pb-12"
                    )}>
                        <textarea
                            placeholder="Describe your idea, Replit will bring in to life..."
                            className={cn(
                                "w-full min-h-[50px] resize-none bg-transparent focus:outline-none disabled:opacity-60 pt-3",
                                "max-h-[200px] overflow-hidden px-2 py-1 text-sm leading-normal text-text-primary",
                                "placeholder:text-[#696c74]"
                            )} />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                            <button type="button" className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center transition-colors",
                                "disabled:opacity-60",
                                "rounded-full bg-[#f3f3f1] text-[#28292c] hover:bg-black/[0.4]"
                            )} aria-label="Add attachment">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M12 5v14M5 12h14"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>

                            <span className="inline-flex h-7 items-center gap-1.5 rounded-md border border-replit-orange/30 bg-replit-orange/10 px-2 text-xs text-replit-orange">
                                <PlanIcon />
                                Plan mode
                                <button type="button" className="flex w-4 h-4 items-center justify-center rounded text-replit-orange/80 hover:text-replit-orange" aria-label="Disable plan mode">
                                    <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M6 6l12 12M18 6L6 18"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                </button>
                            </span>

                        </div>
                        <div className="flex items-center gap-2">
                            <button type="button" className={cn(
                                "inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs transition-colors disabled:opacity-60",
                                "border-[#dfded8] text-text-muted hover:bg-black-[0.04]"
                            )} aria-label="Enter plan mode">
                                <PlanIcon />
                                plan
                            </button>

                            <button type="button" className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-60",
                                "text--[#696c74] hover:bg-black/[0.04]",
                            )} aria-label="start voice input">
                                <MicIcon />
                            </button>

                            <button type="button" className={cn(
                                "flex items-center justify-center rounded-full transition-all",
                                "h-8 w-8 bg-[#ffb199] text-white"
                                // "h-8 gap-1 bg-replit-orange px-3 text-sm font-medium text-white"
                            )} aria-label="Start">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M3.333 8H12.667"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M8 3.333L12.667 8L8 12.667"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div> */}