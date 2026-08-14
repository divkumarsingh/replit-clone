import Link from "next/link";
import { Uitheme } from "@/lib/ui-theme";
import { focusVisibleRingStyles } from "@/lib/ui-theme";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
    children: React.ReactNode,
    variant?: ButtonVariant,
    size?: ButtonSize,
    href?: string,
    className?: string,
    disabled?: boolean,
    type?: "button" | "submit"
    onClick?: () => void;
    "aria-label"?: string;
    theme?: Uitheme
}

const variantStyles: Record<ButtonVariant, Record<Uitheme, string>> = {
    primary: {
        light: "bg-replit-orange text-white hover:bg-replit-orange-mid border border-transparent",
        app: "bg-replit-orange text-white hover:bg-replit-orange-mid border border-transparent"
    },
    outline: {
        light: "bg-transparent text-replit-orange border border-replit-orange hover:bg-replit-orange/5",
        app: "bg-transparent text-replit-orange border border-replit-orange/60 hover:bg-replit-orange/10"
    },
    ghost: {
        light: "bg-transparent text-text-secondary border border-transparent hover:bg:pricing-surface hover:text-text-primary",
        app: "bg-transparent text-app-text-secondary border border-transparent hover:bg-app-surface-hover hover: text-app-text"
    },
    secondary: {
        light: "bg-surface-white text-text-secondary border border-border-light hover:bg-pricing-surface",
        app: "bg-app-surface text-app-text-secondary border border-app-border hover:bg-app-surface-hover hover:text-app-text"
    }
}

const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-9 px-4 text-sm font-medium",
    md: "h-11 px-6 text-sm font-medium",
    lg: "h-14 px-6 text-base font-medium"
}


export function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    className,
    disabled,
    type = "button",
    onClick,
    "aria-label": ariaLabel,
    theme = "light"
}: ButtonProps) {
    const styles = cn("inline-flex items-center justify-center rounded-full transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2",
        focusVisibleRingStyles[theme],
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant][theme],
        sizeStyles[size],
        className

    );

    if (href) {
        return (
            <Link href={href} className={styles} aria-label={ariaLabel}>
                {children}
            </Link>
        )
    }
    return <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={styles}
    >
        {children}
    </button>
}