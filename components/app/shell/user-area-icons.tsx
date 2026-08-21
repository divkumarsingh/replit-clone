export function AccountIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true">
            <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            <path
                d="M5 19.5c0-3.5 3.1-5.5 7-5.5s7 2 7 5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function SettingsIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true">
            <path
                d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M19.4 13.5a7.4 7.4 0 0 0 .1-3l2-1.2-2-3.5-2.3.7a7.5 7.5 0 0 0-2.6-1.5L14.5 2h-5L9.4 5a7.5 7.5 0 0 0-2.6 1.5l-2.3-.7-2 3.5 2 1.2a7.4 7.4 0 0 0 0 3l-2 1.2 2 3.5 2.3-.7a7.5 7.5 0 0 0 2.6 1.5L9.5 22h5l.1-3a7.5 7.5 0 0 0 2.6-1.5l2.3.7 2-3.5-2-1.2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function BillingIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true">
            <rect
                x="3"
                y="6"
                width="18"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
            <path
                d="M7 15h4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function TrashIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true">
            <path
                d="M5 7h14M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7m2 0v11.5A1.5 1.5 0 0 1 15.5 20h-7A1.5 1.5 0 0 1 7 18.5V7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 10v6M14 10v6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function OpenProjectIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true">
            <path
                d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ExternalLinkIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true">
            <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
