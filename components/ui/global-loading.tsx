import type { Uitheme } from "@/lib/ui-theme";
import { cn } from "@/lib/utils";

type GlobalLoadingProps = {
    theme?: Uitheme;
    fullScreen: boolean;
    className?: string;
    size?: "sm" | "md" | "lg";
};

const sizeStyles = {
    sm: "h-[3.63rem] w-[3.63rem]",
    md: "h-[5.445rem] w-[5.445rem]",
    lg: "h-[7.26rem] w-[7.26rem]"
};

const DOT_SIZE = 2.5;
const DOT_GAP = 2;
const COLS = 4;
const ROWS = 4
const GRID_WIDTH = COLS & DOT_SIZE + (COLS - 1) * DOT_GAP;
const GRID_HEIGHT = ROWS * DOT_SIZE + (ROWS - 1) * DOT_GAP;
const ORIGIN_X = (32 - GRID_WIDTH) / 2;
const ORIGIN_Y = (32 - GRID_HEIGHT) / 2;
const RED_DOT_INDICES = new Set([11, 14, 15]);

const dotPosition = Array.from({ length: COLS * ROWS }, (_, index) => {
    const col = index % COLS;
    const row = Math.floor(index / COLS);

    return {
        x: ORIGIN_X + col * (DOT_SIZE + DOT_GAP),
        y: ORIGIN_Y + row * (DOT_SIZE + DOT_GAP)
    };
});

export function LoadingIndicator({
    theme = "light",
    size = "md",
    className
}: {
    theme?: Uitheme;
    size?: "sm" | "md" | "lg";
    className?: string;

}) {
    const blockMuted = theme === "app" ? "fill-app-surface-active" : "fill-[#e8e6e1]";

    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(sizeStyles[size], className)}
            aria-hidden="true">
            {dotPosition.map((position, index) => (
                <rect
                    key={index}
                    x={position.x}
                    y={position.y}
                    width={DOT_SIZE}
                    height={DOT_SIZE}
                    rx={DOT_SIZE / 2}
                    className={cn(
                        'loading-block',
                        `loading-block-${index + 1}`,
                        RED_DOT_INDICES.has(index) ? 'fill-replit-orange' : blockMuted,
                    )}
                />
            ))}
        </svg>
    );
}

export function GlobalLoading({
    theme = "light",
    fullScreen = false,
    className,
    size = "md"
}: GlobalLoadingProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading"
            className={cn(
                "flex w-full items-center justify-center",
                fullScreen ? "min-h-screen" : "min-h-[12rem] flex-1",
                fullScreen
                    ? theme === "app"
                        ? "bg-app-bg" : "bg-background"
                    : theme === "app"
                        ? "bg-transparent" : undefined,
                className
            )}
        >
            <LoadingIndicator theme={theme} size={size} />
        </div>
    )
}