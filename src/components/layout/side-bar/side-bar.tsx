"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Profile from "../../../app/(router)/(protected)/profile/profil-removebg-preview.png";
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
} from "@/app/widget/icons/svg";
import { jwtDecode } from "jwt-decode";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CreatePostModal from "@/app/(router)/(protected)/create/createPost";
import { JwtPayload, NavLinkProps } from "@/app/(router)/types";
import { API } from "@/shared/utils/config";
import SettingModal from "@/entities/setting/settingModal";
import { useDrawerStore } from "@/app/store/search/search";
import { useDrawerNotification } from "@/app/store/notification/notification";
import { useProfile } from "@/app/store/pages/profile/myProfile/profile";

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
  "flex items-center gap-4 w-[90%] mx-auto h-[52px] px-4 rounded-md text-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2a2929] dark:hover:text-white";

export default function SideBar({ children }: { children: React.ReactNode }) {
  const { toggleDrawer } = useDrawerStore();
  const { toggleDrawerNotification } = useDrawerNotification();
  const pathname = usePathname();
  const [settingModal, setOpenSettingModal] = useState(false);
  const [decode, setDecode] = useState<JwtPayload | null>(null);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { myProfile, getMyProfile } = useProfile();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  const handleClose = () => setOpenSettingModal(false);

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
      <section className="w-[320px] h-screen fixed border-r-2 dark:bg-[#1c1b1b] border-gray-300">
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
              className="flex items-center gap-4 w-[90%] m-auto rounded-md h-[52px] px-4 hover:bg-gray-100 cursor-pointer dark:hover:bg-[#2a2929] dark:hover:text-white dark:hover:text-black"
            >
              <AddBoxOutlinedIcon fontSize="medium" />
              <p className="text-lg">{t("layout.create")}</p>
            </div>
            <CreatePostModal open={open} onClose={() => setOpen(false)} />

            <NavLink
              href="/profile"
              icon={
                <img
                  src={
                    myProfile?.image
                      ? `${API}/images/${myProfile.image}`
                      : Profile.src
                  }
                  className="w-6 h-6 rounded-full"
                  alt="Profile"
                />
              }
              activeIcon={
                <img
                  src={
                    myProfile?.image
                      ? `${API}/images/${myProfile.image}`
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

            <div className={sidebarItem}>
              <button
                onClick={() => setOpenSettingModal(true)}
                className="flex gap-5 items-center"
              >
                {setting}
                <span>{t("layout.more")}</span>
              </button>
              <SettingModal
                onClose={handleClose}
                open={settingModal}
                left={30}
              />
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
