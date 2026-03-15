import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Switch } from '@/components/ui/switch'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const DropDownMenu = ({image}:{image:File}) => {
    const {t}=useTranslation()
    const router = useRouter()
  
    return (
        <Accordion type="multiple" collapsible defaultValue="shipping" className="max-w-70 w-full">
            <AccordionItem value="returns" className="pb-5">
                <AccordionTrigger className="text-lg">
                    {t("setting.accessibility")}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-3">
                    <Typography sx={{ color: "#A8A8A8" }} variant="body2">
                        {t("accessibility_info")}
                    </Typography>
                    <Box Box sx={{ display: "flex", gap: 2, alignItems: "center"}}>
                      <Image width={50} height={45} src={URL.createObjectURL(image)} alt="image" style={{ borderRadius: 4 }}/>
                      <input type="text" placeholder={t("write_alt_text")} className="w-[100%] p-[8px 4px] text-[14px] border-b-1 border-b-[#2a2a2a] text-[#A8A8A8] bg-transparent border-0 outline-0"/>
                    </Box>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
                <AccordionTrigger className="cursor-pointer text-lg">{t("advanced_settings")}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col items-center gap-3 py-3 px-2 pb-5">
              <Box sx={{display: "flex",justifyContent: "space-between",gap: 2,width: "100%"}}>
                 <Typography>{t("hide_likes_views")}</Typography>
                 <Switch className="scale-125 cursor-pointer" />
              </Box>
              <p className="text-[#6A717A] dark:text-[#A8A8A8]">
                {t("likes_views_info")}
                <span
                  className="text-[#708DFF] cursor-pointer hover:underline"
                  onClick={()=>router.push("https://help.instagram.com/113355287252104")}
                >
                  {t("authentication.register.contactInfoMore")}
                </span>
              </p>
            </AccordionContent>
            <AccordionContent className="flex flex-col gap-3 py-3 px-2">
              <Box sx={{display: "flex",justifyContent: "space-between",gap: 2,width: "100%"}}>
                <Typography>{t("turn_off_comments")}</Typography>
                <Switch className="scale-125 cursor-pointer" />
              </Box>
              <p className="text-[#6A717A] dark:text-[#A8A8A8]">{t("change_later_info")}</p>
            </AccordionContent>
            <AccordionContent className="flex flex-col items-center gap-3 py-3 px-2">
              <Box sx={{display: "flex",justifyContent: "space-between",gap: 2,width: "100%"}}>
                <Typography>{t("threads_auto_post")}</Typography>
                <Switch className="scale-125 cursor-pointer" />
              </Box>
              <p className="text-[#6A717A] dark:text-[#A8A8A8]">{t("threads_share_info")}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    )
}
