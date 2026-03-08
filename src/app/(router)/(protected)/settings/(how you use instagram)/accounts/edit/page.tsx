"use client"

import { useProfile } from "@/app/store/profile/myProfile/profile"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import defaultProfile from '../profile.png'
import { API } from "@/shared/utils/config"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

function page() {
    const {getMyProfile,myProfile}=useProfile()
    const [aboutText,setAboutText]=useState("")
    const maxLenght=150

    useEffect(()=> {
        getMyProfile()
    }, [getMyProfile])

      function handleChange(e:React.ChangeEvent<HTMLTextAreaElement>){
        if(e.target.value.length<=maxLenght){
            setAboutText(e.target.value)
        }
      }

    const {t}=useTranslation()
    return (
        <div className="flex items-center justify-center h-[100%] py-0 md:py-20">
            <div className="flex flex-col gap-12 px-6 py-5">
                 <h1 className="font-black text-2xl">{t("setting.Edit profile")}</h1>
                 <div className="w-[100%] flex justify-between items-center px-9 py-6 rounded-2xl bg-[#F3F5F7] dark:bg-[#262626]">
                      <div className="flex items-center gap-3">
                          <div>
                              <img 
                                    src={
                                        myProfile?.image?
                                        `${API}/images/${myProfile.image}`:
                                        defaultProfile.src
                                    } 
                                    alt="profile"
                                    className="w-[47px] h-[47px] rounded-[50%]" 
                              />
                          </div>
                          <div>
                             <h2 className="font-bold text-xl">{myProfile?.userName}</h2>
                             <h3 className="text-[#6A717A] dark:text-[#A8A8A8]">{myProfile?.firstName+" "+myProfile?.lastName}</h3>
                          </div>
                      </div>
                      <div>
                         <Button className="bg-[#4A5DF9] hover:bg-[#4a56f9] text-white font-bold w-[120px] h-[36px] text-lg cursor-pointer">{t("setting.account.Change photo")}</Button>
                      </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-xl">{t("setting.account.Website")}</h1>
                    <div className="w-[100%] cursor-no-drop px-9 py-6 rounded-2xl bg-[#F3F5F7] dark:bg-[#262626] select-none text-[17px] text-[#6A717A] dark:text-[#A8A8A8]">{t("setting.account.Website")}</div>
                    <p className="text-[#6A717A] dark:text-[#A8A8A8] indent-3">
                        {t("setting.account.Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.")}
                    </p>
                 </div>
                 <div className="flex flex-col gap-1 relative">
                     <h1 className="font-bold text-xl">{t("setting.account.Bio")}</h1>
                     <div className="relative">
                          <textarea
                                name="about" 
                                value={myProfile?.about?myProfile.about:aboutText}
                                onChange={handleChange}
                                maxLength={maxLenght}
                                className="resize-none w-full border border-gray-300 text-xl px-5 py-2 dark:border-white rounded-2xl" 
                           />
                          <p className="absolute bottom-2 right-3 text-sm text-gray-500 dark:text-gray-300">
                            {aboutText.length}/{maxLenght}
                          </p>
                     </div>
                 </div>
                 <div className="flex flex-col gap-2">
                     <h1 className="font-bold text-xl">{t("setting.account.Gender")}</h1>
                     <p className="text-[#6A717A] dark:text-[#A8A8A8] indent-1">{t("setting.account.This won’t be part of your public profile.")}</p>
                 </div>
                 <div className="flex flex-col gap-4.5 justify-start">
                    <h1 className="font-bold text-xl">{t("setting.account.Show account suggestions on profiles")}</h1>
                    <div className="rounded-2xl border-1 flex items-center py-5 px-5 gap-10 justify-between">
                       <div>
                         <h1 className="text-xl">{t("setting.account.Prefer not to say")}</h1>
                         <p className="text-[#6A717A] dark:text-[#A8A8A8] text-wrap">{t("setting.account.Choose whether people can see similar account suggestions on your profile, and whether your account can be suggested on other profiles.")}</p>
                       </div>
                       <Switch className="scale-[1.3] cursor-pointer" />
                     </div>
                    <p className="text-[#6A717A] dark:text-[#A8A8A8] indent-1">
                        {t("setting.account.Certain profile info, like your name, bio and links, is visible to everyone.")} 
                        <Link className="text-[#3d60ec] dark:text-[#708DFF] hover:underline" href={`https://help.instagram.com/347751748650214?ref=igweb`}>
                              {t("setting.account.See what profile info is visible")}
                         </Link>
                    </p>
                </div>
                <div className="flex justify-end">
                     <Button className="bg-[#4A5DF9] hover:bg-[#4A5DF9] text-white font-black w-70 h-15 cursor-pointer">{t("setting.account.Submit")}</Button>
                </div>
            </div>
        </div>
    )
}

export default page
