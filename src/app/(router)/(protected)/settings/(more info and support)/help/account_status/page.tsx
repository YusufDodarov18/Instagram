"use client"
import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import profile from '../../../../profile/profil-removebg-preview.png'
import { API } from "@/shared/utils/config";
import { useProfile } from "@/app/store/pages/profile/myProfile/profile";

const page = () => {
    const {myProfile,getMyProfile}=useProfile()

    useEffect(()=>{
        getMyProfile()
    },[getMyProfile])
    const {t}=useTranslation()

    return (
        <div className="flex flex-col gap-5 pt-18 px-3 pb-2 ">
            <h1 className="font-bold text-2xl text-[#0C1014]">{t("setting.account_status")}</h1>
            
            <div className="h-[130px] pl-[30px] rounded-2xl bg-[#F3F5F7] dark:bg-[#25292E] flex items-center gap-2 justify-start">
                <div className="flex gap-2 items-center">
                   <img src={myProfile?.image?`${API}/images/${myProfile.image}`:profile.src} className="w-[55px] h-[55px] rounded-[50%]" alt="profile" />
                   <div>
                      <h2 className="font-bold">{myProfile?.userName}</h2>
                      <h3 className="text-gray-500">{myProfile?.firstName+" "+myProfile?.lastName}</h3>
                   </div>
                </div>
            </div>
            <p>
                {t("view_all_actions_taken")} 
                <Link className="text-[#708DFF] hover:underline ml-2" href={`https://help.instagram.com/539126347315373`}>{t("learn_more_about_account_status")}</Link>
            </p>
            
            <div className="flex flex-col gap-6 py-4">
                <Link href={`/help/account_status/removed_content`} className="flex justify-between px-3">
                    <div className="flex gap-3">
                      <svg aria-label="Значок фото." className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <title>Значок фото.</title>
                        <path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fill-rule="evenodd"></path><path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                        <path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                      <h4>{t("removed_content_and_message_issues")}</h4>
                    </div>
                    <div className="flex gap-1.5">
                      <svg aria-label="Значок галочки с заливкой" className="x1lliihq x1n2onr6 x127hrn9" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16" style={{color:"#32eb28"}}>
                        <title>Значок галочки с заливкой</title>
                        <path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5.706 9.21-6.5 6.495a1 1 0 0 1-1.414-.001l-3.5-3.503a1 1 0 1 1 1.414-1.414l2.794 2.796L16.293 8.3a1 1 0 0 1 1.414 1.415Z"></path>
                      </svg>
                      <svg aria-label="Стрелка вправо" className="x1lliihq x1n2onr6 x1cp0k07" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16" style={{transform:"rotate(90deg)"}}>
                        <title>Стрелка вправо</title>
                        <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                      </svg>
                    </div>
                </Link>
                <Link href={`/help/account_status/feature_limits`} className="flex justify-between px-3">
                    <div className="flex gap-3">
                     <svg aria-label="Значок комментария." className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <title>Значок комментария.</title>
                        <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                     </svg>
                       <h4>{t("features_you_cannot_use")}</h4>
                    </div>
                    <div className="flex gap-1.5">
                      <svg aria-label="Значок галочки с заливкой" className="x1lliihq x1n2onr6 x127hrn9" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16" style={{color:"#32eb28"}}>
                        <title>Значок галочки с заливкой</title>
                        <path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5.706 9.21-6.5 6.495a1 1 0 0 1-1.414-.001l-3.5-3.503a1 1 0 1 1 1.414-1.414l2.794 2.796L16.293 8.3a1 1 0 0 1 1.414 1.415Z"></path>
                      </svg>
                      <svg aria-label="Стрелка вправо" className="x1lliihq x1n2onr6 x1cp0k07" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16" style={{transform:"rotate(90deg)"}}>
                        <title>Стрелка вправо</title>
                        <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                      </svg>
                    </div>
                </Link>
             </div>
        </div>
    );
}

export default page;
