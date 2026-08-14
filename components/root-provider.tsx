"use client"

import { ToastProvider } from "./ui/Toast"

export function RootProviders(
    { children }:
        { children: React.ReactNode }) {
    return (
        <ToastProvider>{children}</ToastProvider>
    )
}