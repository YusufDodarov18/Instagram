"use client"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const page = () => {
    const {t}=useTranslation()
    return (
       <div className="py-[42px] px-[8px] w-[90%] flex flex-col gap-10">
            <h1 className="text-xl font-bold">{t("tags_and_mentions")}</h1>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg">{t("who_can_tag_you")}</h2>
                <p className="text-gray-500 text-xs">{t("who_can_tag_you_description")}</p>
                <p className="text-gray-500 text-xs">{t("limited_interactions_enabled")}</p>
                <div className="pt-3 flex flex-col gap-4">
                    <div className="flex flex-col gap-5 py-4 px-4 rounded-2xl border-2">
                        <div className="flex justify-between gap-3 items-center">
                            <div className="flex flex-col">
                                <h3>{t("allow_tags_from_anyone")}</h3>
                            </div>
                            <RadioGroup>
                                <RadioGroupItem value="onn" />
                            </RadioGroup>
                        </div>
                        <div className="flex justify-between gap-3 items-center">
                            <div className="flex flex-col">
                                <h3>{t("allow_tags_from_following")}</h3>
                            </div>
                            <RadioGroup>
                                <RadioGroupItem value="off" />
                            </RadioGroup>
                        </div>
                        <div className="flex justify-between gap-3 items-center">
                            <div className="flex flex-col">
                                <h3>{t("disable_tags")}</h3>
                            </div>
                            <RadioGroup>
                                <RadioGroupItem value="off" />
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-5 py-4 px-4 rounded-2xl border-2">
                        <span>{t("manually_approve_tags")}</span>
                        <Link href={``}>
                            <svg aria-label="Одобрять метки вручную" className="rotate-[90deg]" fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14">
                                <title>Одобрять метки вручную</title>
                                <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h2 className="text-lg">{t("who_can_mention_you")}</h2>
                <p className="text-gray-500 text-xs">{t("who_can_mention_you_description")}</p>
                <div className="flex flex-col gap-5 py-4 px-4 rounded-2xl border-2">
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col">
                            <h3>{t("allow_mentions_from_everyone")}</h3>
                        </div>
                        <RadioGroup>
                            <RadioGroupItem value="onn" />
                        </RadioGroup>
                    </div>
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col">
                            <h3>{t("allow_mentions_from_following")}</h3>
                        </div>
                        <RadioGroup>
                          <RadioGroupItem value="off" />
                        </RadioGroup>
                    </div>
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col">
                            <h3>{t("disable_mentions")}</h3>
                        </div>
                        <RadioGroup>
                          <RadioGroupItem value="off" />
                        </RadioGroup>
                    </div>
                </div>
            </div>
       </div>
    );
}

export default page;
