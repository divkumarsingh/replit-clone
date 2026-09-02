import { clearHeroPromptAttachements, saveHeroPromptAttachments } from "./hero-prompt-attachments";
import { PromptAttachment } from "./prompt-attachments";

const STORAGE_KEY = "replit-hero-prompt-draft";

export type HeroPromptDraft = {
    value: string;
    categoryId: string | null;
    planMode: boolean;
    autostart: boolean;
}

export function saveHeroPromptDraft(draft: HeroPromptDraft) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function loadHeroPromptDraft(): HeroPromptDraft | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<HeroPromptDraft>;
        if (typeof parsed.value !== "string") return null;

        return {
            value: parsed.value,
            categoryId: typeof parsed.categoryId === "string" ? parsed.categoryId : null,
            planMode: Boolean(parsed.planMode),
            autostart: Boolean(parsed.autostart)
        };
    } catch {
        return null;
    }
}

export function clearHeroPromptDraft() {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(STORAGE_KEY);
}

export async function persistHeroPromptState({
    value,
    categoryId,
    planMode,
    attachements,
    autostart = false,
}: {
    value: string;
    categoryId: string | null;
    planMode: boolean;
    attachements: PromptAttachment[];
    autostart?: boolean
}) {
    saveHeroPromptDraft({ value, categoryId, planMode, autostart });
    await saveHeroPromptAttachments(attachements);
}

export async function clearHeroPromptState() {
    clearHeroPromptDraft();
    await clearHeroPromptAttachements();
}

export function buildProjectFormData({
    prompt,
    planMode,
    categoryId,
    attachements
}: {
    prompt: string;
    planMode: boolean;
    categoryId: string;
    attachements: PromptAttachment[];
}) {
    const formData = new FormData()
    formData.append("prompt", prompt);
    formData.append("planMode", planMode ? "true" : "false");

    if (categoryId) {
        formData.append("categoryId", categoryId);
    }

    attachements.forEach((attachement, index) => {
        formData.append(`attachement-${index}`, attachement.file);
    });

    return formData;
}