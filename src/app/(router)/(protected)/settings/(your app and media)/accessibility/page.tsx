"use client"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "react-i18next"
export default function Page() {
    const {t}=useTranslation()
    return <div className="py-[42px] px-[8px]">
        <div className="flex flex-col gap-7">
            <h1 className="font-bold text-2xl font-sans">{t("accessibility")}</h1>
            <div className="w-[90%] py-[22px] rounded-[17px] px-[18px] flex flex-col gap-4 items-center justify-center border-2">
              <div className="w-[100%] flex justify-between items-center text-[#0C1014] dark:text-white">
                 <p>{t("reduce_motion")}</p>
                 <Switch />
               </div>
            </div>
            <div className="pt-[12px]">
                <p className="text-gray-500 font-bold text-xs">{t("reduce_motion_chat_effects")}</p>
            </div>
        </div>
    </div>
}
