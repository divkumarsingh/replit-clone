"use client"

import { examplePromptSets } from "@/lib/landing-data"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { appHomeExamplePrompts } from "@/lib/app-data";

type ExamplePrompt = { label: string, text: string };

const themeStyles = {
    landing: {
        wrapper: "flex flex-col items-center gap-2",
        labelRow: "relative h-5",
        label: "text-sm text-text-muted",
        refresh: "absolute -right-6 top-0 flex h-5 w-5 items-center justify-center text-[#696c74] hover:bg-black/[0.04]",
        chip: "h-8 rounded-md border border-[#dbd9d3] bg-[#efeeec] px-2 text-[13px] text-[#212225] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:border-[#ffb199]",
    },
    app: {
        wrapper: "flex flex-col items-center gap-3",
        labelRow: "relative flex items-cneter gap-2",
        label: "text-sm text-app-text-muted",
        refresh: "flex h-5 w-5 items-center justify-center rounded text-app-text-muted transition-colors hover:bg-app-surface-hover hover:text-app-text-secondary",
        chip: "h-8 rounded-lg border border-app-chip-border bg-app-chip-bg px-3 text-[13px] text-app-text-secondary transition-colors hover:border-app-border hover:bg-app-surface-hover hover:text-app-text"
    }
}
type ExamplePromptsProps = {
    variant?: keyof typeof themeStyles;
    onSelect?: (text: string) => void;
}

export function ExamplePrompts({
    variant = "landing",
    onSelect
}: ExamplePromptsProps) {
    const styles = themeStyles[variant];
    const [setIndex, setSetIndex] = useState(0);
    const prompts: ExamplePrompt[] = variant === "landing" ? examplePromptSets[setIndex] : appHomeExamplePrompts;

    return (
        <div className={styles.wrapper}>
            <div className={styles.labelRow}>
                <span className={styles.label}>Try an example prompt</span>
                <button type="button" onClick={
                    variant === "landing" ?
                        () => setSetIndex((prev) => (prev + 1) % examplePromptSets.length)
                        : undefined
                } className={styles.refresh}>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true">
                        <path
                            d="M4 12a8 8 0 0114.93-4M20 12a8 8 0 01-14.93 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M20 4v4h-4M4 20v-4h4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
            <div className={cn("flex flex-wrap justify-center gap-2")}>
                {prompts.map((prompt) => (
                    <button
                        key={prompt.label}
                        type="button"
                        onClick={() => onSelect?.(prompt.text)}
                        className={styles.chip}
                    >
                        {prompt.label}
                    </button>
                ))}
            </div>
        </div>
    )
}