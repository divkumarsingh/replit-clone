
type ChevronIconProps = {
    direction: "left" | "right" | "down" | "up"
    size?: number;
    className?: string
};

export function ChevronIcon({
    direction,
    size = 16,
    className
}: ChevronIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden>
            {direction === 'right' ? (
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.53 11.47a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 1 1-1.06-1.06l5.72-5.72H5a.75.75 0 0 1 0-1.5h12.19l-5.72-5.72a.75.75 0 0 1 1.06-1.06l7 7Z"
                />
            ) : direction === 'down' ? (
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.47 19.53a.75.75 0 0 0 1.06 0l7-7a.75.75 0 1 0-1.06-1.06l-5.72 5.72V5a.75.75 0 0 0-1.5 0v12.19l-5.72-5.72a.75.75 0 0 0-1.06 1.06l7 7Z"
                />
            ) : direction === 'up' ? (
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.47 4.47a.75.75 0 0 1 1.06 0l7 7a.75.75 0 0 1-1.06 1.06l-5.72-5.72V19a.75.75 0 0 1-1.5 0V5.81l-5.72 5.72a.75.75 0 0 1-1.06-1.06l7-7Z"
                />
            ) : (
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.47 11.47a.75.75 0 0 0 0 1.06l7 7a.75.75 0 1 0 1.06-1.06l-5.72-5.72H19a.75.75 0 0 0 0-1.5H6.81l5.72-5.72a.75.75 0 0 0-1.06-1.06l-7 7Z"
                />
            )}
        </svg>
    )
}