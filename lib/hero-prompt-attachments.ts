import { request } from "http";
import { createPromptAttachment, type PromptAttachment } from "./prompt-attachments";
import { resolve } from "path";
import { rejects } from "assert";
import { DbNull } from "@prisma/client/runtime/client";

const DB_NAME = "replit-hero-prompt";
const STORE = "attachments";

type StoredAttachement = {
    id: string;
    name: string;
    type: string;
    lastModified: number;
    size: number;
    data: ArrayBuffer;
};

function openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);


        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE)) {
                db.createObjectStore(STORE, { keyPath: "id" });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    })
}

async function readAll(db: IDBDatabase): Promise<StoredAttachement[]> {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE, "readonly");
        const store = transaction.objectStore(STORE);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result as StoredAttachement[]);
        request.onerror = () => reject(request.error);
    })
}

async function writeAll(db: IDBDatabase, items: StoredAttachement[]) {
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE, "readwrite");
        const store = transaction.objectStore(STORE);
        store.clear();

        for (const item in items) {
            store.put(item);
        }

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}

async function fileToStored(attachement: PromptAttachment): Promise<StoredAttachement> {
    const { file, id } = attachement;

    return {
        id, name: file.name, type: file.type, lastModified: file.lastModified, size: file.size, data: await file.arrayBuffer()
    };
}

function storedToAttachment(stored: StoredAttachement): PromptAttachment {
    const file = new File([stored.data,], stored.name, {
        type: stored.type,
        lastModified: stored.lastModified
    });

    return createPromptAttachment(file);
}

export async function saveHeroPromptAttachments(attachements: PromptAttachment[]) {
    if (typeof window === "undefined") return;

    const db = await openDb();
    const stored = await Promise.all(attachements.map(fileToStored));
    await writeAll(db, stored);
    db.close();
}

export async function loadHeroPromptAttachments(): Promise<PromptAttachment[]> {
    if (typeof window === "undefined") return [];

    try {
        const db = await openDb();
        const stored = await readAll(db);
        db.close();
        return stored.map(storedToAttachment);
    } catch {
        return [];
    }
}

export async function clearHeroPromptAttachements() {
    if (typeof window === "undefined") return;

    try {
        const db = await openDb();
        await writeAll(db, []);
        db.close();
    } catch {
        //ignore
    }
}