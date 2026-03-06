import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Typography from "@mui/material/Typography"
import { X } from "lucide-react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

const Report = ({open,onClose}:{open:boolean,onClose:()=>void}) => {
    const file=useRef<null|HTMLInputElement>(null)
    const {t}=useTranslation()
    return (
         <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="[&>button]:hidden p-0 m-0 bg-white dark:bg-[#14171a]">
                        <div className="flex justify-center gap-2 relative py-3 border-b-1 border-b-[#5b5b61]">
                              <Typography variant="body1" sx={{fontWeight:600}}>{t("layout.mores.problem")}</Typography> 
                              <X onClick={onClose} className="absolute right-4 cursor-pointer"/>
                        </div>
                        <div className="px-5 py-1 flex flex-col">
                              <textarea className="outline-0 h-[91px] text-gray-600 dark:text-gray-300 resize-none border-1 border-[#bbbbc0] py-3 px-2" placeholder={t("Please describe the problem in as much detail as possible...")} />
                              <input ref={file} type="file" className="hidden" />
                        </div>
                        <div className="px-5 flex gap-1 justify-between">
                              <Button className="bg-[#1a52eb] cursor-pointer text-white hover:bg-[#245aec]">{t("Submit a report")}</Button>
                              <Button onClick={()=>file.current?.click()} className="bg-[#F0F2F5] cursor-pointer text-black hover:bg-[#d1d3d6] dark:bg-[#25292e] hover:dark:bg-[#282b2e] dark:text-white">{t("add file")}</Button>
                        </div>
                        <div className="px-5 pb-2">
                              <p className="text-gray-500 text-xs">{t("Your Instagram username and browser information will be automatically included in your message.")}</p>
                        </div>
                </DialogContent>
         </Dialog>
    )
}

export default Report
