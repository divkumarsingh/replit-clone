"use client"

import { useState } from "react";
import { proSeatTiers } from "@/lib/landing-data";
import type { BillingPeriod } from "@/lib/types";
import { traceId } from "next/dist/trace/shared";

export function ProSeatSelect({ period }: { period: BillingPeriod }) {
    const [seats, setSeats] = useState("100");

    return (
        <select
            value={seats}
            onChange={(event) => setSeats(event.target.value)}
            className="mt-3 w-full rounded-xl border border-border-light bg-surface-white px-3 py-2.5 text-text-primary "
            aria-label="Pro-seat tier"
            suppressHydrationWarning>
            {proSeatTiers.map((tier) => {
                const price = period === "yearly" ? tier.yearly : tier.monthly;
                const label = period === "yearly" && tier.monthly !== tier.yearly
                    ? `$${tier.monthly} $${tier.yearly}/month`
                    : `$${price}/ month`

                return (
                    <option key={tier.seats} value={tier.seats}>{label}</option>
                )
            })}
        </select>

    )
}