"use client";
import Profile from "../../../app/(router)/(protected)/profile/profil-removebg-preview.png";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import CreatePostModal from "@/app/(router)/(protected)/create/post/create";
import { API } from "@/shared/utils/config";
import {
  add,
  compas,
  compasActive,
  homeIcon,
  homeIconActive,
  instagramText,
  likeActive,
  message,
  messageActive,
  searchIcon,
  searchIconActive,
  setting,
  threads,
  video,
  videoActive,
} from "@/app/provider/svg/svg";
import { useProfile } from "@/app/store/profile/myProfile/profile";
import { JwtPayload } from "@/app/(router)/types";

export default function BottomNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const iconClass =
    "flex items-center gap-4 rounded-[8px] h-[52px] px-0 m-[0] justify-center dark:text-black";

  const icons = {
    "/": { active: homeIcon, inactive: homeIconActive },
    "/explore": { active: compas, inactive: compasActive },
    "/reels": { active: video, inactive: videoActive },
    "/chats": { active: message, inactive: messageActive },
    "/profile": { active: Profile, inactive: Profile },
    "/search": { active: searchIcon, inActive: searchIconActive },
  };
  const [open1, setOpen] = useState(false);
  const [decode, setDecode] = useState<JwtPayload | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        setDecode(jwtDecode(token));
      } catch (err) {}
    }
  }, []);

  const { resolvedTheme } = useTheme();

  const { myProfile, getMyProfile } = useProfile();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  const pathName = usePathname();
  return (
    <>
      {pathName !== "/explore" &&
        pathName !== "/reels" && (
          <div
            className={`flex pt-5 pb-3 z-100 fixed top-0 left-0 right-0 ${resolvedTheme == "dark" ? "bg-black" : "bg-white"} justify-between px-3`}
          >
            <>
              <div onClick={() => setOpen(true)}>{add}</div>
              {pathName !== "/profile" ? (
                <div className="text-lg">{instagramText}</div>
              ) : (
                <div className="font-bold text-[18px]">
                  {myProfile?.userName}
                </div>
              )}
              {pathName !== "/profile" ? (
                <div className="cursor-pointer">{likeActive}</div>
              ) : (
                <div className="flex gap-2">
                  <Link href={`https://www.threads.com`}>{threads}</Link>
                  <Link href={`/settings`}>{setting}</Link>
                </div>
              )}
            </>
          </div>
        )}
      <div className={`${pathName == "/" ? "pt-13" : ""}`}>{children}</div>
      <section
        className={`fixed w-[100%] z-[10] bottom-0 ${pathName==="/chats"?"":""}`}
        style={{ color: resolvedTheme == "dark" ? "white" : "black" }}
      >
        <div
          className={`flex gap-[0.5rem] mt-4 align-bottom bg-white justify-evenly`}
        >
          {/* Home */}
          <Link className="block" href="/">
            <div className={iconClass}>
              {pathname === "/" ? icons["/"].active : icons["/"].inactive}
            </div>
          </Link>

          {/* Reels */}
          <Link href="/reels">
            <div className={iconClass}>
              {pathname === "/reels"
                ? icons["/reels"].active
                : icons["/reels"].inactive}
            </div>
          </Link>

          {/* Create Button */}
          <CreatePostModal open={open1} onClose={() => setOpen(false)} />

          {/* Chats */}
          <Link href="/chats">
            <div className={iconClass}>
              {pathname === "/chats"
                ? icons["/chats"].active
                : icons["/chats"].inactive}
            </div>
          </Link>

          <Link href="/explore">
            <div className={iconClass}>
              {pathname === "/chats"
                ? icons["/search"].active
                : icons["/search"].inActive}
            </div>
          </Link>

          {/* Profile */}
          <Link href="/profile">
            <div className={iconClass}>
              <Image
                className={`w-[25px] h-[25px] rounded-full ${pathname === "/profile" ? "border-2 border-black" : ""}`}
                src={
                  myProfile?.image
                    ? `${API}/images/${myProfile?.image}`
                    : Profile
                }
                alt="Profile"
                width={25}
                height={25}
              />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
