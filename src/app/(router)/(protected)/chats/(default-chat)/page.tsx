'use client'
import ModalChat from "@/entities/chats/modal/component"
import { Button, Typography } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function EmptyChat() {
    const {t}=useTranslation()
    const [open,setOpen]=useState(false)
    return (
        <>
            <div className="flex flex-col h-full gap-4 px-3 justify-center items-center">
                <svg aria-label="message" className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="96" role="img" viewBox="0 0 96 96" width="96">
                    <title>Сообщения</title>
                    <circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                    <path d="m52.309 67.221 17.024-28.643c2.25-3.784-.478-8.578-4.88-8.578H31.55c-5.084 0-7.605 6.169-3.976 9.73l10.574 10.376 3.762 15.55c1.197 4.947 7.798 5.94 10.399 1.565Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                    <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="38.148" x2="55.675" y1="50.106" y2="40.134"></line>
                </svg>
                <Typography sx={{fontWeight:"900"}}>{t("messages_title")}</Typography>
                <p>{t("messages_description")}</p>
                <Button onClick={()=>setOpen(true)} sx={{bgcolor:"#4A5df9"}} variant="contained">{t("Send a message")}</Button>
            </div>
            <ModalChat onClose={() => setOpen(false)} open={ open}  />
        </>
    )
}
