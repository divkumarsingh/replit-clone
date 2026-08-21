"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import { userAreaTabs } from "./user-area-tabs";
import { cn } from "@/lib/utils";
import React from "react";
import { readRouteCacheEntry } from "next/dist/client/components/segment-cache/cache";
import { table } from "console";

export function userAreaLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <main className="flex min-h-0 flex-1 overflow-hidden">
            <aside className="flex w-1/3 min-w-[220px] max-w-[320px] shrink-0 flex-0 border-r border-app-border-subtle px-4 py-8">
                <nav className="space-y-1" aria-label="Account sections">
                    {userAreaTabs.map((tab) => {
                        const isActive = pathname === tab.href;
                        return (
                            <Link key={tab.href} href={tab.href}
                                className={cn(
                                    "flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm transition-colors",
                                    isActive
                                        ? "bg-app-surface-active font-medium text-app-text"
                                        : "text-app-text-secondary hover:bg-app-surface-hover hover:text-app-text"
                                )}
                            >
                                <tab.icon className="h-4 w-4 shrink-0" />
                                {tab.label}
                            </Link>
                        )
                    }
                    )}
                </nav>
            </aside>
            <div className="flex min-h-0 min-w-0 flex-1 overflow-y-auto">
                {children}
            </div>
        </main>
    )
}