"use client"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function Page() {
    const {t}=useTranslation()
    return <>
        <div className="py-[42px] px-[8px] w-[90%] flex flex-col gap-10">
            <h1 className="text-2xl font-bold">{t("hidden_words")}</h1>
            <div className="flex flex-col gap-3">
                <h2 className="text-lg font-bold">{t("unwanted_comments_and_messages")}</h2>
                <div className="flex flex-col gap-5 py-4 px-4 rounded-2xl border-2">
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg">{t("hide_comments")}</h3>
                            <p className="text-gray-500 text-xs">
                                {t("hide_comments_description")}
                                <Link className="text-blue-500" href={`https://help.instagram.com/700284123459336`}>{t("Read more")}</Link>
                            </p>
                        </div>
                        <Switch className="scale-125"/>
                    </div>
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col gap-2">
                            <h3>{t("advanced_comment_filtering")}</h3>
                            <p className="text-gray-500 text-xs">{t("advanced_comment_filtering_description")}</p>
                        </div>
                        <Switch className="scale-125"/>
                    </div>
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col gap-2">
                            <h3>{t("hide_message_requests")}</h3>
                            <p className="text-gray-500 text-xs">{t("hide_message_requests_description")}</p>
                        </div>
                        <Switch />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <h2 className="text-lg font-bold">{t("specific_words_in_messages_and_comments")}</h2>
                <div className="flex flex-col gap-5 py-4 px-4 rounded-2xl border-2">
                    <Link className="flex justify-between gap-3 items-center" href={``}>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg">{t("manage_word_list")}</h3>
                        </div>
                        <div className="">
                            <svg aria-label="Управлять списком слов и фраз" className="rotate-[90deg]" fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14">
                              <title>Управлять списком слов и фраз</title>
                              <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                            </svg>
                        </div>
                    </Link>
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col gap-2">
                            <h3>{t("hide_comments")}</h3>
                            <p className="text-gray-500 text-xs">{t("custom_words_hide_comments_description")}</p>
                        </div>
                        <Switch className="scale-125"/>
                    </div>
                    <div className="flex justify-between gap-3 items-center">
                        <div className="flex flex-col gap-3">
                            <h3>{t("hide_message_requests")}</h3>
                            <p className="text-gray-500 text-xs">{t("custom_words_hide_requests_description")}</p>
                        </div>
                        <Switch className="scale-125" />
                    </div>
                </div>
            </div>
        </div>
    </>
}