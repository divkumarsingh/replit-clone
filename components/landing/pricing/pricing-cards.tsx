import Link from "next/link";
import type { BillingPeriod, PricingPlan } from "@/lib/types";
import { cn } from "@/lib/utils";
import { clearModuleContext } from "next/dist/server/lib/render-server";
import { parseFallbackField } from "next/dist/lib/fallback";
import { ProSeatSelect } from "./pricing-pro-seat-select";

export function PriceBlock({
    plan,
    period
}: {
    plan: PricingPlan,
    period: BillingPeriod
}) {
    if (plan.monthlyPrice === null) {
        return (
            <p className="mt-4 font-display text-xl font-medium text-text-agent-heading below-desktop:mt-0 desktop:mt-4">
                Custom Pricing
            </p>
        )
    }

    const price = period === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
    const isFree = price === 0;
    const showStrike = period === "yearly" && plan.originalPrice != null && plan.originalPrice > (price ?? 0);

    return (
        <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 below-desktop:mt-0">
            {showStrike && (
                <span className="font-display text-xl text-text-dim line-through">
                    ${plan.originalPrice}
                </span>
            )}
            <span className="font-display text-[32px] leading-none font-normal tracking-[-0.04em] text-text-agent-heading">
                {isFree ? "Free" : `$${price}`}
            </span>
            {isFree && period === "monthly" && (
                <span className="text-sm text-text-muted"> / month</span>
            )}
            {isFree && period === "yearly" && (
                <>
                    <span className="flex below-desktop:flex-col text-sm leading-tight text-text-muted desktop:hidden">
                        <span>per month</span>
                        <span>billing anually</span>
                    </span>
                    <span className="hidden text-sm text-text-muted desktop:inline">Per month billed annually</span>
                </>
            )}
        </div>
    )
}

export function PricingCard({
    plan,
    period
}: {
    plan: PricingPlan,
    period: BillingPeriod
}) {
    return (
        <article className={cn(
            "flex flex-col bg-[#f9f3ed]",
            "below-desktop:rounded-[40px] below-desktop:p-8",
            "desktop:rounded-[20px] desktop:p-5"
        )}>
            <div className={cn(
                "font-display font-medium text-replit-orange",
                "text-[28px] desktop:text-lg"
            )}>
                <h3 className="font-display font-medium text-replit-orange text-[28px] desktop:text-lg">{plan.name}</h3>
                <p className="mt-1 text-sm text-text-secondary">{plan.description}</p>
            </div>
            <div className="below-desktop:border-b below-desktop:border-black/[0.06] below-desktop:py-5">
                <PriceBlock plan={plan} period={period} />
            </div>
            <div className="below-desktop:border-b below-desktop:border-black/[0.06] below-desktop:py-5">
                <Link href={plan.ctaHref}
                    className="mt-4 block rounded-full bg-surface-dark-card py-3 text-center text-sm font-medium text-white transition-colors hover:bg-black below-desktop:mt-0">
                    {plan.ctaLabel}
                </Link>
                {plan.id === "pro" && <ProSeatSelect period={period} />}
            </div>
            <ul className="flex-1 below-desktop:mt-0 below-desktop:pt-5 desktop:mt-5">
                {plan.features.map((feature, i) => (
                    <li
                        key={feature}
                        className={cn(
                            'flex items-start gap-3 py-3 text-sm text-text-secondary',
                            i > 0 && 'border-t border-black/[0.06]',
                        )}>
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-replit-orange" />
                        {feature}
                    </li>
                ))}
            </ul>
        </article>
    )
}