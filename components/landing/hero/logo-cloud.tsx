"use client"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import React, { useEffect, useRef, useState } from "react"
import { partnerLogos } from "./brand-logos"
import { useMounted } from "@/lib/use-mounted"

function Logoset({ duplicate = false }: { duplicate?: boolean }) {
    return (
        <div data-marquee-set aria-hidden={duplicate || undefined} className="flex shrink-0 items-center gap-12">
            {partnerLogos.map(({ id, Logo }) => (
                <Logo key={duplicate ? `${id}-dup` : id} />
            ))}
        </div>
    )
}

export function LogoCloud() {
    const mounted = useMounted();
    const trackRef = useRef<HTMLDivElement>(null);
    const [loopWidth, setLoopWidth] = useState(0);

    useEffect(() => {
        if (!mounted) return;

        const track = trackRef.current;
        if (!track) return;

        const measure = () => {
            const sets = track.querySelectorAll<HTMLElement>("[data-marquee-set]");
            if (sets.length >= 2) {
                setLoopWidth(sets[1].offsetLeft - sets[0].offsetLeft);
                return;
            }
            setLoopWidth(sets[0]?.offsetWidth ?? 0);

        };

        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(track);
        return () => observer.disconnect();
    }, [mounted])
    return (
        <Container as="section" className="relative mb-8 overflow-hidden h-12">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

            <div ref={trackRef} className={cn(
                "flex w-max items-center gap-12 will-change-transform",
                mounted && loopWidth > 0 && "animate-marquee",

            )} style={
                mounted && loopWidth ? ({ ["--marquee-distance" as string]: `${loopWidth}px` } as React.CSSProperties) : undefined
            }>
                <Logoset />
                <Logoset duplicate />
            </div>
        </Container>
    )
}