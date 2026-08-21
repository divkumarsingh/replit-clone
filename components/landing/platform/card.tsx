import Image from "next/image";
import { PlatformFeatures } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PlatformAgentIllustration } from "./agent-illustration";

const cardStyles: Record<PlatformFeatures["variant"], string> = {
    agent: "bg-white",
    infrastructure: "bg-[#dbd4cf]",
    integrations: "bg-features-peach",
    enterprise: "bg-feature-coral"
};

export function PlatformVisual({ variant }: { variant: PlatformFeatures["variant"] }) {
    switch (variant) {
        case "agent":
            return <PlatformAgentIllustration />;
        case "infrastructure":
            return (
                <Image src="/illustrations/platform/infra.svg"
                    alt=""
                    width={140}
                    height={213}
                    className="h-[213px] w-[140px] 
                    aria-hidden"/>
            );
        case "integrations":
            return (
                <Image
                    src="/illustrations/platform/integrations.svg"
                    alt=""
                    width={272}
                    height={204}
                    className="h-[204px] w-[272px]"
                    aria-hidden
                />
            )
        case "enterprise":
            return (
                <Image
                    src="/illustrations/platform/enterprise.svg"
                    alt=""
                    width={117}
                    height={148}
                    className="h-[148px] w-[117px]"
                    aria-hidden
                />
            )
    }
}

export function PlatformCard({ feature }: { feature: PlatformFeatures }) {
    return (
        <article className={cn(
            " flex w-full min-h-[480px] flex-col rounded-[20px] p-6 tablet-up:min-h-[520px] desktop-wide:h-[604px] desktop-wide:w-[320px] desktop-wide:shrink-0",
            cardStyles[feature.variant],
        )}>
            <div className="flex flex-col gap-4">
                <p className="font-display text-lg capitalize leading-[18px] tracking-[-0.04em] text-text-agent-heading">
                    {feature.eyebrow}
                </p>
                <p className="font-display text-[32px] leading-[32px] tracking-[-0.04em] text-text-agent-heading">{feature.title}</p>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <PlatformVisual variant={feature.variant} />
            </div>
            <p className="font-display text-base leading-[1.1] tracking-[-0.02em] text-text-agent-heading">{feature.description}</p>
        </article>
    );
}