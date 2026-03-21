"use client"

import InitialLoading from '@/entities/initialLoading/initialLoading';
import React, { Fragment, useEffect, useState } from 'react'

export default function Layout({children}:{children:React.ReactNode}) {
    const [loading, setLoading]=useState(true);

    useEffect(() =>{
        const hasLoaded = sessionStorage.getItem("hasLoaded");
        if(hasLoaded){
            setLoading(false)
            return
        }else{
            const timer =setTimeout(()=>{
                setLoading(false);
                sessionStorage.setItem("hasLoaded", "true");
            },1000);
            return () => clearTimeout(timer);
        }
    }, [])
    return loading?<InitialLoading />:<Fragment>{children}</Fragment>
}
