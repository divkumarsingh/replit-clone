export function slugify(value: string, maxLength = 48) {
    return value.toLocaleLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace("/^-+|+$/g", "").slice(0, maxLength);
}

export function slugifyUserName(input: string) {
    slugify(input, 40);
}
