import { avtarFallbackStyles, type Uitheme } from "@/lib/ui-theme";
import { cn } from "@/lib/utils";

type AvatarProps = {
    name?: string | null;
    image?: string | null;
    size?: "sm" | "md" | "lg";
    className?: string;
    theme: Uitheme;
}

const sizeStyles = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-11 w-11 text-base"
}

function getInitials(name?: string | null) {
    if (!name) return "?"
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export function Avatar({
    name,
    image,
    size = "md",
    className,
    theme = "light"
}: AvatarProps) {
    if (image) {
        return (
            <img
                src={image}
                alt={name ?? "User avatar"}
                className={cn("rounded-full object-cover", sizeStyles[size], className)}
            ></img>
        )
    };

    return (
        <span aria-hidden={!name} className={cn(
            "inline-flex items-center justify-center rounded-full font-medium",
            avtarFallbackStyles[theme],
            sizeStyles[size],
            className
        )}>
            {getInitials(name)}
        </span>
    )
}