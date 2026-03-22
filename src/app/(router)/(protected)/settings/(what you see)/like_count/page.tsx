"use client"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function Page() {
    const {t}=useTranslation()
    return <div className="py-[42px] px-[8px] w-[90%] flex flex-col gap-8">
                <div className="flex gap-2 items-center">
                    <h1 className="text-2xl font-black">{t("Number of likes and reposts")}</h1>
                </div>
                <div className="w-[90%] flex justify-between items-center gap-2">
                    <h5 className="text-lg">{t("Hide the number of likes and shares")}</h5>
                    <Switch className="scale-125"/>
                </div>
                <p className="text-gray-500 font-sans text-xs">{t("hide_likes_description_instagram")}</p>
                <p className="text-gray-500 font-sans text-xs">
                    {t("hide_likes_description_threads")}
                    <Link className="text-blue-500 cursor-pointer" href={`https://help.instagram.com/113355287252104`}>
                        {t("Read more")}
                    </Link>
                </p>
            </div>
}