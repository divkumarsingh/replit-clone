export type NavLink = {
    label: string;
    href: string;
    accent?: boolean;
    description?: string
}

type NavSubsection = {
    title: string;
    links: NavLink[];
}

export type NavGroup = {
    title: string;
    links?: NavLink[],
    subsections?: NavSubsection[]
}

export type ProjectCategory = {
    id: string;
    label: string;
    icon: "website" | "mobile" | "design" | "slides" | "animation" | "data" | "game" | "document" | "spreadsheet";
}

export type AgentFeatures = {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    variant: "canvas" | "parallel" | "artifacts" | "teams"
}

export type PlatformFeatures = {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    variant: "agent" | "infrastructure" | "integrations" | "enterprise"
}

export type Testimonials = {
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    avatarUrl: string;
}

export type PricingPlan = {
    id: string;
    name: string;
    description: string;
    monthlyPrice: number | null;
    yearlyPrice: number | null;
    originalPrice?: number;
    ctaLabel: string;
    ctaHref: string;
    features: string[];
}

export type BillingPeriod = "monthly" | "yearly"

export type ExamplePrompt = {
    label: string;
    text: string;
}