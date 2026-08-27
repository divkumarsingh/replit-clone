"use client"

import { createContext, useState, useContext, useEffect, type ReactNode, useMemo, useCallback } from "react";

import type { AuthMode } from "@/lib/types/account";
import { cn } from "@/lib/utils";
import { AuthModal } from "./auth-modal";

type AuthModeContextValue = {
    isOpen: boolean;
    mode: AuthMode;
    openAuthModal: (mode: AuthMode) => void;
    closeAuthModal: () => void;
    setAuthMode: (mode: AuthMode) => void;
}

const AuthModalContext = createContext<AuthModeContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<AuthMode>("login");

    const openAuthModal = useCallback((nextMode: AuthMode = "login") => {
        setMode(nextMode);
        setIsOpen(true)
    }, []);

    const closeAuthModal = useCallback(() => {
        setIsOpen(false)
    }, []);

    const value = useMemo(() => ({
        isOpen, mode, openAuthModal, closeAuthModal, setAuthMode: setMode
    }), [isOpen, mode, openAuthModal, closeAuthModal]);

    return (
        <AuthModalContext.Provider value={value}>

            {children}
            <AuthModal />
        </AuthModalContext.Provider>
    )
};

export function useAuthModal() {
    const context = useContext(AuthModalContext);

    if (!context) {
        throw new Error("useAuthModal must be used within AuthModalProvider");
    }

    return context;

}