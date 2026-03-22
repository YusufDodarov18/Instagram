import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {links} from "./links"

const SettingFooter = () => {
  const {t}=useTranslation()

      const [width,setWidth]=useState(0)
      const selected=useRef<HTMLSelectElement|null>(null)
  
      const languages:string[]=[
        "Afrikaans","العربية","Čeština","Dansk","Deutsch","Ελληνικά","English","English (UK)",
        "Español (España)","Español","فارسی","Suomi","Français","עברית","Bahasa Indonesia",
        "Italiano","日本語","한국어","Bahasa Melayu","Norsk","Nederlands","Polski","Português (Brasil)",
        "Português (Portugal)","Русский","Svenska","ภาษาไทย","Filipino","Türkçe","中文(简体)","中文(台灣)",
        "বাংলা","ગુજરાતી","हिन्दी","Hrvatski","Magyar","ಕನ್ನಡ","മലയാളം","मराठी","नेपाली","ਪੰਜਾਬੀ",
        "සිංහල","Slovenčina","தமிழ்","తెలుగు","اردو","Tiếng Việt","中文(香港)","Български",
        "Français (Canada)","Română","Српски","Українська"
      ]
  
      const updateWidth=():void=>{
          if (!selected.current) return;
  
          const tempSpan=document.createElement("span")
          tempSpan.style.visibility="hidden"
           tempSpan.style.whiteSpace = "pre";
           tempSpan.style.font = "inherit";
           tempSpan.innerText = selected.current.value;
           document.body.appendChild(tempSpan);
           setWidth(tempSpan.offsetWidth);
           document.body.removeChild(tempSpan);
      }
  
      useEffect(()=>{
          updateWidth()
      },[])
  
      const handleChange=(e:React.ChangeEvent<HTMLSelectElement>):void=>{
          e.preventDefault()
          updateWidth()
      }
  return (
    <div className="w-[90%] flex flex-col justify-center gap-2">
      <div className="flex gap-3 justify-center flex-wrap">
        {links.map((elem, i) => (
            <Link href={elem.link} key={i}>
              <p className="text-xs text-gray-500 hover:underline">{t(elem.name)}</p>
            </Link>
          ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <select ref={selected} style={{width:`${width}px`}} onChange={handleChange} className="outline-none text-xs focus:outline-none focus:ring-0 dark:text-[#A8A8A8] text-[gray]">
            {languages.map((lang,i)=>(
                <option key={i} value={lang}>{lang}</option>
            ))}
        </select>
        <p className="text-xs text-gray-500">© 2026 Instagram from Meta</p>
      </div>
    </div>
  )
}

export default SettingFooter
