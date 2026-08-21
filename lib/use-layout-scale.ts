"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useMounted } from "./use-mounted";


export const LAYOUT_WIDTH_VARS = {
    pageContent: "--page-content-max",
    pageHeader: "--page-header-max"
} as const;

type LayoutWidthVar =
    (typeof LAYOUT_WIDTH_VARS)[keyof typeof LAYOUT_WIDTH_VARS];

const LAYOUT_WIDTH_FALLBACK: Record<LayoutWidthVar, number> = {
    "--page-content-max": 1390,
    "--page-header-max": 1920
}

function resolveLayoutWidth(source: number | LayoutWidthVar): number {
    if (typeof source === "number") return source;

    if (typeof window === "undefined") {
        return LAYOUT_WIDTH_FALLBACK[source]
    }

    const raw = getComputedStyle(document.documentElement).getPropertyValue(source).trim();

    const parsed = parseFloat(raw);

    return Number.isNaN(parsed) ? LAYOUT_WIDTH_FALLBACK[source] : parsed;
}

export function useLayoutScale(designWidth: number | LayoutWidthVar) {
    const mounted = useMounted();
    const shellRef = useRef<HTMLDivElement>(null);
    const [shellWidth, setShellWidth] = useState(0);
    const [resolvedDesignWidth, setResolvedDesignWidth] = useState(() => resolveLayoutWidth(designWidth));

    useLayoutEffect(() => {
        setTimeout(() => {
            setResolvedDesignWidth(resolveLayoutWidth(designWidth))
        }, 0);
    }, [designWidth]);

    useLayoutEffect(() => {
        const shell = shellRef.current;
        if (!shell) return;

        const update = () => setShellWidth(shell.clientWidth);
        update();

        const observer = new ResizeObserver(update);
        observer.observe(shell);
        return () => observer.disconnect();
    }, []);

    const scale =
        mounted && shellWidth > 0 && resolvedDesignWidth > 0
            ? shellWidth / resolvedDesignWidth
            : 1;

    return { shellRef, scale }
}
