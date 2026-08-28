export function slugify(value: string, maxLength = 48) {
    return value.toLocaleLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace("/^-+|+$/g", "").slice(0, maxLength);
}

export function slugifyUserName(input: string) {
    return slugify(input, 40);
}

export function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 * 1024).toFixed(1)} MB`;
}

export async function uniqueSlugWithSuffix(
    base: string,
    exists: (candidate: string) => Promise<boolean>,
    fallback: string
) {
    let candidate = slugify(base) || fallback;
    let suffix = 0;

    while (await exists(candidate)) {
        suffix += 1;
        candidate = `${slugify(base) || fallback}-${suffix}`;
    }

    return candidate;
}

export function formatRelativeTime(value: string | Date) {
    const date = typeof value === "string" ? new Date(value) : value;
    const diffMs = Date.now() - date.getTime();
    const minutes = Math.floor(diffMs / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString(undefined,
        {
            month: "short",
            day: "numeric"
        }
    )

}