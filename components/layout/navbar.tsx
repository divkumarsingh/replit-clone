"use client"

import { useEffect, useState } from "react";
import { HeaderContainer } from "../ui/container";
import { ReplitLogo } from "../ui/replit-logo";
import { NavGroup, NavLink } from "@/lib/types";
import { navGroups, topNavLinks } from "@/lib/landing-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AgentBadge } from "../ui/AgentBadge";
import { ReactJsxRuntime } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";


const navGhostClass = "flex h-8 items-center rounded-md px-2 text-text-secondary transition-colors hover:bg-[#e8e7e3] hover:text-[#212225]";

const navDropDownPanelClass = "rounded-xl border border-[#e3e2dd] bg-pricing-surface p-2 shadow-[0_8px_32px_rgba(0,0,0,0.12), 0_2px_8px_rgba(0,0,0, 0.08]";

const navDropDownLinkClass = "block whitespace-nowrap px-3 py-2 text-[14px] leading-normal text-[#2f3034] transition-colors hover:text-[#212225]";

function ChevronDown() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="opacity-60"
            aria-hidden="true">
            <path
                fillRule="evenodd"
                d="M12.53 15.53a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 1.06-1.06L12 13.94l5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

function AccordianToggle({ expanded }: { expanded: boolean }) {
    return (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#dfde8] text-[#151618]">
            <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true">
                {expanded ? (
                    <path
                        d="M3 7h8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                ) : (
                    <path
                        d="M7 3v8M3 7h8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                )}
            </svg>
        </span>
    )
}

function MobileNavLink({
    link,
    onNavigate
}: {
    link: NavLink,
    onNavigate: () => void;
}) {
    if (link.description) {
        return (
            <Link href={link.href} onClick={onNavigate}
                className="block py-3 text-[#212225] transition-colors hover:text-text-primary">
                <span className="block text-sm leading-tight">{link.label}</span>
                <span className="mt-0.5 block text-sm leading-tight TEXT-[#696C74]">{link.description}</span>
            </Link>
        )
    };

    return (
        <Link href={link.href} onClick={onNavigate}
            className={cn(
                "block py-2.5 text-sm leading-tight text-[#2f3034] transition-colors hover:text-[#212225]",
                link.accent && "text-replit-orange hover:text-replit-orange-mid"
            )}>
            {link.label}
        </Link>
    )
}

function flattenGroupLinks(group: NavGroup): NavLink[] {
    const primary = group.links ?? [];
    const nested = group.subsections?.flatMap((section) => section.links) ?? [];

    return [...primary, ...nested];
}

function MobileNavMenu({
    open,
    onClose,
    initialUser
}: {
    open: boolean,
    onClose: () => void;
    initialUser: null;

}) {
    const [expandedGroup, setExpandedGroup] = useState<string | null>('Products');

    useEffect(() => {
        if (open) {
            setTimeout(() => { setExpandedGroup("Products") }, 0)
        }
    }, [open]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bottom-0 top-[67px] z-40 flex flex-col bg-[#f1f0ee] desktop:hidden">
            <div className="flex-1 overflow-y-auto">
                {navGroups.map((group) => {
                    const isExpanded = expandedGroup === group.title;
                    return (
                        <div className="border-b border-[#dfded8] px-6 py-3" key={group.title}>
                            <button
                                className="flex w-full items-center justify-between py-2"
                                aria-expanded={isExpanded}
                                aria-label="Toggle mobile nested nav"
                                onClick={() => setExpandedGroup(isExpanded ? null : group.title)}
                            >
                                <span className="font-display text-[32px] font-medium leading-10 tracking-[-0.04em]
                                text-[#36373b]">
                                    {group.title}
                                </span>
                                <AccordianToggle expanded={isExpanded} />
                            </button>

                            {isExpanded && (
                                <div className="pb-3 pt-1">
                                    {group.links?.map((link) => (
                                        <MobileNavLink
                                            key={link.label}
                                            link={link}
                                            onNavigate={onClose}
                                        />
                                    ))}
                                    {group.subsections?.map((section) => (
                                        <div key={section.title}>
                                            <p className="pb-1 text-sm text-[#28292c]">{section.title}</p>
                                            {section.links.map((link) => (
                                                <MobileNavLink
                                                    key={`${section.title}-${link.label}`}
                                                    link={link}
                                                    onNavigate={onClose} />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
                {topNavLinks.map((link) => (
                    <Link key={link.label} href={link.href} onClick={onClose} className="flex items-center border-b border-[#dfded8] px-6 py-4">
                        <span className="font-display text-[32px] font-medium leading-10 tracking-[-0.04em] text-[#36373b]">{link.label}</span>
                    </Link>
                ))}
            </div>
            <div className="flex items-center justify-center gap-4 border-t border-[#dfded8] px-6 py-5">
                <Link
                    href="/contact/sales"
                    onClick={onClose}
                    className="flex h-8 items-center rounded-md bg-[#e8e7e3] px-2 text-sm text-[#212225] transition-colors hover:bg-[#e0dfdb]"
                >Contact Sales</Link>
                <p>Sign-up - login</p>
            </div>
        </div>
    )

}

export function NavBar({
    initialUser = null
}) {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-header-bg">
            <HeaderContainer className="flex max-w-full h-[67px] items-center justify-between desktop:h-[81px]">
                <div className="flex items-center gap-1">
                    <Link href="/" className="mr-2 shrink-0 text-text-secondary" aria-label="Replit">
                        <ReplitLogo />
                    </Link>
                    <nav className="hidden items-center desktop:flex">
                        {navGroups.map((group) => (
                            <div key={group.title} className="relative"
                                onMouseEnter={() => setOpenMenu(group.title)}
                                onMouseLeave={() => setOpenMenu(null)}
                            >
                                <button type="button" className={cn(
                                    navGhostClass,
                                    "gap-1 text-[13px]",
                                    openMenu === group.title && "bg-[#edece8] text-[#212225]"
                                )}
                                    aria-expanded={openMenu === group.title}
                                >
                                    {group.title}
                                    <ChevronDown />
                                </button>
                                {openMenu === group.title && (
                                    <div className="absolute left-0 top-full z-50 pt-1">
                                        <div
                                            className={cn(
                                                navDropDownPanelClass,
                                                "w-max min-w-nav-dropdown"
                                            )}>
                                            {flattenGroupLinks(group).map((link) => (
                                                <Link href={link.href} key={`${group.title}-${link.label}-${link.href}`}
                                                    className={cn(
                                                        navDropDownLinkClass,
                                                        link.accent && "text-[#ec4e02] hover:text-[#ec4e02]"
                                                    )}>
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {topNavLinks.map((link) => (
                            <Link key={link.label} href={link.href}
                                className={`${navGhostClass} text-sm`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <Link href="/agent4" className="ml-1 flex items-center" aria-label="Agent 4">
                            <AgentBadge />
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-2 desktop:gap-0.5 ">
                    <Link href="/contact/sales" className={
                        `${navGhostClass} hidden text-sm desktop:flex`
                    }>Contact Sales</Link>
                    <p> Signup - Login </p>
                    <button type="button" onClick={() => setMobileOpen(!mobileOpen)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#edece8] text-[#151618] desktop:hidden"
                        aria-expanded={mobileOpen}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-hidden="true">
                            <path
                                d="M3 6h14M3 10h14M3 14h14"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
            </HeaderContainer>
            <MobileNavMenu open={mobileOpen} onClose={() =>
                setMobileOpen(false)} initialUser={initialUser} />
        </header>
    )
}