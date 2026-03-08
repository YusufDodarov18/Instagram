'use client'

import { DecodedToken } from "@/app/(router)/types";
import { jwtDecode } from "jwt-decode"

export function saveToken(token:string){
    localStorage.setItem("access_token",token)
}

export default function getToken(){
    try {
        return jwtDecode<DecodedToken>(localStorage.getItem("access_token")||"")
    } catch (err)
    { 
        console.error(err)
        throw new Error("Пользователь не зарегистрирован!")
    }
}

export function destroyToken(){
    localStorage.removeItem("access_token");
    document.cookie = "token=; max-age=0; path=/";
    window.location.pathname = "/login";
}
