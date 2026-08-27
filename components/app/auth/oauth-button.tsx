import type { OAuthProvider } from "@/lib/types/account";
import { cn } from "@/lib/utils";
import { GoogleIcon, GitHubIcon } from "./auth-icons";

type OAuthButtonProps = {
    provider: OAuthProvider;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const providerConfig: Record<OAuthProvider, { label: string, Icon: typeof GoogleIcon }> = {
    google: { label: "Continue with Google", Icon: GoogleIcon },
    github: { label: "Continue with Github", Icon: GitHubIcon }
}

export function OAuthButton({
    provider,
    onClick,
    className,
    disabled,
}: OAuthButtonProps) {
    const { label, Icon } = providerConfig[provider];

    return (
        <button type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-border-light bg-surface-white px-4 text-sm font-medium text-text-secondary transition-colors hover:bg-pricing-surface hover:text-text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-replit-orange focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-60",
                className
            )}
        >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
        </button>
    )
}