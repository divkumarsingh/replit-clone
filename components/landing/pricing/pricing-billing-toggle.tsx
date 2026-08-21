"use client"

import type { BillingPeriod } from "@/lib/types";
import { cn } from "@/lib/utils";

export function BillingToggle({
    period,
    onChange
}: {
    period: BillingPeriod,
    onChange: (p: BillingPeriod) => void;
}) {
    return (
        <div role="radiogroup" aria-label="Billing Period" className="inline-flex shrink-0 rounded-full bg-pricing-surface p-1">
            <button
                type="button"
                role="radio"
                aria-checked={period === "monthly"}
                onClick={() => onChange("monthly")}
                className={cn("flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors",
                    period === "monthly" ? "bg-surface-white text-text-primary shadow-sm" : "text-text-muted"
                )}>
                Monthly
            </button>
            <button
                type="button"
                role="radio"
                aria-checked={period === "yearly"}
                onClick={() => onChange("yearly")}
                className={cn("flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors",
                    period === "yearly" ? "bg-surface-white text-text-primary shadow-sm" : "text-text-muted"
                )}>
                Yearly
                <span className="inline-flex items-center gap-1 text-xs text-replit-orange">
                    <svg
                        className="w-3 h-3 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden
                    >
                        <path d="M3.75 7.5h16.5v3H3.75v-3Zm0 6h10.5v3H3.75v-3Z" />
                    </svg>
                    Save $24
                </span>
            </button>

        </div>
    )
}