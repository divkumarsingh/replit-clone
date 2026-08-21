import { invalidateSegmentCacheEntries } from "next/dist/client/components/segment-cache/cache";
import { throwDeprecation } from "process";

export const appHomeExamplePrompts = [
    {
        label: "Startup analytics dashboard",
        text: "A SaaS KPI dashboard showing user growth, churn rate, and retention trends over time."
    }, {
        label: "B2B project management app",
        text: "A project management web app for a small B2B Saas startup team to track tasks, assign owners, set deadlines, and view progress across projects",
    }, {
        label: "Product launch presentation",
        text: "A pitch deck for a product launch with problem, solution, traction, and roadmap slides",
    }
];

export function getDisplayName(
    name?: string | null,
    email?: string | null,
    username?: string | null
) {
    if (username) return username;
    if (name) return name.split(" ")[0] ?? name;
    if (email) return email.split("@")[0] ?? "there";
    return "there";
}

export function getWorkspaceLabel(
    workspaces: { name: string; slug: string }[],
    activeSlug?: string
) {
    const workspace = workspaces.find((item) => item.slug === activeSlug) ?? workspaces[0];

    if (!workspace) return "Your Workspace";

    return workspace.name.endsWith("Workspace")
        ? workspace.name
        : `${workspace.name}'s Workspace`;
}