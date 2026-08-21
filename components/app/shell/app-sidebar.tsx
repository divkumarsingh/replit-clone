"use client"

import { ReplitLogo } from "@/components/ui/replit-logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { AppWorkspace } from "@/lib/app-types";
import { Avatar } from "@/components/ui/avatar";

type AppSidebarProps = {
    workspaces: AppWorkspace[];
    activeWorkspaceSlug?: string;
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    },
    onOpenSearch: () => void;
}

const mainNav: Array<{
    label: string;
    href: string;
    icon: React.ComponentType<{ className: string }>;
    exact?: boolean;
}> = [
        { label: "Home", href: "/app", icon: HomeIcon, exact: true },
        { label: "Projects", href: "/app/project", icon: ProjectIcon, exact: true },
    ];


export function Appsidebar({
    workspaces,
    activeWorkspaceSlug,
    user,
    onOpenSearch
}: AppSidebarProps) {
    const pathname = usePathname();
    const [accountOpen, setAccountOpen] = useState(false);

    useEffect(() => {
        if (!accountOpen) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setAccountOpen(false);
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [accountOpen]);

    return (
        <aside className="flex h-screen w-app-sidebar shrink-0 flex-col border-r border-app-border-subtle bg-app-sidebar-bg">
            <div className="flex items-center justify-between px-3 py-3">
                <Link href="/app" aria-label="Replit Home">
                    <ReplitLogo size="compact" className="text-app-text" />
                </Link>
                <button type="button" onClick={onOpenSearch}
                    className=" flex h-8 w-8 items-center justify-center rounded-lg text-app-text-muted transition-colors hover:bg-app-surface-hover hover:text-app-text"
                    aria-label="Search"
                >
                    <SearchIcon />
                </button>
            </div>
            <div className="px-3 pb-2">
                {/* {Workspace selector} */}
                Workspace
            </div>
            <div className="px-1">
                <Link href="/app" className="group relative flex h-9 items-center gap-2 overflow-hidden
                rounded-lg px-3 text-sm font-medium text-white shadow-[0_2px_14px_rgba(61,111,212,0.22)], transition-[box-shadow,filter] hover:shadow-[0_4px_22px_rgba(61,111,212,0.32)] hover:brightness-105">
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#3730a3] via-app-accent-blue to-[#67b8f7]" />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent-blue to-cyan-100/10 opacity-50 transition-opacity group-hover:opacity-80 " />
                    <SparklesIcon className="relative z-10 shrink-0" />
                    <span className="relative z-10">Create something new</span>
                </Link>
            </div>
            <nav className="flex-1 space-y-0.5 px-2 py-2">
                {mainNav.map((item) => {
                    const isActive = item.exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href)
                    return (
                        <Link href={item.href} key={item.label} className={cn(
                            "flex items-center gap-2.5 rounded-lg px-3 py-2 mb-1 text-sm transition-colors",
                            isActive ? "bg-app-surface-active text-app-text"
                                : "text-app-text-secondary hover:bg-app-surface-hover hover:text-app-text "
                        )}>
                            <item.icon className="size-4" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
            <div className="border-t border-app-border-subtle px-3 py-3">
                {accountOpen ? (
                    <button type="button"
                        className="fixed inset-0 bg-black/40" aria-label="Close account menu"
                        onClick={() => setAccountOpen(false)} />
                ) : null}
                <div className="relative w-full">
                    {accountOpen ? (
                        //{//Account menu panel// }
                        <div>Account menu panel</div>
                    ) : null}
                    <button type="button" onClick={() => setAccountOpen((open) => (!open))}
                        aria-expanded={accountOpen} aria-haspopup="menu"
                        className={cn(
                            "relative z-50 flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors",
                            accountOpen
                                ? "bg-app-surface-hover"
                                : "hover:bg-app-surface-hover"

                        )}>
                        {/* {avatar} */}
                        <Avatar size="sm" theme="app" name="Divyanshu Kumar" />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm text-app-text">
                                {/* {user.name ?? "Account"} */}
                                Account
                            </p>
                            <p className="truncate text-xs text-app-text-muted">
                                {/* {user.email ?? "View menu"} */}
                                View menu
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </aside>
    )
};

function HomeIcon(className: { className: string }) {
    return (
        <svg
            className={`fill-none stroke-current stroke-[1.5] size-4 ${className}`}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 19v-8.5Z"
                strokeLinejoin="round"
            />
            <path d="M9.5 20.5V14a2.5 2.5 0 0 1 5 0v6.5" />
        </svg>
    )
}

function ProjectIcon(className: { className: string }) {
    return (
        <svg
            className={` size-4 ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true">
            <rect
                x="4"
                y="4"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <rect
                x="13"
                y="4"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <rect
                x="4"
                y="13"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <rect
                x="13"
                y="13"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true">
            <path
                d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M16 16l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={className}>
            <path
                d="M12 2.5 13.4 7.6 18.5 9 13.4 10.4 12 15.5 10.6 10.4 5.5 9 10.6 7.6 12 2.5Z"
                fill="currentColor"
            />
            <path
                d="M19.2 13.8 20 16.2 22.4 17 20 17.8 19.2 20.2 18.4 17.8 16 17 18.4 16.2 19.2 13.8Z"
                fill="currentColor"
                opacity="0.85"
            />
            <path
                d="M5.2 15.8 5.8 17.6 7.6 18.2 5.8 18.8 5.2 20.6 4.6 18.8 2.8 18.2 4.6 17.6 5.2 15.8Z"
                fill="currentColor"
                opacity="0.75"
            />
        </svg>
    );
}