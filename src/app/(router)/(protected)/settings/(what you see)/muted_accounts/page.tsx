"use client"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"

function page() {
    const router=useRouter()
    const {t}=useTranslation()
     return <div className="py-[42px] px-[8px] w-[90%] flex flex-col gap-8">
        <div className="flex gap-2 items-center">
            <svg aria-label="Назад" className="rotate-[-90deg] mt-[6px] cursor-pointer" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" onClick={()=>router.back()}>
                <title>Назад</title>
                <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
            </svg>
            <h1 className="text-2xl font-black">{t("setting.hidden_accounts")}</h1>
        </div>
        <div className="w-[90%] h-[100px] flex justify-center items-center">
            <p className="text-md text-gray-500">{t("no_hidden_users")}</p>
        </div>
     </div>
}

export default page