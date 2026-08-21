"use client"

import { useState } from "react";
import type { BillingPeriod } from "@/lib/types";
import { cn } from "@/lib/utils";
import { pricingPlans } from "@/lib/landing-data";
import { BillingToggle } from "./pricing-billing-toggle";
import { PricingCard } from "./pricing-cards";

export function PricingPlanClient({
    proMonthlyPrice,
}: {
    proMonthlyPrice: number
}) {
    const [period, setPeriod] = useState<BillingPeriod>("yearly");

    const plans = pricingPlans.map((plan) =>
        plan.id === "pro" && proMonthlyPrice != null
            ? {
                ...plan,
                monthlyPrice: proMonthlyPrice,
                yearlyPrice: Math.round(proMonthlyPrice * 0.9),
                originalPrice: proMonthlyPrice
            }
            : plan,
    );

    return (
        <div className="rounded-[24px] bg-surface-white p-4 desktop:rounded-[32px] desktop:p-8">
            <div className={cn(
                "mb-6 flex flex-col gap-6",
                "below-desktop:items-center below-desktop:text-center",
                "desktop:mb-8 desktop:flex-row desktop:items-start desktop:justify-between desktop:text-left"
            )}>
                <div className="below-desktop:text-center below-desktop:text-left">
                    <h2 className="font-display text-[32px] font-normal leading-none tracking-[-0.04em] text-text-agent-heading desktop:text-[40px]">
                        Start small, Scale Fast
                    </h2>
                    <p className="mt-2 text-lg text-text-dim">
                        Designed for Every Stage
                    </p>
                </div>
                <BillingToggle period={period} onChange={setPeriod} />
            </div>
            <div className={cn(
                "grid grid-cols-1 gap-4",
                "tablet:grid-cols-2",
                "desktop:grid-cols-4 desktop:gap-3"
            )}>
                {plans.map((plan) =>
                    <PricingCard plan={plan} key={plan.id} period={period} />
                )}
            </div>
        </div>
    )
}