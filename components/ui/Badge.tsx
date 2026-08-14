import type { Uitheme } from "@/lib/ui-theme";
import { cn } from "@/lib/utils";
import { badgeVariantStyles } from "@/lib/ui-theme";
import React, { Children } from "react";

type BadgeVariant = "default" | "orange" | "muted" | "success" | "info";

type BadgeProps = {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
    theme?: Uitheme
}

export function Badge({
    children,
    variant = "default",
    className,
    theme = "light"
}: BadgeProps) {

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                badgeVariantStyles[variant][theme],
                className
            )}>
            {children}
        </span>
    );
}