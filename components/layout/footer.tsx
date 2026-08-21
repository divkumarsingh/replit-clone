import Link from "next/link"
import { ReplitLogo } from "../ui/replit-logo"
import { Container } from "../ui/container"
import { footerColumns } from "@/lib/landing-data"
import Weather from "../ui/weather"
import { Suspense } from "react"


export function Footer() {
    return (
        <div className="border-t border-border-light/60 bg-background">
            <Container as="footer" className="py-14">
                <div className="grid grid-cols-2 gap-8 desktop:grid-cols-5 desktop:gap-10">
                    <div className="col-span-2 desktop:col-span-1">
                        <Link href="/" className="inline-block text-text-primary" aria-label="Replit">
                            <ReplitLogo />
                        </Link>
                        <div className="mt-8 flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-light bg-surface-white text-text-muted">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true">
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M2 12h20M12 2a15 15 0 014 10 15 15 0 01-4 10 15 15 0 01-4-10A15 15 0 0112 2z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </span>
                            <div className=" flex rounded-xl border border-border-light bg-surface-white px-3 py-2 text-sm">
                                <span className="font-medium">CA</span>
                                <span className="mx-1.5 text-text-muted">&#8226;</span>
                                <span className="text-text-muted flex "><Suspense><Weather /> </Suspense>&#8457;</span>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-text-muted">Made in Sunny California</p>
                        <p className="mt-6 text-xs text-text-dim">All right reserved. Copyright &copy; {new Date().getFullYear()} Replit, Inc.</p>

                    </div>
                    {footerColumns.map((column) => (
                        <div key={column.title}>
                            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-text-dim">{column.title}</h3>
                            <ul className="space-y-2.5">
                                {(column.links ?? []).map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-text-secondary transition-colors hover:text-text-primary">{link.label}</Link>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}