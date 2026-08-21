import Image from "next/image";
import { featureVariantConfig } from "./feature-card-config";
import type { AgentFeatures } from "@/lib/types";
import { cn } from "@/lib/utils";
import { features } from "process";

type featureVariantConfig =
    (typeof featureVariantConfig)[AgentFeatures["variant"]]

type FeaturesCardProps = {
    feature: AgentFeatures;
    className?: string
}

function CardIllustration({
    config,
    variant
}: {
    config: featureVariantConfig,
    variant: AgentFeatures["variant"]
}) {
    if (!config.showIllustration) {
        return null;
    }
    if (variant === "artifacts") {
        return (
            <div className={config.illustrationClass}>
                <div className="below-desktop:translate-x-0 desktop:translate-x-[745px]">
                    <Image src={config.illustration}
                        alt=""
                        width={config.illustrationWidth}
                        height={config.illustrationHeight}
                        className="h-[149px] w-[1085px] max-w-none"
                        aria-hidden
                    />
                </div>

            </div>
        )
    }

    if (variant === "canvas") {
        return (
            <div className={config.illustrationClass}>
                <Image src={config.illustration}
                    alt=""
                    width={config.illustrationWidth}
                    height={config.illustrationHeight}
                    className="h-auto w-full max-w-none mobile:w-[483px] mobile:max-w-none tablet:w-[482px]"
                    aria-hidden>
                </Image>
            </div>
        )
    }

    if (variant === "teams") {
        return (
            <div className={config.illustrationClass}>
                <Image src={config.illustration}
                    alt=""
                    width={config.illustrationWidth}
                    height={config.illustrationHeight}
                    unoptimized
                    className="block h-full w-auto max-w-none"
                    aria-hidden
                ></Image>
            </div>
        )
    }

    if (variant === "parallel") {
        return (
            <div className={config.illustrationClass}>
                <Image src={config.illustration}
                    alt=""
                    width={config.illustrationWidth}
                    height={config.illustrationHeight}
                    className="block h-full w-auto max-w-none"
                    aria-hidden
                    unoptimized
                ></Image>
            </div>
        )
    }

    return null;
}

function CardContent({
    feature,
    config,
    contentClass
}: {
    feature: AgentFeatures,
    config: featureVariantConfig,
    contentClass: string
}) {
    const titleClass =
        feature.variant === "parallel" || feature.variant === "artifacts"
            ? "mb-2 text-[32px] leading-[28px] tracking-[-0.05em] tablet-up:text-[60px] tablet-up:leading-[53.4px] tablet-up:tracking-[-3px]"
            : " mb-2 text-[36px] leading-[44px] tracking-[-0.05em] tablet-up:text-[60px] tablet-up:leading[53.4px] tablet-up:tracking-[-3px]"

    return (
        <div className={contentClass}>
            <p className={cn(
                "text-[14px]",
                config.eyebrow,
                config.eyebrowClass ? "mb-1" : "",
                "mobile:font-medium mobile:tracking-[-0.28px]"
            )}>
                {feature.eyebrow}
            </p>
            <h2 className={cn("font-display font-normal", titleClass, config.text)}>
                {feature.title}
            </h2>
            <p className={cn(
                "text-base",
                config.description,
                config.description ?? "mt-3 leading-relaxed",
                config.descriptionMaxWidth
            )}>{feature.description}</p>
        </div>
    )
}


export function FeatureCard({ feature, className }: FeaturesCardProps) {
    const config = featureVariantConfig[feature.variant];
    const isHorizontal = config.layout === 'horizontal';

    const contentClass = cn(
        config.contentClass,
        feature.variant === 'canvas' &&
        'mobile:w-full mobile:shrink-0 mobile:justify-start mobile:px-6 mobile:pt-6 mobile:pb-0 tablet:w-1/2 tablet:justify-center tablet:py-10 tablet:pl-20 tablet:pr-10 desktop:w-1/2 desktop:justify-center desktop:py-10 desktop:pl-20 desktop:pr-10',
        feature.variant === 'teams' &&
        'mobile:w-full mobile:justify-start mobile:px-6 mobile:pt-6 mobile:pb-0 tablet:w-[min(460px,63%)] tablet:justify-center tablet:py-10 tablet:pl-20 tablet:pr-10',
        feature.variant === 'parallel' &&
        'mobile:mt-[234px] mobile:px-6 mobile:pt-20 mobile:pb-10 mobile:before:-inset-x-6 tablet:mt-[317px]',
        feature.variant === 'artifacts' &&
        'mobile:mt-[196px] mobile:px-6 mobile:pt-20 mobile:pb-10 tablet:mt-[317px] desktop:mt-[140px]',
    );

    const illustrationClass = cn(
        config.illustrationClass,
        feature.variant === 'canvas' &&
        'mobile:absolute mobile:inset-x-0 mobile:top-[70px] mobile:mt-0 mobile:flex mobile:max-w-full mobile:justify-center mobile:overflow-visible tablet:absolute tablet:right-[-40px] tablet:top-0 tablet:mt-0 tablet:w-[482px] desktop:absolute desktop:right-[-40px] desktop:top-0 desktop:mt-0 desktop:w-[482px]',
        feature.variant === 'teams' &&
        'mobile:relative mobile:mx-auto mobile:mt-0 mobile:w-[271px] tablet:absolute tablet:inset-y-[119.5px] tablet:right-[-80px] tablet:mt-0 tablet:w-[508px]',
        feature.variant === 'parallel' &&
        'mobile:top-[10px] mobile:right-[-20px] mobile:h-[253px] mobile:w-[272px] tablet:top-6 tablet:right-[-20px] tablet:h-[260px]',
        feature.variant === 'artifacts' &&
        'mobile:top-10 mobile:h-[166px] tablet-up:top-10 tablet-up:h-[166px]',
    );

    const responsiveConfig = { ...config, illustrationClass };

    return (
        <article
            className={cn(
                'font-display flex overflow-hidden tablet-up:min-h-[380px] desktop:min-h-[420px]',
                feature.variant !== 'artifacts' && 'text-feature-charcoal',
                config.bg,
                'mobile:h-[506px] mobile:rounded-[40px]',
                feature.variant === 'canvas' &&
                'mobile:justify-start tablet:h-[614px] tablet:min-h-[614px] tablet-up:rounded-full desktop:h-[420px] desktop:min-h-0 desktop:rounded-full',
                feature.variant === 'teams' &&
                'tablet:h-[614px] tablet:min-h-[614px] tablet-up:rounded-full desktop:h-[420px] desktop:min-h-0',
                feature.variant === 'parallel' &&
                'mobile:p-0 tablet:h-[614px] tablet:min-h-[614px] desktop:h-[420px] desktop:min-h-0',
                feature.variant === 'artifacts' &&
                'mobile:p-0 tablet:h-[614px] tablet:min-h-[614px] desktop:h-[420px] desktop:min-h-0',
                feature.variant !== 'canvas' &&
                feature.variant !== 'teams' &&
                feature.variant !== 'parallel' &&
                feature.variant !== 'artifacts' &&
                config.rounded,
                feature.variant === 'parallel' &&
                'table:rounded-[24px] desktop:rounded-[24px]',
                feature.variant === 'artifacts' &&
                'table:rounded-[24px] desktop:rounded-[24px]',
                isHorizontal ? 'flex-col tablet-up:flex-row' : 'flex-col',
                config.cardClass,
                className,
            )}>
            {config.layout === 'vertical' ? (
                <>
                    <CardIllustration
                        config={responsiveConfig}
                        variant={feature.variant}
                    />
                    <CardContent
                        feature={feature}
                        config={config}
                        contentClass={contentClass}
                    />
                </>
            ) : (
                <>
                    <CardContent
                        feature={feature}
                        config={config}
                        contentClass={contentClass}
                    />
                    <CardIllustration
                        config={responsiveConfig}
                        variant={feature.variant}
                    />
                </>
            )}
        </article>
    );
}
