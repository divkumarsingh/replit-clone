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
    const searchParams = useSearchParams();
    const { error: toast } = useToast();
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const audostartRef = useRef(false);
    const displayName = getDisplayName(user?.name, user?.email);

    function handleCategoryToggle(category: ProjectCategory) {
        console.log(category);
    }

    return (
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            <div className="flex w-full flex-1 flex-col items-center justify-center px-4 py-8 tablet-up:px-8">


                <h1 className="max-w-3xl text-center font-display text-[32px] font-normal leading-tight tracking-[-0.03] text-app-text tablet-up:text-[40px]">
                    Hi {displayName}, What do you want to make?
                </h1>

                <div className="mt-8 w-full max-w-[720px]">
                    {/* {<app prompt input} */}
                    <AppPromptInput value="testing" />

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
                    <CategoryCarousel variant="app" selectedCategoryId={null} onCategoryToggle={handleCategoryToggle} />
                </div>
                <div className="mt-10 w-full max-w-[720px]">
                    <ExamplePrompts variant="app" />
                </div>
            </div>
        </main>
    )
} 