import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma"
import { nextCookies } from "better-auth/next-js";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Google Oauth is unavailable");
}

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    throw new Error("Github Oauth is unavailable");
}

const useDatabase = Boolean(process.env.DATABAE_URL);
export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    ...(useDatabase
        ? {
            database: prismaAdapter(prisma, {
                provider: "postgresql"
            }),
        } : {}
    ),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }
    },

    user: {
        additionalFields: {
            username: {
                type: "string",
                required: false
            }
        }
    },
    plugins: [nextCookies()]
});

export type Session = typeof auth.$Infer.Session;