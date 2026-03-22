"use client"
import { useTranslation } from "react-i18next"
import exclamation from "../../../../../widget/images/exclamation.png"
import Link from "next/link"

export default function Page() {
    const {t}=useTranslation()
    return (
        <div className="py-[102px] px-[8px] w-[90%] flex flex-col gap-26">
            <div className="w-[90%] h-[100px] flex flex-col justify-center gap-3 items-center text-center">
                <img src={exclamation.src} className="w-[100px] h-[100px]" alt="image" />
                <h1 className="text-lg font-bold">{t("no_paid_subscriptions")}</h1>
                <p className="text-gray-500">{t("no_paid_subscriptions_description")}</p>
            </div>
            <div className="w-[90%] pt-[20px] flex flex-col gap-3 border-t-2">
                <h1 className="text-xl font-bold">{t("Setting")}</h1>
                <div className="flex justify-between items-center gap-1 pt-4">
                    <div className="flex gap-2 items-center justify-center">
                        <svg aria-label="Помощь и поддержка" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <title>Помощь и поддержка</title>
                            <path d="M12 .5A11.5 11.5 0 1 0 23.5 12 11.513 11.513 0 0 0 12 .5Zm5.786 14.458a6.486 6.486 0 0 0 0-5.916l2.188-2.188a9.438 9.438 0 0 1 0 10.292Zm-8.968.224A4.499 4.499 0 1 1 12 16.5a4.468 4.468 0 0 1-3.182-1.318Zm8.328-11.156-2.188 2.188a6.485 6.485 0 0 0-5.916 0L6.854 4.026a9.438 9.438 0 0 1 10.292 0ZM4.026 6.855l2.188 2.187a6.486 6.486 0 0 0 0 5.916l-2.188 2.187a9.438 9.438 0 0 1 0-10.29Zm2.828 13.119 2.188-2.188a6.486 6.486 0 0 0 5.916 0l2.188 2.188a9.438 9.438 0 0 1-10.292 0Z"></path>
                        </svg>
                        <span>{t("help_and_support")}</span>
                    </div>
                    <Link href={`https://help.instagram.com/357872324807367`}>
                        <svg aria-label="Push-уведомления" className="rotate-[90deg]" fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14">
                            <title>Помощь и поддержка</title>
                            <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}
