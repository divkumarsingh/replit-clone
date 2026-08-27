import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useAuthModal } from "./auth-modal-provider";
import { useMounted } from "@/lib/use-mounted";
import type { AuthNavUser } from "@/lib/types/account";
import { cn } from "@/lib/utils";
import { StringFilter } from "@/lib/generated/prisma/commonInputTypes";

const navGhostClass = "flex h-8 items-center rounded-xl px-2 text-text-secondary transition-colors hover:bg-[#e8e7e3] hover:text-[#212225]";

type AuthNavActionsProps = {
    initialUser?: AuthNavUser | null;
    className: string;
    createAccountClassName?: string | null;
}

function AuthNavSkelton({ className }: { className: string }) {
    return (
        <div className={cn(
            "flex items-center gap-2",
            className
        )}>
            <span className="h-8 w-16 animate-pulse rounded-md bg-[#e8e7e3]" aria-hidden />
        </div>
    )
}

function AuthNavSignedIn({
    user,
    className
}: {
    user: AuthNavUser,
    className?: string
}) {
    const label = user.name ?? user.email ?? "Account";

    return (
        <div className={cn(
            "flex items-center gap-2", className
        )}>
            <Link href="/app" className={cn("text-sm")}>{label}</Link>
            <button type="button" onClick={
                () => void authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            window.location.href = "/";
                        }
                    }
                })}
                className={cn(navGhostClass, "text-[13px]")}
            >Sign out</button>
        </div>
    )
}

function AuthNavSignOut({
    className,
    createAccountClassName
}: {
    className?: string;
    createAccountClassName?: string | null;
}) {
    const { openAuthModal } = useAuthModal();

    return (
        <div className={cn(
            "flex items-center gap-2 justify-center", className
        )}>
            <button type="button" onClick={() => openAuthModal("login")} className={cn(navGhostClass, "text-[13px]")}>Login</button>
            <button type="button" onClick={() => openAuthModal("register")} className={cn(createAccountClassName)}>Create Account</button>
        </div>

    )
}

export function AuthNavActions({
    initialUser = null,
    className,
    createAccountClassName

}: AuthNavActionsProps) {
    const mounted = useMounted();
    const { data: session, isPending } = authClient.useSession();
    const user = mounted ? (session?.user ?? initialUser) : initialUser;

    if (mounted && isPending) {
        return <AuthNavSkelton className={className} />
    }

    if (user) {
        return <AuthNavSignedIn user={user} className={className} />
    }
    return (
        <AuthNavSignOut
            className={className}
            createAccountClassName={createAccountClassName} />
    )

}