"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";
import { heroTaglines } from "@/lib/landing-data";

export function HeroTagline() {
    const mounted = useMounted();
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!mounted) {
            return;
        }
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % heroTaglines.length);
                setVisible(true);
            }, 300)
        }, 3000);
        return () => clearInterval(interval)
    })

    return (
        <p className={cn(
            "font-sans text-sm leading-[22px] text-text-primary transition-opacity duration-300",
            !mounted || visible ? "opacity-100" : "opacity-0"
        )}>
            {heroTaglines[index]}

        </p>
    )
}