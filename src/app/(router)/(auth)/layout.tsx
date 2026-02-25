'use client'

import InitialLoading from '@/entities/initialLoading/initialLoading';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Layout({children}:{children:React.ReactNode}) {
    const [loading,setLoading]=useState<boolean>(true)
    const router=useRouter()

    useEffect(()=>{
        const token=localStorage.getItem("access_token")

        if(token){
            router.push("/")
        }

        const timer=setTimeout(()=>{
            setLoading(false)
        },1000)

        return()=>clearTimeout(timer)
    },[])

  if(loading) return <InitialLoading/>
    return (
        <>{children}</>
    )
}
