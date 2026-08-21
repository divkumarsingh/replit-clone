'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TestimonialBubbleNav } from './bubble-nav';
import { ChevronIcon } from '@/components/ui/chevron-icon';
import { Container } from '@/components/ui/container';
import { testimonials } from '@/lib/landing-data';
import { LAYOUT_WIDTH_VARS, useLayoutScale } from '@/lib/use-layout-scale';
import {
    SlideGrid,
    TESTIMONIAL_LAYOUT_H,
    TESTIMONIAL_NAV_W,
    TESTIMONIAL_SLIDE_PAD_R,
    TESTIMONIAL_SLIDE_W,
} from './testimonial-cards';

function NavArrow({ direction }: { direction: 'left' | 'right' }) {
    return (
        <ChevronIcon
            direction={direction}
            size={24}
            className="shrink-0 text-replit-orange"
        />
    );
}

export function TestimonialDesktopCarousel() {
    const count = testimonials.length;
    const { shellRef, scale } = useLayoutScale(LAYOUT_WIDTH_VARS.pageContent);

    const slides = useMemo(
        () => [testimonials[count - 1], ...testimonials, testimonials[0]],
        [count],
    );

    const [position, setPosition] = useState(1);
    const [enableTransition, setEnableTransition] = useState(true);
    const positionRef = useRef(position);

    useEffect(() => {
        setTimeout(() => {
            positionRef.current = position;
        }, 0);
    }, [position]);

    const goNext = useCallback(() => {
        setEnableTransition(true);
        setPosition((p) => p + 1);
    }, []);

    const goPrevious = useCallback(() => {
        setEnableTransition(true);
        setPosition((p) => p - 1);
    }, []);

    const handleTransitionEnd = useCallback(
        (event: React.TransitionEvent<HTMLDivElement>) => {
            if (event.propertyName !== 'transform') return;

            const p = positionRef.current;

            if (p === count + 1) {
                setEnableTransition(false);
                requestAnimationFrame(() => {
                    setPosition(1);
                    requestAnimationFrame(() => setEnableTransition(true));
                });
            } else if (p === 0) {
                setEnableTransition(false);
                requestAnimationFrame(() => {
                    setPosition(count);
                    requestAnimationFrame(() => setEnableTransition(true));
                });
            }
        },
        [count],
    );

    return (
        <section className="hidden w-full overflow-hidden pt-[84px] desktop:block">
            <Container>
                <div ref={shellRef} className="relative w-full aspect-[1390/518]">
                    <div
                        className="absolute left-0 top-0 origin-top-left"
                        style={{
                            width: 'var(--page-content-max)',
                            height: TESTIMONIAL_LAYOUT_H,
                            transform: `scale(${scale})`,
                        }}>
                        <div className="h-full">
                            <div
                                className={`flex h-full will-change-transform ${enableTransition
                                    ? 'transition-transform duration-500 ease-out'
                                    : ''
                                    }`}
                                style={{
                                    transform: `translate3d(-${position * TESTIMONIAL_SLIDE_W}px, 0, 0)`,
                                }}
                                onTransitionEnd={handleTransitionEnd}>
                                {slides.map((testimonial, index) => (
                                    <div
                                        key={`${testimonial.id}-${index}`}
                                        className="shrink-0"
                                        style={{
                                            width: TESTIMONIAL_SLIDE_W,
                                            paddingRight: TESTIMONIAL_SLIDE_PAD_R,
                                        }}
                                        aria-hidden={index !== position}>
                                        <SlideGrid testimonial={testimonial} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="absolute left-0 top-0 z-10 flex h-[253px] w-[253px] flex-col justify-center rounded-[40px] border-[1.5px] border-[#cbc7c3] bg-[#faf5f0] p-6"
                            aria-hidden={false}>
                            <p className="font-display text-[32px] font-normal leading-[32px] tracking-[-0.04em] text-text-agent-heading">
                                Trusted by builders
                            </p>
                            <p className="mt-2 font-display text-sm leading-[22.4px] text-[#52545a]">
                                Endorsed by innovators
                            </p>
                        </div>

                        <div
                            className="absolute right-0 top-0 z-10 h-full"
                            style={{ width: TESTIMONIAL_NAV_W }}>
                            <TestimonialBubbleNav />

                            <button
                                type="button"
                                onClick={goNext}
                                className="absolute right-0 top-0 z-10 flex h-1/2 w-1/2 items-end flex-row justify-between p-8 text-[#1a1919] transition-opacity hover:opacity-90"
                                aria-label="Next Testimonial">
                                <span className="text-left font-display text-[17px] font-normal leading-[17.85px] tracking-[-0.68px]">
                                    Next
                                    <br />
                                    Testimonial
                                </span>
                                <NavArrow direction="right" />
                            </button>

                            <button
                                type="button"
                                onClick={goPrevious}
                                className="absolute bottom-0 left-0 z-10 flex h-1/2 w-1/2 items-end flex-row justify-between p-8 text-[#1a1919] transition-opacity hover:opacity-90"
                                aria-label="Previous Testimonial">
                                <NavArrow direction="left" />
                                <span className="text-right font-display text-[17px] font-normal leading-[17.85px] tracking-[-0.68px]">
                                    Previous
                                    <br />
                                    Testimonial
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
