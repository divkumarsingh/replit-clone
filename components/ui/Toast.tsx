"use client"

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error";

type ToastItem = {
    id: number,
    message: string;
    type: ToastType;
}

type ToastOptions = {
    message: string;
    type: ToastType;
}

type ToastContextValue = {
    toast: (options: ToastOptions) => void;
    success: (message: string) => void;
    error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 3000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [item, setItem] = useState<ToastItem | null>(null);
    const timerRef = useRef<number | null>(null);

    const dismiss = useCallback(() => {
        setItem(null);
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const toast = useCallback(({
        message, type = "success"
    }: ToastOptions) => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
        setItem({ id: Date.now(), message, type });
        timerRef.current = window.setTimeout(dismiss, TOAST_DURATION_MS);
    }, [dismiss]);

    const success = useCallback(
        (message: string) => toast({ message, type: "success" }),
        [toast]
    );

    const error = useCallback(
        (message: string) => toast({ message, type: "error" }),
        [toast]
    );

    useEffect(() => dismiss, [dismiss]);
    return (
        <ToastContext.Provider value={{ toast, success, error }}>
            {children}
            {item ? (
                <div role="status" aria-live="polite"
                    className="pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 px-4">
                    <div className={cn(
                        "toast-enter flex items-center gap-2.5 rounded-full border px-4 py-2.5 shadow-[_12px_40px_rgba(0,0,0,0.35) backdrop-blur-sm",
                        item.type === "success" ? "border-app border bg-app-surface text-app-text"
                            : "border-replit-orange/30 bg-app-surface text-app-text"
                    )}>
                        <span className={cn("h-1.5 w-1.5 shrink-0  rounded-full",
                            item.type === "success" ? "bg-emerald-400 " : "bg-replit-orange"
                        )} aria-hidden="true" />
                        <p className="text-sm">{item.message}</p>
                    </div>
                </div>
            ) : null}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }

    return context;
}