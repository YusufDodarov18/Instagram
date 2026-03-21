import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){
    const token=req.cookies.get("token")?.value

    const {pathname}=req.nextUrl

    const isAuthPage=pathname.startsWith("/login") ||pathname.startsWith("/registration")

    if(!token &&!isAuthPage){
        return NextResponse.redirect(new URL("/login", req.url))
    }
    if(token&&isAuthPage){
        return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
}

export const config={
    matcher:[
        "/","/explore","/reels","/settings","/settings/:path*","/login","/registration","/profile","/profile/:path","/chats","/chats/:path","/archive"
    ]
}
