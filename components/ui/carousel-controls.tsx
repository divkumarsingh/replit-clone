import { cn } from '@/lib/utils';
import { ChevronIcon } from './chevron-icon';

type CarouselNavButtonProps = {
    direction: 'left' | 'right';
    onClick: () => void;
    label?: string;
};

function CarouselNavButton({
    direction,
    onClick,
    label,
}: CarouselNavButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={
                label ?? (direction === 'left' ? 'Previous slide' : 'Next slide')
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1f0ee] text-text-secondary transition-colors hover:bg-[#e8e7e3]">
            <ChevronIcon direction={direction} />
        </button>
    );
}

type CarouselDotPaginationProps = {
    count: number;
    activeIndex: number;
    onSelect: (index: number) => void;
    getLabel?: (index: number) => string;
};

function CarouselDotPagination({
    count,
    activeIndex,
    onSelect,
    getLabel = (index) => `Go to slide ${index + 1}`,
}: CarouselDotPaginationProps) {
    return (
        <div className="flex gap-2">
            {Array.from({ length: count }, (_, index) => (
                <button
                    type="button"
                    key={index}
                    onClick={() => onSelect(index)}
                    aria-label={getLabel(index)}
                    className={cn(
                        'h-2 w-2 rounded-full transition-colors',
                        index === activeIndex ? 'bg-replit-orange' : 'bg-[#d9d7d3]',
                    )}
                />
            ))}
        </div>
    );
}

type CarouselControlsProps = {
    count: number;
    activeIndex: number;
    onSelect: (index: number) => void;
    onPrevious: () => void;
    onNext: () => void;
    getDotLabel?: (index: number) => string;
    className?: string;
};

export function CarouselControls({
    count,
    activeIndex,
    onSelect,
    onPrevious,
    onNext,
    getDotLabel,
    className,
}: CarouselControlsProps) {
    return (
        <div className={cn('flex items-center justify-between', className)}>
            <CarouselDotPagination
                count={count}
                activeIndex={activeIndex}
                onSelect={onSelect}
                getLabel={getDotLabel}
            />
            <div className="flex gap-2">
                <CarouselNavButton direction="left" onClick={onPrevious} />
                <CarouselNavButton direction="right" onClick={onNext} />
            </div>
        </div>
    );
}
