import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import next from "next";

export async function proxy(request: NextRequest) {
    const { nextUrl } = request;
    const pathname = nextUrl.pathname;

    if (pathname.startsWith("/api/auth")) return NextResponse.next();
    if (pathname.startsWith("/api/webhooks")) return NextResponse.next();
    if (pathname === "/") return NextResponse.next();
    if (pathname.startsWith("/p/")) return NextResponse.next();
    if (pathname.startsWith("/api/projects") && pathname.includes("/preview/")) {
        return NextResponse.next();
    }

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        const loginUrl = new URL("/", nextUrl.origin);
        loginUrl.searchParams.set("auth", "login");
        loginUrl.searchParams.set("callbackUrl", `${pathname}${nextUrl.search}`);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2)$).*)',
    ],
};
