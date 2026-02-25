import React from 'react'
import { useTranslation } from 'react-i18next';

const Togged = () => {
    const {t}=useTranslation()
    return (
        <div className='text-black dark:text-white pb-7 text-center'><br /><br /><br />
            <svg aria-label="Фото с вами" className="x1lliihq x1n2onr6 x5n08af m-auto" fill="currentColor" height="62" role="img" viewBox="0 0 96 96" width="62">
                <circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                <path d="M56.826 44.119a8.824 8.824 0 1 1-8.823-8.825 8.823 8.823 0 0 1 8.823 8.825Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></path>
                <path d="M63.69 67.999a9.038 9.038 0 0 0-9.25-8.998H41.56A9.038 9.038 0 0 0 32.31 68" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M48 20.215c-2.94 0-7.125 8.76-11.51 8.785h-4.705A8.785 8.785 0 0 0 23 37.784v22.428a8.785 8.785 0 0 0 8.785 8.785h32.43A8.785 8.785 0 0 0 73 60.212V37.784A8.785 8.785 0 0 0 64.215 29h-4.704c-4.385-.026-8.57-8.785-11.511-8.785Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></path>
            </svg>
            <h1 className='font-[900] text-[30px] mt-[15px] mb-[10px]'>{t("A photo with you")}</h1>
            <p>{t("This shows people who have tagged you in their photos.")}</p>
        </div>
    )
}

export default Togged;