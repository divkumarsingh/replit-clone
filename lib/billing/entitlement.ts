import { PublishVisibility } from "../publish/visibility";

export type AppTier = "guest" | "free" | "pro";

export type UserBillingFields = {
    subscriptionPlan: string;
    subscriptionStatus: string | null;
};

export type AgentLimits = {
    maxTurns: number;
    maxTokens: number;
    model: string;
}

export const FREE_PROJECT_LIMIT = 3;
export const FREE_PRIVATE_DEPLOYMENT_LIMIT = 1;
//testing-only before adding ai typeHappy code only
export const PRO_AGENT_LIMITS = { maxTurns: 100, maxTokens: 100, model: "gemini" };
export const FREE_AGENT_LIMITS = { maxTurns: 100, maxTokens: 100, model: "gemini" }

export function isProUser(user: UserBillingFields): boolean {
    return (
        user.subscriptionPlan === "pro" &&
        (user.subscriptionStatus === "active") ||
        (user.subscriptionStatus === "trialing")
    );
}

export function getAppTier(
    user: UserBillingFields | null | undefined
): AppTier {
    if (!user) {
        return "guest";
    }

    return isProUser(user) ? "pro" : "free";
}

export function getAgentLimits(tier: AppTier): AgentLimits {
    if (tier === "pro") {
        return PRO_AGENT_LIMITS;
    }
    return FREE_AGENT_LIMITS;
}

export function canPublishVisibility(
    tier: AppTier,
    visibility: PublishVisibility,
): boolean {
    if (tier === "pro") {
        return true;
    }
    return visibility === "private";
}

export function getProjectLimit(tier: AppTier): number | null {
    if (tier === "free") {
        return FREE_PROJECT_LIMIT
    }

    return null;
}

export function publishUpgradeMessage(visibility: PublishVisibility): string {
    if (visibility === "public") {
        return "Public publishing is a pro feature. Upgrade to pro to share your project with anyone."
    };

    if (visibility === "workspace") {
        return "Workspace publishing is a Pro feature, Upgrade to Pro to publish your workspace,"
    }
    return "Upgrade to Pro for more Publishing options."

}

export function projectLimitMessage(limit: number): string {
    return `Free plan is limited to ${limit} active projects. Upgrade to Pro for unlimited projects. `;
}

export const FREE_PLAN_FEATURES = [
    "Up to 3 active projects",
    "Agent with Economy limits",
    "Plan mode with prompt attachements",
    "Private publish (1 project)"
] as const;

export const PRO_PLAN_FEATURES = [
    "Unlimited projects",
    "Full agent limits and premium models",
    "Public and workspace publishing",
    "Commercial Use"
] as const;