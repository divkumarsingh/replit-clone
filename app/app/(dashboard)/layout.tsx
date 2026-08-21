import { Appshell } from "@/components/app/shell/app-shell";
import { ReactNode } from "react";

export default function AppDashboardLayout({
    children
}: { children: ReactNode }) {
    return (
        <Appshell>
            {children}
        </Appshell>
    );
}