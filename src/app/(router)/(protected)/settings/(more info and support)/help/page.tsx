"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"

function page() {
    const {t}=useTranslation()
    const pathName=usePathname()
    const router=useRouter()
    return (
        <div className="py-[49px] px-[8px] flex flex-col gap-10">
            <div className="flex gap-2 items-center">
                <svg aria-label="Назад" className="rotate-[-90deg] cursor-pointer" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" onClick={()=>router.back()}>
                    <title>Назад</title>
                    <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                </svg>
                <h1 className="text-xl font-black">{t("other.help")}</h1>
            </div>
            <div className="flex flex-col gap-6">
                <Link className="flex justify-between items-center gap-1 w-[90%]" href={`https://help.instagram.com/`}>
                    <span className="text-md">{t("help_center")}</span>
                    <svg aria-label="Справочный центр" className="rotate-[90deg]" fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14">
                      <title>Справочный центр</title>
                      <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                    </svg>
                </Link>
                <Link className="flex justify-between items-center gap-1 w-[90%]" href={`${pathName}/account_status`}>
                    <span className="text-md">{t("setting.account_status")}</span>
                    <svg aria-label="Статус аккаунта" className="rotate-[90deg]" fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14">
                      <title>Статус аккаунта</title>
                      <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                    </svg>
                </Link>
                <Link className="flex justify-between items-center gap-1 w-[90%]" href={``}>
                    <span className="text-md">{t("privacy_and_security")}</span>
                    <svg aria-label="Конфиденциальность и безопасность" className="rotate-[90deg]" fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14">
                      <title>Конфиденциальность и безопасность</title>
                      <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                    </svg>
                </Link>
                <Link className="flex justify-between items-center gap-1 w-[90%]" href={``}>
                    <span className="text-md">{t("support_requests")}</span>
                    <svg aria-label="Запросы поддержки" className="rotate-[90deg]" fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14">
                      <title>Запросы поддержки</title>
                      <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                    </svg> 
                </Link>
                <Link className="flex justify-between items-center gap-1 w-[90%]" href={``}>
                    <div className="flex flex-col gap-1">
                        <span className="text-md">{t("tell_us_about_your_experience")}</span>
                        <p className="text-gray-500 text-xs">{t("how_satisfied_with_help")}</p>
                    </div>
                    <svg aria-label="Расскажите нам о своем опыте" className="rotate-[90deg]" fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14">
                      <title>Расскажите нам о своем опыте</title>
                      <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                    </svg>
                </Link>
            </div>
        </div>
    )
}
export default page
