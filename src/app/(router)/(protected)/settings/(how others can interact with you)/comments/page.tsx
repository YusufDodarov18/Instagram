"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";

const page = () => {
    const {t}=useTranslation()
    return (
        <div className="py-[49px] px-[8px] flex flex-col gap-8">
            <h1 className="font-black text-2xl">{t("setting.comments")}</h1>
            <div className="flex flex-col gap-3">
                <h4 className="">{t("allow_comments_from")}</h4>
                <RadioGroup defaultValue="all" className="pt-[19px]">
                    <label className="flex items-start gap-3">
                        <RadioGroupItem value="all" />
                        <span>{t("everyone")}</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <RadioGroupItem value="following" />
                        <div className="flex flex-col items-start">
                            <p>{t("people_you_follow")}</p>
                            <p className="text-sm text-gray-500">24 {t("setting.man")}.</p>
                        </div>
                    </label>
                    <label className="flex items-center gap-3">
                        <RadioGroupItem value="your following" />
                        <div className="flex flex-col items-start">
                          <p>{t("your_followers")}</p>
                          <p className="text-sm text-gray-500">3 {t("setting.man")}.</p>
                        </div>
                    </label>
                    <label className="flex items-center gap-3">
                        <RadioGroupItem value="your following and followers" />
                        <div className="flex flex-col items-start">
                          <p>{t("followers_and_following")}</p>
                          <p className="text-sm text-gray-500">26 {t("setting.man")}.</p>
                        </div>
                    </label>
                    <label className="flex items-start gap-3">
                        <RadioGroupItem value="off" />
                        <span>{t("off")}.</span>
                     </label>
                </RadioGroup>
                <div className="flex justify-between w-[90%] mt-[12px]">
                    <h1 className="text-lg">{t("allow_gif_comments")} GIF</h1>
                    <Switch/>
                </div>
                <p className="text-gray-500 mt-[5px]">{t("allow_gif_comments_description")}</p>
            </div>
        </div>
    );
}

export default page;
