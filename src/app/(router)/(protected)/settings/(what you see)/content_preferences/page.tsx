"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Page() {
    const {t}=useTranslation()
    const pathName=usePathname()
    return <div className="py-[42px] px-[8px]">
        <div className="flex flex-col gap-6">
            <h1 className="font-bold text-2xl font-sans">{t("setting.content_settings")}</h1>
            <h2 className="font-bold text-lg font-sans">{t("content_from_unfollowed_accounts")}</h2>
            <div className="w-[90%] py-[22px] rounded-[17px] px-[18px] flex flex-col gap-4 items-center justify-center border-2 cursor-pointer">
                <Link className="w-[100%] flex justify-between items-center text-[#0C1014] dark:text-white" href={`${pathName}/sensitive_content`}>
                    <p>{t("sensitive_content")}</p>
                    <svg className="rotate-[90deg]" fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14">
                      <title>Потенциально неприемлемый контент</title>
                      <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                    </svg>
                </Link>
            </div>
        </div>
    </div>
}