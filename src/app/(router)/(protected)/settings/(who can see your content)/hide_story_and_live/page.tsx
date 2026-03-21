"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "react-i18next"

export default function page() {
    const {t}=useTranslation()
    const pathname=usePathname()
    return <div className="py-[49px] px-[8px] flex flex-col gap-8">
        <h1 className="font-black text-2xl">{t("setting.Hide history and broadcasts")}</h1>
        <Link className="w-[90%] h-[60px] px-[15px] border-2 rounded-[10px] flex justify-between items-center" href={`${pathname}/hide_story_and_live_from`}>
            <p>{t("setting.Hide history and broadcasts from...")}</p>
            <svg aria-label="Скрывать историю и эфиры от…" className="rotate-[90deg]" fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14">
                <title>Скрывать историю и эфиры от…</title>
                <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
            </svg>
        </Link>
    </div>
}
