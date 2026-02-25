'use client'


import Image from "next/image";
import profile from "../../../provider/images/instagramDefaultProfile-removebg-preview.png";
import { camera, setting2 } from "@/app/provider/svg/svg";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useProfile } from "@/app/store/profile/myProfile/profile";
import ProfileSkeleton from "@/entities/profile/loading/loading";
import BasicTabs from "@/entities/profile/tabs/tabs";
import Menu from "@/entities/profile/menu/menu";
import Followers from "@/entities/profile/followers/followers";
import Following from "@/entities/profile/following/following";
import { DecodedToken } from "../../types";

const page = () => {
  const { getMyProfile, loading, myProfile,updateImageProfile, getMyFollowers, getMyFollowing } =useProfile();
  const [decode, setDecode]=useState<null|DecodedToken>(null);
  const [openMenu, setOpenMenu]=useState<boolean>(false);
  const [openFollowers, setOpenFollowers]=useState<boolean>(false);
  const [openFollowing, setOpenFollowing]=useState<boolean>(false);
  const { resolvedTheme } = useTheme();
  const router=useRouter();
  const { t }=useTranslation();
  const fileRef=useRef<HTMLInputElement|null>(null)
  const [file,setFile]=useState<File|null>(null)

  const handleClickOpen = () => setOpenMenu(true)

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const decoded = jwtDecode<DecodedToken>(token);
    setDecode(decoded);
    getMyProfile();
  }, []);

   const showFollowers = async() => {
     if (!decode) return;
    getMyFollowers(decode.sid);
    await getMyFollowing(decode.sid);
    setOpenFollowers(true);
  };

  const showFollowing = () => {
    if (!decode) return;
    getMyFollowing(decode?.sid);
    setOpenFollowing(true);
  };

  if (loading){
    return <ProfileSkeleton />;
  }
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="w-full max-w-[650px] p-6 flex flex-col gap-5">
          <div className="flex gap-3 md:gap-8 items-center md:items-start">
            <div onClick={()=>fileRef.current?.click()} className="relative cursor-pointer flex items-center md:items-start w-[56px] h-[70px] sm:w-36 sm:h-36 flex-shrink-0">
              <Image
                src={
                  myProfile?.image
                    ? `http://37.27.29.18:8003/images/${myProfile.image}`
                    : profile
                } alt="profile" fill
                className="rounded-full object-cover"
              />
              <input 
                type="file"
                ref={fileRef}
                accept="image/*"
                className="hidden" 
                onChange={(e)=>{
                  const file=e.target.files?.[0]
                  if(file){
                    updateImageProfile(file)
                  }
                }} />
              <div className={`absolute hidden md:block inset-0 rounded-full ${!myProfile?.image&&`bg-black/32`}`} />
              {!myProfile?.image&&<div className="absolute w-11 h-11 hidden md:block text-white inset-0 m-auto">{camera}</div>}
            </div>
            <div className="flex-1">
              <div className="hidden sm:flex gap-4 items-center">
                <h2 className="text-3xl font-semibold cursor-pointer">{myProfile?.userName}</h2>
                <div className="cursor-pointer" onClick={handleClickOpen}>{setting2}</div>
              </div>
              <p className="text-lg mt-3">{myProfile?.firstName + " " + myProfile?.lastName}</p>
              <div className="flex gap-3 md:gap-8 mt-2 text-[12px] sm:text-sm">
                <div className="cursor-pointer flex gap-1">
                  <span className="font-semibold">{myProfile?.postCount}</span>
                  {t("posts")}
                </div>
                <div className="cursor-pointer flex gap-1" onClick={showFollowers}>
                  <span className="font-semibold">{myProfile?.subscribersCount}</span>
                  {t("followers")}
                </div>
                <div className="cursor-pointer flex gap-1" onClick={showFollowing}>
                  <span className="font-semibold">{myProfile?.subscriptionsCount}</span>
                  {t("following")}
                </div>
              </div>
              <p className="mt-2 hidden sm:block text-sm leading-relaxed max-w-sm">{myProfile?.about ? myProfile.about : ""}</p>
            </div>
          </div>
          <p className="block sm:hidden text-sm leading-relaxed max-w-sm">{myProfile?.about ? myProfile.about : ""}</p>
          <div className="flex gap-4 w-full">
            <Button variant={"ghost"} className={`flex-1 h-9 cursor-pointer text-[12px] md:text-sm font-semibold  ${resolvedTheme === "dark" ? "bg-[#25292E] text-white" : "bg-[#F0F2F5] text-[black]"} `}>
              {t("Edit Profile")}
            </Button>
            <Button variant={"ghost"}
              className={`flex-1 h-9 text-[12px] md:text-sm cursor-pointer font-semibold ${resolvedTheme === "dark" ? "bg-[#25292E] text-white" : "bg-[#F0F2F5] text-[black]"}`}
              onClick={() => router.push(`/archive?id=${decode?.sid}`)}
            >
              {t("viewArchive")}
            </Button>
          </div>
        </div>
          <div className="w-full max-w-[650px] p-6 flex flex-col gap-5">
                 <div className="border-[1px] cursor-pointer border-[grey] md:h-[87px] h-[50px] md:w-[87px] w-[50px] rounded-[150px] p-[3px]">
                     <div className="dark:bg-[#1e1e1e] bg-[lightgrey] md:h-[80px] h-[42px] md:w-[80px] w-[42px] rounded-[150px] flex justify-center items-center">
                         <svg aria-label="Значок Плюс" className="x1lliihq x1n2onr6 text-[grey] md:w-[44px] w-[20px] md:h-[44px] h-[20px] x10xgr34" fill="currentColor" height="44" role="img" viewBox="0 0 24 24" width="44">
                             <path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path>
                         </svg>
                     </div>
                     <p className="md:text-[14px] text-[12px] text-center my-[14px]">{t("new")}</p>
                 </div>
          </div>
           <div className="w-full max-w-[650px] mt-10">
              <BasicTabs />
          </div>
    </div>
    <Menu open={openMenu} onClose={() => setOpenMenu(false)} />
    <Followers open={openFollowers} onClose={() => setOpenFollowers(false)} />
    <Following open={openFollowing} onClose={() => setOpenFollowing(false)} />
    </>
  );
};

export default page;
