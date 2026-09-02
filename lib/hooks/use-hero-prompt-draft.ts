"use client"

import { useEffect, useState } from "react";
import { loadHeroPromptDraft } from "../hero-prompt-draft";
import type { ProjectCategory } from "../types";
import { projectCategories } from "../landing-data";
import { PromptAttachment } from "../prompt-attachments";

export function useHeroPromptDraftRestore() {
    const [value, setValue] = useState("");
    const [attachements, setAttachements] = useState<PromptAttachment[]>([]);
    const [planMode, setPlanMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        async function restore() {
            const draft = loadHeroPromptDraft();
            const storedAttachements = await [];

            if (draft) {
                setValue(draft.value);
                setPlanMode(draft.planMode);
                if (draft.categoryId) {
                    const category = projectCategories.find((item) => item.id === draft.categoryId);
                    if (category) {
                        setSelectedCategory(category);
                    }
                }
            };

            if (storedAttachements.length > 0) {
                setAttachements(storedAttachements);
            }

            setReady(true);

            void restore();
        }
    }, [])

    return {
        value, setValue, attachements, setAttachements, planMode, setPlanMode, selectedCategory, setSelectedCategory, ready
    }
}