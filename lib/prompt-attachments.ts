export const MAX_PROMPT_ATTACHMENTS = 10;
export const MAX_PROMPT_ATTACHMENTS_BYTES = 25 * 1024 * 1024;

export const PROMPT_ATTACHMENT_DIR = "_attachments";

const ALLOWED_EXTENSTIONS = new Set([
    'jpg',
    'jpeg',
    'png',
    'gif',
    'webp',
    'svg',
    'pdf',
    'doc',
    'docx',
    'txt',
    'md',
    'csv',
    'xls',
    'xlsx',
    'json',
    'xml',
    'html',
    'htm',
    'zip',
    'ppt',
    'pptx',
    'rtf',
    'ts',
    'tsx',
    'js',
    'jsx',
    'py',
    'java',
    'cpp',
    'c',
    'go',
    'rs',
    'yaml',
    'yml',
]);

const ALLOWED_MIME_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/markdown',
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/json',
    'application/xml',
    'text/xml',
    'text/html',
    'application/zip',
    'application/x-zip-compressed',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/rtf',
    'text/javascript',
    'application/javascript',
    'text/x-python',
    'text/x-java-source',
    'text/x-c',
    'text/yaml',
    'application/octet-stream',
]);

export const PROMPT_ATTACHMENT_ACCEPT = [
    'image/*',
    '.pdf',
    '.doc',
    '.docx',
    '.txt',
    '.md',
    '.csv',
    '.xls',
    '.xlsx',
    '.json',
    '.xml',
    '.html',
    '.zip',
    '.ppt',
    '.pptx',
    '.rtf',
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.py',
    '.java',
    '.cpp',
    '.c',
    '.go',
    '.rs',
    '.yaml',
    '.yml',
].join(',');

export type PromptAttachment = {
    id: string;
    file: File;
}

function getExtension(filename: string) {
    const parts = filename.split(".");
    return parts.length > 1 ? (parts.pop()?.toLowerCase() ?? "") : "";
}

export function validatePromptAttachment(file: File): string | null {
    if (file.size === 0) {
        return "File is empty";
    }

    if ((file.size) > MAX_PROMPT_ATTACHMENTS_BYTES) {
        return `${file.name} exceeds 25MB limit`
    };

    const extension = getExtension(file.name);
    const mimeAllowed =
        !file.type || file.type.startsWith("image/");

    const extensionAllowed = extension ? ALLOWED_EXTENSTIONS.has(extension) : false;

    if (!mimeAllowed && !extensionAllowed) {
        return `${file.name} is not supported file type.`;
    }
    return null;
}

export function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024 * 1024).toFixed(1)}MB`;
}

export function createPromptAttachment(file: File): PromptAttachment {
    return {
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        file
    }
}