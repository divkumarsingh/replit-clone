"use client"

import { authClient } from "@/lib/auth-client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useAuthModal } from "./auth-modal-provider";

function AuthUrlSyncInner({ }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const { openAuthModal } = useAuthModal();

    useEffect(() => {
        if (isPending) return;
        const auth = searchParams.get("auth");
        const callbackUrl = searchParams.get("callbackUrl");
        const safeCallback =
            callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")
                ? callbackUrl
                : null;
        if (session?.user && safeCallback) {
            router.replace(safeCallback);
            return;
        }

        if (auth === "login" || auth === "register") {
            if (!session?.user) {
                openAuthModal(auth);
            }
        }
    }, [searchParams, openAuthModal, session, isPending, router]);

    return null;
}

export function AuthUrlSync() {
    return (
        <Suspense fallback={null}>
            <AuthUrlSyncInner />
        </Suspense>
    )
}