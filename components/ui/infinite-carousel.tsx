'use client';

import { useInfiniteCarousel } from '@/lib/use-infinite-carouse';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { CarouselControls } from './carousel-controls';

type InfiniteCarouselProps<T extends { id: string }> = {
    items: T[];
    renderSlide: (item: T) => ReactNode;
    getDotLabel?: (item: T, index: number) => string;
    viewportClassName?: string;
    controlsClassName?: string;
};

export function InfiniteCarousel<T extends { id: string }>({
    items,
    renderSlide,
    getDotLabel,
    viewportClassName,
    controlsClassName = 'mt=6',
}: InfiniteCarouselProps<T>) {
    const {
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
    } = useInfiniteCarousel(items);

    return (
        <>
            <div
                ref={viewportRef}
                className={cn('overflow-hidden', viewportClassName)}>
                <div
                    className={cn(
                        'flex will-change-transform',
                        enableTransition && 'transition-transform duration-500 ease-out',
                    )}
                    style={{
                        transform:
                            width > 0
                                ? `translate3d(-${position * width}px, 0, 0)`
                                : undefined,
                    }}
                    onTransitionEnd={handleTransitionEnd}>
                    {slides.map((item, slideIndex) => (
                        <div
                            key={`${item.id}-${slideIndex}`}
                            className="w-full shrink-0"
                            style={width > 0 ? { width } : undefined}
                            aria-hidden={slideIndex !== position}>
                            {renderSlide(item)}
                        </div>
                    ))}
                </div>
            </div>

            {/* <CarouselControls /> */}
            <CarouselControls
                count={items.length}
                activeIndex={activeIndex}
                onSelect={goToIndex}
                onPrevious={goPrevious}
                onNext={goNext}
                getDotLabel={
                    getDotLabel ? (index) => getDotLabel(items[index], index) : undefined
                }
                className={controlsClassName}
            />
        </>
    );
}
