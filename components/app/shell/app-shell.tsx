"use client"

import React, { ReactNode, useCallback, useEffect, useState } from "react";

import type { AppWorkspace } from "@/lib/app-types";
import { Appsidebar } from "./app-sidebar";

type AppShellProps = {
    children: ReactNode;
    workspaces: AppWorkspace[];
    activeWorkspaceSlug?: string;
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
};

export function Appshell({
    children,
    workspaces,
    activeWorkspaceSlug,
    user
}: AppShellProps) {
    const [commandOpen, setCommandOpen] = useState(false);

    const openCommand = useCallback(() => {
        setCommandOpen(true)
    }, []);
    return (
        <div className="app-theme flex min-h-screen bg-app-bg text-app-text">
            <Appsidebar
                workspaces={workspaces}
                activeWorkspaceSlug={activeWorkspaceSlug}
                user={user}
                onOpenSearch={openCommand}

            />

            {/* {Main} */}
            <div className="app-theme-main flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
                {children}
            </div>

            {/* {command pallete} */}
        </div>
    )
}