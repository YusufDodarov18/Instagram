import { useEffect, useRef, useState } from "react"

export default function SelectLanguages() {
    const [width,setWidth]=useState<number>(0)
    const selected=useRef<HTMLSelectElement>(null)

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
         setWidth(tempSpan.offsetWidth + 30);
         document.body.removeChild(tempSpan);
    }

    useEffect(()=>{
        updateWidth()
    },[])

    const handleChange=(e:React.ChangeEvent<HTMLSelectElement>):void=>{
        updateWidth()
    }

    return (
        <select ref={selected} style={{width:`${width}px`}} onChange={handleChange} className="outline-none focus:outline-none focus:ring-0 dark:text-[#A8A8A8] text-[#5D6C7B]">
            {languages.map((lang,i)=>(
                <option key={i} value={lang}>{lang}</option>
            ))}
        </select>
    )
}
