"use client";
import React, { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Profile from "../../../app/provider/images/profil-removebg-preview.png";
import { usePathname } from "next/navigation";
import {
  homeIcon,
  homeIconActive,
  searchIconActive,
  compas,
  compasActive,
  video,
  videoActive,
  message,
  messageActive,
  likeActive,
  setting,
  threads,
  instagramSideBar,
} from "@/app/provider/svg/svg";
import { jwtDecode } from "jwt-decode";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CreatePostModal from "@/app/(router)/(protected)/create/post/create";
import MenuComp from "../../../entities/menuConfig/menu";
import { useDrawerNotification } from "@/app/store/notification/notification";
import { useDrawerStore } from "@/app/store/search/search";
import { JwtPayload, NavLinkProps } from "@/app/(router)/types";
import { useProfile } from "@/app/store/profile/myProfile/profile";
import { API } from "@/shared/utils/config";

const NavLink = ({ href, icon, activeIcon, label, isActive }: NavLinkProps) => (
  <Link
    href={href}
    className={`${sidebarItem} ${isActive(href) ? "font-bold" : "font-normal"}`}
  >
    {isActive(href) ? activeIcon : icon}
    <span>{label}</span>
  </Link>
);

const sidebarItem =
  "flex items-center gap-4 w-[90%] mx-auto h-[52px] px-4 rounded-md text-lg cursor-pointer hover:bg-gray-100 dark:hover:text-black";

export default function SideBar({ children }: { children: React.ReactNode }) {
  const { toggleDrawer } = useDrawerStore();
  const { toggleDrawerNotification } = useDrawerNotification();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [decode, setDecode] = useState<JwtPayload | null>(null);
  const { t } = useTranslation();
  const [open1, setOpen] = useState<boolean>(false);
  const { myProfile, getMyProfile } = useProfile();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        setDecode(jwtDecode(token));
      } catch (err) {}
    }
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <section className="w-[320px] h-screen fixed border-r-2 border-gray-300">
        <div className="h-full flex flex-col pb-5">
          <div className="pb-10 pt-[20px] ml-[20px] flex mt-[20px]">
            <Link href={`/`}>{instagramSideBar}</Link>
          </div>

          <div className="flex flex-col gap-1">
            <NavLink
              href="/"
              icon={homeIconActive}
              activeIcon={homeIcon}
              label={t("layout.home")}
              isActive={isActive}
            />
            <div onClick={toggleDrawer} className={sidebarItem}>
              {searchIconActive}
              <span>{t("layout.search")}</span>
            </div>

            <NavLink
              href="/explore"
              icon={compasActive}
              activeIcon={compas}
              label={t("layout.explore")}
              isActive={isActive}
            />

            <NavLink
              href="/reels"
              icon={videoActive}
              activeIcon={video}
              label={t("layout.reels")}
              isActive={isActive}
            />

            <NavLink
              href="/chats"
              icon={messageActive}
              activeIcon={message}
              label={t("layout.message")}
              isActive={isActive}
            />
            <div onClick={toggleDrawerNotification} className={sidebarItem}>
              {likeActive}
              <span>{t("layout.notification")}</span>
            </div>

            <div
              onClick={() => setOpen(true)}
              className="flex items-center gap-4 w-[90%] m-auto rounded-md h-[52px] px-4 hover:bg-gray-100 cursor-pointer dark:hover:text-black"
            >
              <AddBoxOutlinedIcon fontSize="medium" />
              <p className="text-lg">{t("layout.create")}</p>
            </div>
            <CreatePostModal open={open1} onClose={() => setOpen(false)} />

            <NavLink
              href="/profile"
              icon={
                <img
                  src={
                    myProfile?.image ?
                      `${API}/images/${myProfile.image}`
                    : Profile.src
                  }
                  className="w-6 h-6 rounded-full"
                  alt="Profile"
                />
              }
              activeIcon={
                <img
                  src={
                    myProfile?.image ?
                      `${API}/images/${myProfile.image}`
                    : Profile.src
                  }
                  className="w-6 h-6 rounded-full border-2 border-black"
                  alt="Profile"
                />
              }
              label={t("layout.profile")}
              isActive={isActive}
            />
          </div>

          {/* BOTTOM MENU */}
          <div className="mt-auto flex flex-col gap-1">
            <Link href="https://www.threads.com/" className={sidebarItem}>
              {threads}
              <span>{t("layout.threads")}</span>
            </Link>

            <div className={sidebarItem} >
              <button onClick={handleClick} className="flex gap-5 items-center">
                {setting}
                <span>{t("layout.more")}</span>
              </button>
              <MenuComp anchorEl={anchorEl} open={open} onClose={handleClose} />
            </div>
          </div>
        </div>
      </section>

      {/* <div style={{ marginLeft: (pathname != '/login' && pathname !== '/registration') ? '370px' : '0px' }} className=''>
        {children}
      </div> */}

      <div
        style={{
          marginLeft:
            pathname != "/login" && pathname !== "/registration"
              ? "370px"
              : "0px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
