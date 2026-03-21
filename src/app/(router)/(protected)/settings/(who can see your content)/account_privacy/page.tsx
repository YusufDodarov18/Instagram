"use client"

import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function page() {
    const {t}=useTranslation()
    return (
        <div className="py-[49px] px-[8px] flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <h1 className="font-bold text-2xl font-sans">{t("setting.account_privacy.Account privacy")}</h1>  
                <div className="w-[90%] py-[22px] rounded-[17px] px-[18px] flex flex-col gap-4 items-center justify-center border-2 cursor-pointer">
                    <div className="w-[100%] flex justify-between items-center text-[#0C1014] dark:text-white">
                        <p>{t("setting.account_privacy.Private account")}</p>
                        <Switch className="scale-110" />
                    </div>
                </div>  
            </div>       
              
            <div className="flex flex-col gap-4">
                <p className="text-gray-500 text-xs">{t("setting.account_privacy.When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they don't have an Instagram account.")}</p>
                <p className="text-gray-500 text-xs">
                    {t("setting.account_privacy.When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists. Certain info on your profile, like your profile picture and username, is visible to everyone on and off Instagram.")}
                    <Link href={`https://help.instagram.com/116024195217477`}>
                        <span className="text-blue-500 hover:underline"> {t("authentication.register.contactInfoMore")}</span>
                    </Link>
                </p>
            </div>  
        </div>
    )
}
