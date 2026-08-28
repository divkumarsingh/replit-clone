import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { adapter } from "next/dist/server/web/adapter";
import prismaConfig from "@/prisma.config";


const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
};

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error("DATABASE_URL is not set")
    }

    const adapter = new PrismaPg({ connectionString });

    return new PrismaClient({ adapter });
}

function getPrismaClient() {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = createPrismaClient();
    }

    return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
    get(_target, property) {
        const client = getPrismaClient();
        const value = client[property as keyof PrismaClient];

        if (typeof value === "function") {
            return value.bind(client)
        }

        return value;
    }
})

createPrismaClient();