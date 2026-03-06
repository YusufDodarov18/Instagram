import { destroyToken } from '@/api/token'
import { Theme } from '@/shared/theme/moddle-toggle'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import Report from '../report'

export default function SettingModal({open,onClose,left}:{open:boolean,onClose:()=>void,left:number}) {
    const menu=useRef<HTMLDivElement>(null)
    const [menuReport,setMenuReport]=useState<boolean>(false)
    const {t}=useTranslation()

    useEffect(()=> {
        const handler=(e:MouseEvent)=>{
            if(menu.current&& !menu.current.contains(e.target as Node)&& !menuReport){
                onClose()
            }
        }
        if(open) document.addEventListener('mousedown',handler)
        return()=>document.removeEventListener('mousedown',handler)
    },[open,onClose])

    if(!open)return null
    return createPortal(
        <>
            <div ref={menu} className='w-[290px] h-[280px] pt-[2px] rounded-[10px] fixed bottom-[20px] flex flex-col justify-center gap-2 shadow-2xl items-center bg-[#ffffff] dark:bg-[#292727]' style={{left}}>
                  <Link href={`/settings/accounts/edit`}>
                         <div className='flex w-[269px] h-[46px] gap-3 justify-start px-4 rounded-[5px] hover:bg-gray-50 hover:text-black hover:dark:bg-[#4a4848] hover:dark:text-white duration-100 items-center text-[18px]'>
                              <svg aria-label="Настройки" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20">
                                 <title>Настройки</title>
                                 <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                                 <path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                              </svg>
                              <span>{t("layout.mores.setting")}</span>
                         </div>
                  </Link>
                  <Link href={`/`}>
                         <div className='flex w-[269px] h-[46px] gap-3 justify-start px-4 rounded-[5px] hover:bg-gray-50 hover:text-black hover:dark:bg-[#4a4848] hover:dark:text-white duration-100 items-center text-[18px]'>
                              <svg aria-label="Ваши действия" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18">
                                  <title>Ваши действия</title>
                                  <path d="M19 1H5C2.794 1 1 2.794 1 5v14c0 2.206 1.794 4 4 4h14c2.206 0 4-1.794 4-4V5c0-2.206-1.794-4-4-4ZM5 3h14c1.103 0 2 .897 2 2v6h-2.382l-2.723-5.447c-.34-.678-1.45-.678-1.79 0L9 15.764l-2.105-4.211A1 1 0 0 0 6 11H3V5c0-1.103.897-2 2-2Zm14 18H5c-1.103 0-2-.897-2-2v-6h2.382l2.723 5.447a1 1 0 0 0 1.79 0L15 8.236l2.105 4.211A1 1 0 0 0 18 13h3v6c0 1.103-.897 2-2 2Z"></path>
                              </svg>
                              <span>{t("layout.mores.action")}</span>
                         </div>
                  </Link>
                  <div className='flex w-[269px] h-[46px] gap-3 justify-start px-4 rounded-[5px] cursor-pointer hover:bg-gray-50 hover:text-black hover:dark:bg-[#4a4848] hover:dark:text-white duration-100 items-center text-[18px]'>
                      <Theme />
                      <span>{t("layout.mores.mode")}</span>
                  </div>
                  <div className='flex w-[269px] h-[46px] gap-3 justify-start px-4 cursor-pointer rounded-[5px] hover:bg-gray-50 hover:text-black hover:dark:bg-[#4a4848] hover:dark:text-white duration-100 items-center text-[18px]' onClick={()=>setMenuReport(true)}>
                       <svg aria-label="Сообщить о проблеме" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20">
                          <title>Сообщить о проблеме</title>
                          <path d="M18.001 1h-12a5.006 5.006 0 0 0-5 5v9.005a5.006 5.006 0 0 0 5 5h2.514l2.789 2.712a1 1 0 0 0 1.394 0l2.787-2.712h2.516a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5Zm3 14.005a3.003 3.003 0 0 1-3 3h-2.936a1 1 0 0 0-.79.387l-2.274 2.212-2.276-2.212a1 1 0 0 0-.79-.387H6a3.003 3.003 0 0 1-3-3V6a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3Zm-9-1.66a1.229 1.229 0 1 0 1.228 1.228A1.23 1.23 0 0 0 12 13.344Zm0-8.117a1.274 1.274 0 0 0-.933.396 1.108 1.108 0 0 0-.3.838l.347 4.861a.892.892 0 0 0 1.77 0l.348-4.86a1.106 1.106 0 0 0-.3-.838A1.272 1.272 0 0 0 12 5.228Z"></path>
                       </svg>
                      <span>{t("layout.mores.problem")}</span>
                  </div>
                  <div onClick={()=>destroyToken()} className='border-t-1 flex items-center justify-start w-[269px] h-[46px] text-[18px] px-4 cursor-pointer rounded-[5px] hover:bg-gray-50 hover:text-black hover:dark:bg-[#4a4848] hover:dark:text-white duration-100'>
                     <span>{t("logout")}</span>
                  </div>
            </div>

                <Report onClose={()=>setMenuReport(false)} open={menuReport}/>
        </>,
        document.body
    )
}
