"use client"
import { useTranslation } from "react-i18next"

export default function page() {
    const {t}=useTranslation()
    return  <div className="py-[49px] px-[8px] flex flex-col gap-8">
        <div className="flex gap-2 items-center">
            <svg aria-label="Назад" className="rotate-[-90deg] cursor-pointer" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Назад</title>
                <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
            </svg>
            <h1 className="font-black text-2xl">{t("setting.Blocked accounts")}</h1>
        </div>
        <p className="text-gray-500">{t("setting.You can always block people from their profile.")}</p>
        <div className="flex justify-center w-[90%]">
            <p className="text-gray-500 mt-5">{t("setting.You have not blocked anyone.")}</p>
        </div>
    </div>
}