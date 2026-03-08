import { useProfile } from '@/app/store/profile/myProfile/profile'
import { useUser } from '@/app/store/home/users/users'
import React, { useEffect, useState } from 'react'
import MenuRecomendation from './menu'
import { API } from '@/shared/utils/config'
import profile from '../../../app/(router)/(protected)/profile/profil-removebg-preview.png'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import RecommendationSkeleton from './recommendation-skeleton/skeleton'
import getToken from '@/api/token'

export const Recommendation = () => {
    const {myProfile,loading}=useProfile()
    const {getUsers,users,addFollowing,subscribers,unFollowing,getSubscribers}=useUser()
    const [openModal,setOpenModal]=useState(false)
    const [isLoading,setIsloading]=useState(false)
    const {t}=useTranslation()
    const myId=getToken()?.sid
    
    useEffect(()=> {
        async function getData(){
             if(!myId) return
             setIsloading(true)
             await getUsers().then(() => getSubscribers(myId)).finally(() => setIsloading(false))
             setIsloading(false)
         }
         getData()
    },[getUsers,myId])

    const isFollowing=(id:string)=>subscribers.some(user=>user.userShortInfo.userId==id)
    
    const handleFollow = async (id: string) => {
        if(!myId) return
        if(isFollowing(id)){    
            await unFollowing(id)
            await getSubscribers(myId);
        }else{
            await addFollowing(id)
            await getSubscribers(myId);
        }
    }
    return (
        <>
            <div className='flex flex-col gap-6'>
                  {loading?(
                    <RecommendationSkeleton/>
                  ):
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-[8px] items-center'>
                                <Link href={`/profile`}>
                                    <img 
                                       className='rounded-[50%] w-[40px] h-[40px] object-cover' 
                                       src={myProfile?.image?
                                        `${API}/images/${myProfile.image}`
                                        :profile.src} 
                                       alt="profile" 
                                    />
                                </Link>
                                <div className='flex flex-col'>
                                    <Link href={`/profile`}>
                                         <h5 className='font-bold text-black dark:text-white'>{myProfile?.userName}</h5>
                                    </Link>
                                    <h6>{myProfile?.firstName+" "+myProfile?.lastName}</h6>
                                </div>
                            </div>
                            <p className='text-[#285aff] font-bold hover:underline cursor-pointer' onClick={()=>setOpenModal(true)}>{t("Switch")}</p>
                        </div>
                }
                 <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <h6>{t("Suggested for you")}</h6>
                        <p className='hover:underline cursor-pointer'>{t("See All")}</p>
                    </div>
                    {
                        users.length===0||isLoading?(
                            Array.from({length:5}).map((_,i)=>(
                                <RecommendationSkeleton key={i}/>
                            ))
                        ):
                    users.slice(3,8).map(user=>(
                         <div className='flex justify-between items-center'>
                            <div className='flex gap-[8px] items-center'>
                                <Link href={`/profile/${user.id}`}>
                                    <img 
                                       className='rounded-[50%] w-[40px] h-[40px] object-cover' 
                                       src={user?.avatar?`${API}/images/${user.avatar}`:profile.src} 
                                       alt="profile" 
                                    />
                                </Link>
                                <div className='flex flex-col'>
                                    <Link href={`/profile/${user.id}`}>
                                         <h5 className='font-bold text-black dark:text-white'>{user.userName}</h5>
                                    </Link>
                                    <h6>{user.fullName}</h6>
                                </div>
                            </div>
                            <p className='text-[#285aff] dark:text-[#287eff] font-bold hover:underline cursor-pointer' onClick={()=>handleFollow(user.id)}>
                                {isFollowing(user.id) ? t("unFollow") : t("Follow")}
                            </p>
                        </div>
                    ))}
                 </div>
            </div>
                <div className="mt-2 pt-4 text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-[7px]">
                        <Link className='hover:underline' href={`https://about.instagram.com/`}><p>{t("other.information")}</p></Link>
                        <Link className='hover:underline' href={`https://help.instagram.com/`}><p>{t("other.help")}</p></Link>
                        <Link className='hover:underline' href={`https://developers.facebook.com/docs/instagram`}><p>{t("other.api")}</p></Link>
                        <Link className='hover:underline' href={`https://www.instagram.com/about/jobs/`}><p>{t("other.vacancy")}</p></Link>
                        <Link className='hover:underline' href={`https://business.facebook.com/business/loginpage/new/?login_options[0]=FB&login_options[1]=IG&login_options[2]=SSO&config_ref=biz_login_tool_flavor_mbs&create_business_portfolio_for_bm=1`}><p>{t("other.metaVerified")}</p></Link>
                        <Link className='hover:underline' href={`https://help.instagram.com/519522125107875`}><p>{t("other.confidentiality")}</p></Link>
                        <Link className='hover:underline' href={`https://help.instagram.com/581066165581870`}><p>{t("other.conditions")}</p></Link>
                        <Link className='hover:underline' href={`https://www.instagram.com/instagramlite/`}><p>{t("other.instagramLite")}</p></Link>
                 </div>
                 <h6 className='mt-3 text-md text-gray-400'>© {new Date().getFullYear()} Instagram from Meta</h6>
            <MenuRecomendation open={openModal} onClose={()=>setOpenModal(false)} userName={myProfile?.userName||""}/>
        </>
    )
}
