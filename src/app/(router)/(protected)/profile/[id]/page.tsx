"use client";
import Image from "next/image";
import profile from "../instagramDefaultProfile-removebg-preview.png";
import { menu3 } from "@/app/widget/icons/svg";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import BasicTabsById from "@/entities/profile/tabs-by-id/tab";
import { MenuById } from "@/entities/profile/menu/menu-by-id/menu";
import { DecodedToken, MyFollowing } from "@/app/(router)/types";
import { jwtDecode } from "jwt-decode";
import FollowingById from "@/entities/profile/following/following-by-id/following-by-id";
import FollowersById from "@/entities/profile/followers/followers-by-id/followers-by-id";
import { useRouter } from "next/navigation";
import { useProfileById } from "@/app/store/pages/profile/profile-by-id/profile-by-id";
import { useProfile } from "@/app/store/pages/profile/myProfile/profile";
import { useChats } from "@/app/store/pages/chats/chat";
import ProfileSkeleton from "@/entities/profile/profile-skeleton/skeleton";

export default function page({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribed, setSubscribed] = useState<MyFollowing[] | []>([]);
  const [decode, setDecode] = useState<null | DecodedToken>(null);
  const {
    getInfoById,
    info,
    loading,
    followers,
    getFollowingById,
    getFollowersById,
    getChat,
  } = useProfileById();
  const { unFollowing, addFollowing } = useProfile();
  const { createChat, getChatById, chatById } = useChats();
  const { id } = React.use(params);

  useEffect(() => {
    getInfoById(id);
    if (info) {
      setIsSubscribed(info?.isSubscriber ?? false);
    }
  }, [getInfoById]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);
        setDecode(decoded);
      }
    }
  }, []);
  let router = useRouter();

  useEffect(() => {
    if (!decode) return;
    if (String(decode.sid) === String(id)) {
      router.push("/profile");
    }
  }, [id, decode, router]);

  useEffect(() => {
    if (!decode) return;
    getFollowingById(decode.sid);
  }, [decode]);

  useEffect(() => {
    if (!decode || !followers) return;
    const isSubscribed =
      followers?.some((f) => f.userShortInfo.userId === decode.sid) || false;
    setIsSubscribed(isSubscribed);
  }, [decode, followers]);

  const handleClickOpenMenu = () => setOpenMenu(true);
  const handleClickClose = () => setOpenMenu(false);

  if (loading) {
    return <ProfileSkeleton />;
  }

  const showFollowers = async () => {
    await Promise.all([getFollowersById(id), getFollowingById(id)]);
    setOpenFollowers(true);
  };

  const showFollowing = async () => {
    await Promise.all([getFollowersById(id), getFollowingById(id)]);
    setOpenFollowing(true);
  };

  const toggleFollow = async () => {
    if (!decode) return;
    try {
      if (isSubscribed) {
        await unFollowing(id, decode?.sid);
      } else {
        await addFollowing(id, decode?.sid);
      }
      await getInfoById(id);
      setIsSubscribed(!isSubscribed);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="w-full max-w-[650px] p-6 flex flex-col gap-5">
          <div className="flex gap-3 md:gap-8 items-center md:items-start">
            <div className="relative cursor-pointer flex items-center md:items-start w-[56px] h-[70px] sm:w-36 sm:h-36 flex-shrink-0">
              <Image
                src={
                  info?.image
                    ? `http://37.27.29.18:8003/images/${info.image}`
                    : profile
                }
                alt="profile"
                fill
                className="rounded-full object-cover"
              />
              <div className="absolute hidden md:block inset-0 rounded-full" />
            </div>
            <div className="flex-1">
              <div className="hidden sm:flex gap-4 items-center">
                <h2 className="text-3xl font-semibold cursor-pointer">
                  {info?.userName}
                </h2>
                <div className="cursor-pointer" onClick={handleClickOpenMenu}>
                  {menu3}
                </div>
              </div>
              <p className="text-lg mt-3">
                {info?.firstName + " " + info?.lastName}
              </p>
              <div className="flex gap-3 md:gap-8 mt-2 text-[12px] sm:text-sm">
                <div className="cursor-pointer flex gap-1">
                  <span className="font-semibold">{info?.postCount}</span>
                  {t("posts")}
                </div>
                <div
                  className="cursor-pointer flex gap-1"
                  onClick={showFollowers}
                >
                  <span className="font-semibold">
                    {info?.subscribersCount}
                  </span>
                  {t("followers")}
                </div>
                <div
                  className="cursor-pointer flex gap-1"
                  onClick={showFollowing}
                >
                  <span className="font-semibold">
                    {info?.subscriptionsCount}
                  </span>
                  {t("following")}
                </div>
              </div>
              <p className="mt-2 hidden sm:block text-sm leading-relaxed max-w-sm">
                {info?.about ? info.about : ""}
              </p>
            </div>
          </div>
          <p className="block sm:hidden text-sm leading-relaxed max-w-sm">
            {info?.about ? info.about : ""}
          </p>
          <div className="flex gap-4 w-full">
            <Button
              onClick={toggleFollow}
              className={`flex-1 h-9 cursor-pointer text-[12px] ${info?.isSubscriber ? (theme === "dark" ? "bg-[#25292E] text-white" : "bg-[#F0F2F5] text-[black] hover:bg-[#F0F2F5]]") : `text-white bg-[#4A5dF9] hover:bg-[#324afa] hover:text-white`} md:text-sm font-semibold `}
            >
              {info?.isSubscriber ? t("unFollow") : t("Follow")}
            </Button>
            <Button
              onClick={async () => {
                const response = await createChat(id);
                if (response) {
                  router.push(`/chats/${response}`);
                }
              }}
              variant={"ghost"}
              className={`flex-1 h-9 text-[12px] md:text-sm cursor-pointer font-semibold ${theme === "dark" ? "bg-[#25292E] text-white" : "bg-[#F0F2F5] text-[black]"}`}
            >
              {t("Message")}
            </Button>
          </div>
        </div>
        <div className="w-full max-w-[650px] mt-10">
          <BasicTabsById />
        </div>
      </div>

      <MenuById
        info={info || null}
        openMenu={openMenu}
        onClose={handleClickClose}
      />
      <FollowersById
        open={openFollowers}
        onClose={() => setOpenFollowers(false)}
      />
      <FollowingById
        open={openFollowing}
        onClose={() => setOpenFollowing(false)}
      />
    </>
  );
}
