import { appRouterContext } from "next/dist/server/route-modules/app-route/shared-modules";

export type Uitheme = "light" | "app";

export const focusRingStyles: Record<Uitheme, string> = {
    light: "focus:border-replit-orange focus_outline-none focus:ring-2 focus:ring-replit-orange/20",
    app: "focus:border-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-border/60",
}

export const inputStyles: Record<Uitheme, string> = {
    light: "border-border-light bg-surface-white text-text-primary placeholder: text-text-muted",
    app: "border-app-border bg-app-input-bg text-app-text placeholder:text-app-text-muted scheme-dark"
}

export const emptyStateStyles: Record<Uitheme, string> = {
    light: "border-dashed border-border-light bg-surface-white",
    app: "border-dashed border-app-border bg-app-surface/60"
}

export const emptyStateTitleStyles: Record<Uitheme, string> = {
    light: "text-text-agent-heading",
    app: "text-app-text"
}

export const emptyStateDescriptionStyles: Record<Uitheme, string> = {
    light: "text-text-muted",
    app: "text-app-muted"
}

export const mutedTextStyles: Record<Uitheme, string> = {
    light: "text-text-muted",
    app: "text-app-text-muted"
}

export const iconButtonGhostStyles: Record<Uitheme, string> = {
    light: "text-text-secondary hover:bg-pricing-surface hover:text-text-primary",
    app: "border border-app-border text-app-text-secondary hover:bg-app-surface-hover"
}

export const focusVisibleRingStyles: Record<Uitheme, string> = {
    light: "focus-visible:ring-repli-orange focus-visible:ring-offset-2",
    app: "focus-visible:ring-replit-orange/60 focus-visible:ring-offset-app-bg"
};

export const badgeVariantStyles: Record<
    "default" | "orange" | "muted" | "success" | "info",
    Record<Uitheme, string>> = {
    default: {
        light: "bg-pricing-surface text-text-secondary",
        app: "bg-app-surface-active text-app-text-secondary"
    },
    orange: {
        light: "bg-replit-orange/10 text-replit-orange",
        app: "bg-replit-orange/15 text-replit-orange"
    },
    muted: {
        light: "bg-surface-warm text-text-muted",
        app: "bg-app-surface-active text-app-text-secondary"
    },
    success: {
        light: "bg-emerald-50 text-emerald-700",
        app: "bg-emerald-950/50 text-emerald-400"
    },
    info: {
        light: "bg-sky-50 text-sky-700",
        app: "bg-sky-950 text-sky-400"
    },
}

export const avtarFallbackStyles: Record<Uitheme, string> = {
    light: "bg-pricing-surface text-text-secondary",
    app: "bg-app-surface-active text-app-text-secondary"
}