'use client'
import axiosRequest from "@/api/axiosRequest"
import { API } from "@/shared/utils/config"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const page = () => {
  // const myId=getToken()?.sid
  const [stories,setStories]=useState<any>([])
  const {t}=useTranslation()
  const searchParams=useSearchParams()
  const id=searchParams.get("id")
  const router=useRouter()
  
  if(!id){
    router.back()
  }

  useEffect(()=>{
    async function getMyStories() {
      try {
        const { data }=await axiosRequest.get(`${API}/Story/get-my-stories`)
        setStories(data.data.stories)
      } catch  {
        }
    }
    getMyStories()
  },[])
  return (
        <div className="sm:w-[100px] mx-[10px] pt-10 md:w-[1000px] w-[100%]">
              <div>
                  <Link className="flex items-center gap-[12px] text-[21px]" href={`/profile`}>
                      <svg aria-label="Назад" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20">
                          <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line>
                          <polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                      </svg>
                      <p>{t("Archive")}</p>
                  </Link>
              </div>
              <div className='my-[20px] w-[100%] borber-b-[1px]'>
                  <p className='border-b-[1px] py-[15px] text-[17px] w-max flex m-auto items-center gap-[5px] border-white'>
                    <svg className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12">
                        <path d="M3.915 5.31q.337-.407.713-.779m-3.121 7.855Q1.5 12.194 1.5 12a10.505 10.505 0 0 1 .516-3.265m3.243 11.338a10.55 10.55 0 0 1-2.89-3.864m14.482 5.108a10.547 10.547 0 0 1-8.163.65M12.002 1.5a10.504 10.504 0 0 1 7.925 17.39" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    {t("Stories")}
                  </p>
              </div>
              <span className='text-[gray] text-[13px]'>{t("stories2")}</span>
              <div>
                {stories&&stories.map((el:any)=><div key={el.id}  className='md:w-[26%] w-[45%] md:hover:w-[26.5%] md:hover:h-[505px] hover:cursor-pointer md:h-[500px] h-[200px] border-2 flex items-center'>
                    <img src={`https://instagram-api.softclub.tj/images/${el.fileName}`} alt="" />
                </div>)}
              </div>
        </div>
  )
}

export default page
