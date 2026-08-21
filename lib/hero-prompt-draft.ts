
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