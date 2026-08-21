'use client';

import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useMounted } from './use-mounted';

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

function useCarouselViewportWidth() {
    const mounted = useMounted();
    const viewportRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const update = () => setWidth(viewport.clientWidth);
        update();

        const observer = new ResizeObserver(update);
        observer.observe(viewport);
        return () => observer.disconnect();
    }, []);

    return { viewportRef, width: mounted ? width : 0 };
}

export function useInfiniteCarousel<T>(items: T[]) {
    const count = items.length;
    const { viewportRef, width } = useCarouselViewportWidth();

    const slides = useMemo(
        () => [items[count - 1], ...items, items[0]],
        [items, count],
    );

    const [position, setPosition] = useState(1);
    const [enableTransition, setEnableTransition] = useState(true);
    const postionRef = useRef(position);

    useEffect(() => {
        if (postionRef.current !== position) {
            postionRef.current = position;
        }
    }, [position]);

    const activeIndex = mod(position - 1, count);

    const goNext = useCallback(() => {
        setEnableTransition(true);
        setPosition((current) => current + 1);
    }, []);

    const goPrevious = useCallback(() => {
        setEnableTransition(true);
        setPosition((current) => current - 1);
    }, []);

    const goToIndex = useCallback((index: number) => {
        setEnableTransition(true);
        setPosition(index + 1);
    }, []);

    const handleTransitionEnd = useCallback(
        (event: React.TransitionEvent<HTMLDivElement>) => {
            if (event.propertyName !== 'transform') return;

            const currentPosition = postionRef.current;

            if (currentPosition === count + 1) {
                setEnableTransition(false);
                requestAnimationFrame(() => {
                    setPosition(1);
                    requestAnimationFrame(() => setEnableTransition(true));
                });
            } else if (currentPosition === 0) {
                setEnableTransition(false);
                requestAnimationFrame(() => {
                    setPosition(count);
                    requestAnimationFrame(() => setEnableTransition(true));
                });
            }
        },
        [count],
    );

    return {
        viewportRef,
        width,
        slides,
        position,
        enableTransition,
        activeIndex,
        goNext,
        goPrevious,
        goToIndex,
        handleTransitionEnd,
    };
}
