import type { Metadata } from "next";
import { RootProviders } from "@/components/root-provider";
import "./globals.css";
import { AuthSessionProvider } from "@/components/app/auth/session-provider";
import { AuthModalProvider } from "@/components/app/auth/auth-modal-provider";
import { AuthUrlSync } from "@/components/app/auth/auth-url-sync";


export const metadata: Metadata = {
  title: "Replit-Build apps and websites with AI",
  description: "Turn Ideas into apps in minutes. Replit agents writes production-ready code, evolves it and stays out of your way",
  openGraph: {
    title: "Replit-Build apps and websites with AI",
    description: "Turn ideas into apps in minutes - no coding needed.",
    type: "website"
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <AuthSessionProvider>
          <AuthModalProvider>
            <RootProviders>
              <AuthUrlSync />
              {children}
            </RootProviders>
          </AuthModalProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
