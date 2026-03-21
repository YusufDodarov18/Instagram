"use client"
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const page = () => {
  const {t}=useTranslation()
  return (
    <div className="px-[14px] py-[34px]">
      <div className="flex flex-col gap-5">
        <div className="py-[2px]">
          <h1 className="text-[22px] font-black">{t("Notifications")}</h1>
        </div>
         <div className="w-[90%] h-[120px] rounded-[17px] px-[18px] flex flex-col gap-4 items-center justify-center border-2 cursor-pointer">
            <Link className="w-[100%] flex justify-between items-center text-[#0C1014] dark:text-white" href={`/settings/accounts/notification/push`}>
              <p>{t("setting.Push notifications")}</p>
              <svg aria-label="Push-уведомления" className="rotate-[90deg]" fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14">
                <title>Push-уведомления</title>
                <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
              </svg>
            </Link>
            <Link className="w-[100%] flex justify-between text-[#0C1014] dark:text-white" href={`/settings/accounts/notification/email`}>
              <p>{t("setting.Email notifications")}</p>
              <svg aria-label="Push-уведомления" className="rotate-[90deg]" fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14">
                <title>Push-уведомления</title>
                <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
              </svg>
            </Link>
         </div>
      </div>
    </div>
  );
}

export default page;
