import type { AgentFeatures } from "@/lib/types";

type FeatureVariantConfig = {
    bg: string;
    rounded: string;
    layout: "horizontal" | "vertical";
    illustration: string;
    illustrationWidth: number;
    illustrationHeight: number;
    illustrationClass?: string;
    contentClass: string;
    text: string;
    eyebrow: string;
    eyebrowClass?: string;
    description: string;
    descriptionClass?: string;
    descriptionMaxWidth?: string;
    showIllustration?: boolean;
    cardClass: string;
};

/* shared text rhythm for vertical bento cards (Move faster, ship faster) */
const verticalCardEyebrowClass = "mb-2";
const verticalCardDescriptionClass = "mt-5 tracking-[-0.03em] leading-[-1.2]";

export const featureVariantConfig: Record<
    AgentFeatures["variant"],
    FeatureVariantConfig
> = {
    canvas: {
        bg: "bg-feature-peach",
        rounded: "rounded-full",
        layout: "horizontal",
        illustration: "/illustrations/design-canvas.svg",
        illustrationWidth: 482,
        illustrationHeight: 686,
        illustrationClass:
            "pointer-events-none absolute top-0 right-[-40px] w-[482px] overflow-visible",
        contentClass:
            "flex w-1/2 shrink-0 flex-col justify-center py-10 pl-20 pr-10",
        text: "text-feature-charcoal",
        eyebrow: "opacity-70",
        eyebrowClass: "mb-2",
        description: "opacity-70",
        descriptionClass: "mt-[26px] tracking-[-0.3em] leading-[1.2]",
        showIllustration: true,
        cardClass: "relative items-stretch",
    },
    parallel: {
        bg: "bg-feature-stone",
        rounded: "rounded-[24px]",
        layout: "vertical",
        illustration: "/illustrations/parallel-agents.svg",
        illustrationWidth: 280,
        illustrationHeight: 261,
        illustrationClass:
            "pointer-events-none absolute top-[10px] right-[-20px] h-[min(260px,50%)]",
        contentClass:
            "relative z-10 mt-[163px] flex flex-1 flex-col px-10 pt-20 pb-10 before:pointer-events-none before:absolute before:-inset-x-10 before:inset-y-0 before:-z-10 before:bg-[linear-gradient(transparent_0%,#dcd5d0_60%)] before:content-['']",
        text: "text-feature-charcoal",
        eyebrow: "opacity-70",
        eyebrowClass: verticalCardEyebrowClass,
        description: "opacity-70",
        descriptionClass: verticalCardDescriptionClass,
        showIllustration: true,
        cardClass: "relative",
    },
    artifacts: {
        bg: "bg-feature-charcoal",
        rounded: "rounded-[24px]",
        layout: "vertical",
        illustration: "/illustrations/multiple-artifacts.svg",
        illustrationWidth: 1085,
        illustrationHeight: 149,
        illustrationClass:
            "pointer-events-none absolute inset-x-0 top-10 h-[166px] overflow-hidden pt-3",
        contentClass: "relative mt-[103px] flex flex-col px-10 pt-20 pb-10",
        text: "text-white",
        eyebrow: "text-white",
        eyebrowClass: verticalCardEyebrowClass,
        description: "text-white/70",
        descriptionClass: verticalCardDescriptionClass,
        showIllustration: true,
        cardClass: "relative",
    },
    teams: {
        bg: "bg-feature-coral",
        rounded: "rounded-full",
        layout: "horizontal",
        illustration: "/illustrations/teams.svg",
        illustrationWidth: 508,
        illustrationHeight: 375,
        illustrationClass:
            "pointer-events-none absolute inset-y-[22.5px] right-[-80px] w-[508px] overflow-visible",
        contentClass:
            "flex w-[min(460px,58%)] shrink-0 flex-col justify-center py-10 pl-20 pr-10",
        text: "text-feature-charcoal",
        eyebrow: "opacity-70",
        eyebrowClass: "mb-2",
        description: "opacity-80",
        descriptionClass: "mt-[26px] tracking-[-0.03em] leading-[1.2]",
        descriptionMaxWidth: "max-w-feature-description",
        showIllustration: true,
        cardClass: "relative items-center",
    },
};