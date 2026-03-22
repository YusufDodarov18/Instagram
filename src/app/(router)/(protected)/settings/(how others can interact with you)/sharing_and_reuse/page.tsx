"use client"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

function page() {
    const {t}=useTranslation()
     return (
          <div className="py-[42px] px-[8px] w-[90%] flex flex-col gap-12">
              <h1 className="text-xl font-bold">{t("reshare_and_reuse")}</h1>
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold">{t("allow_story_sharing")}</h2>
                <div className="flex flex-col gap-5 py-4 px-4 rounded-2xl border-2">
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg">{t("story_reshares")}</h3>
                        </div>
                        <Switch/>
                    </div>
                </div>
                <p className="text-gray-500 text-xs mt-2">{t("story_reshares_description")}</p>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-bold">{t("allow_post_and_reels_sharing")}</h2>
                <div className="flex flex-col gap-5 py-4 px-4 rounded-2xl border-2">
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col"><h3>{t("share_posts_and_reels_to_stories")}</h3></div>
                        <Switch/>
                    </div>
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col"><h3>{t("post_and_reels_reshares")}</h3></div>
                        <Switch/>
                    </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-bold">{t("allow_external_sharing")}</h2>
                <h4>{t("embed_on_websites")}</h4>
                <p className='text-gray-500 text-xs'>
                    {t("embed_description")}
                    <Link href={`https://help.instagram.com/620154495870484`} className='text-blue-500 hover:underline'>
                        {" "}{t("Read more")}
                    </Link>
                </p>
                <div className="flex flex-col gap-5 py-4 px-4 rounded-2xl border-2">
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col"><h3>{t("on")}.</h3></div>
                        <RadioGroup><RadioGroupItem value="onn" /></RadioGroup>
                    </div>
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col"><h3>{t("off")}.</h3></div>
                        <RadioGroup><RadioGroupItem value="off" /></RadioGroup>
                    </div>
                </div>
              </div>
          </div>
     )
}

export default page;
