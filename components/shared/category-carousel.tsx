'use client';

import { useEffect, useRef, useState } from 'react';
import { projectCategories } from '@/lib/landing-data';
import type { ProjectCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CategoryCheckIcon, CategoryIcon } from './category-icon';

const CATEGORY_ITEM_WIDTH = 96;

const themeStyles = {
    landing: {
        arrow:
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-[var(--carousel-arrow-bg)] text-text-secondary transition-[background-color,transform] duration-150 ease-out enabled:hover:bg-[#e8e7e3] enabled:active:scale-95 enabled:active:bg-[#e0dfdb] disabled:cursor-default',
        categoryIcon:
            'flex h-12 w-12 items-center justify-center rounded-2xl border border-[#dbd9d3] bg-[#f1f0ee] hover:border-[#cfcbc4] text-[#2f3034] group-hover:bg-[#ebeae7] group-active:scale-[0.97] group-active:border-[#c9c7c0] group-active:bg-[#e5e4e0]',
        categoryLabel:
            'pt-1 text-center text-xs leading-[18px] text-text-secondary',
        selectedIcon: '',
    },
    app: {
        arrow:
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-app-carousel-arrow text-app-text-secondary transition-[background-color,transform] duration-150 ease-out enabled:hover:bg-app-surface-hover enabled:active:scale-95 enabled:active:bg-app-surface-active disabled:cursor-default',
        categoryIcon:
            'flex h-12 w-12 items-center justify-center rounded-2xl border border-app-category-border bg-app-category-bg text-app-text transition-[background-color,border-color,transform] duration-150 ease-out group-hover:border-app-border group-hover:bg-app-surface-hover group-active:scale-[0.97] group-active:border-app-border group-active:bg-app-surface-active',
        categoryLabel:
            'pt-1 text-center text-xs leading-[18px] text-app-text-secondary',
        selectedIcon:
            'border-replit-orange/40 bg-app-surface-active text-replit-orange',
    },
} as const;

type CategoryCarouselProps = {
    variant?: keyof typeof themeStyles;
    selectedCategoryId: string | null;
    onCategoryToggle: (category: ProjectCategory) => void;
};

export function CategoryCarousel({
    variant = 'landing',
    selectedCategoryId,
    onCategoryToggle,
}: CategoryCarouselProps) {
    const styles = themeStyles[variant];
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    function updateScrollState() {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }

    useEffect(() => {
        updateScrollState();
        const el = scrollRef.current;
        if (!el) return;

        const observer = new ResizeObserver(updateScrollState);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    function scroll(direct: 'left' | 'right') {
        const step = CATEGORY_ITEM_WIDTH * 2;
        scrollRef.current?.scrollBy({
            left: direct === 'left' ? -step : step,
            behavior: 'smooth',
        });
        setTimeout(updateScrollState, 300);
    }

    return (
        <div
            className={cn(
                'mx-auto w-full items-start pb-8',
                'mobile:block mobile:pb-6',
                'tablet-up:flex tablet-up:h-[100px] tablet-up:max-w-hero-category tablet-up:justify-center tablet-up:gap-2',
            )}>
            <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={cn(
                    styles.arrow,
                    'mt-2.5 hidden tablet-up:flex',
                    !canScrollLeft && 'opacity-50',
                )}
                aria-label="Previous">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                        fillRule="evenodd"
                        d="M4.47 11.47a.75.75 0 0 0 0 1.06l7 7a.75.75 0 1 0 1.06-1.06l-5.72-5.72H19a.75.75 0 0 0 0-1.5H6.81l5.72-5.72a.75.75 0 0 0-1.06-1.06l-7 7Z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            <div
                ref={scrollRef}
                onScroll={updateScrollState}
                className={cn(
                    'hide-scrollbar flex w-full min-w-0 items-start overflow-x-auto',
                    'tablet-up:w-[480px] tablet-up:shrink-0',
                )}>
                {projectCategories.map((category) => {
                    const isSelected = selectedCategoryId === category.id;
                    return (
                        <button
                            type="button"
                            key={category.id}
                            onClick={() => onCategoryToggle(category)}
                            aria-pressed={isSelected}
                            className={cn(
                                'group flex shrink-0 flex-col items-center',
                                'mobile:w-1/4 mobile:min-w-[25%]',
                                'tablet-up:w-24',
                            )}>
                            <span
                                className={cn(
                                    styles.categoryIcon,
                                    isSelected && styles.selectedIcon,
                                )}>
                                {isSelected ? (
                                    <CategoryCheckIcon />
                                ) : (
                                    <CategoryIcon icon={category.icon} />
                                )}
                            </span>
                            <span className={styles.categoryLabel}>{category.label}</span>
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={cn(
                    styles.arrow,
                    'mt-2.5 hidden tablet-up:flex',
                    !canScrollRight && 'opacity-50',
                )}
                aria-label="Next">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                        fillRule="evenodd"
                        d="M19.53 11.47a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 1 1-1.06-1.06l5.72-5.72H5a.75.75 0 0 1 0-1.5h12.19l-5.72-5.72a.75.75 0 0 1 1.06-1.06l7 7Z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
}
