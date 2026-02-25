"use client";
import React, { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import Profile from "../../../app/provider/images/profil-removebg-preview.png";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";
import {
  compas,
  compasActive,
  homeIcon,
  homeIconActive,
  instagramMiniLogo,
  like,
  likeActive,
  message,
  messageActive,
  searchIconActive,
  setting,
  threads,
  video,
  videoActive,
} from "@/app/provider/svg/svg";
import { jwtDecode } from "jwt-decode";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { JwtPayload } from "@/app/(router)/types";
import CreatePostModal from "@/app/(router)/(protected)/create/post/create";
import { useDrawerStore } from "@/app/store/search/search";
import { useDrawerNotification } from "@/app/store/notification/notification";
import MenuComp from "@/entities/menuConfig/menu";
import { useProfile } from "@/app/store/profile/myProfile/profile";
import { API } from "@/shared/utils/config";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "0 0 6px rgba(0,0,0,.15)",
    fontSize: 12,
  },
}));

const miniItem =
  "w-[40px] h-[40px] mx-auto flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800";

const MiniSideBar = ({ children }: { children: React.ReactNode }) => {
  const { toggleDrawer } = useDrawerStore();
  const { toggleDrawerNotification, notificationDrawer } =
    useDrawerNotification();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [decode, setDecode] = useState<JwtPayload | null>(null);
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorElMenu);
  const { getMyProfile, myProfile } = useProfile();

  const handleMenuClick = (event: MouseEvent<HTMLElement>) =>
    setAnchorElMenu(event.currentTarget);
  const handleMenuClose = () => setAnchorElMenu(null);

  const renderIcon = (
    path: string,
    activeIcon: React.ReactNode,
    inactiveIcon: React.ReactNode,
  ) => (pathname === path ? activeIcon : inactiveIcon);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        setDecode(jwtDecode(token));
      } catch (err) {}
    }
  }, []);

  return (
    <div className="flex">
      <section className="w-[60px] h-screen border-r border-gray-200 fixed">
        <div className="h-full flex flex-col justify-between py-4">
          <div className="mb-4 ml-4">
            <Link href={`/`}>{instagramMiniLogo}</Link>
          </div>

          <div className="flex flex-col gap-4 items-center">
            {/* HOME */}
            <LightTooltip title={t("layout.home")} placement="right">
              <Link href="/" className={miniItem}>
                {renderIcon("/", homeIcon, homeIconActive)}
              </Link>
            </LightTooltip>

            {/* SEARCH */}
            <LightTooltip title={t("layout.search")} placement="right">
              <div onClick={toggleDrawer} className={miniItem}>
                {searchIconActive}
              </div>
            </LightTooltip>

            {/* EXPLORE */}
            <LightTooltip title={t("layout.explore")} placement="right">
              <Link href="/explore" className={miniItem}>
                {renderIcon("/explore", compas, compasActive)}
              </Link>
            </LightTooltip>

            {/* REELS */}
            <LightTooltip title={t("layout.reels")} placement="right">
              <Link href="/reels" className={miniItem}>
                {renderIcon("/reels", video, videoActive)}
              </Link>
            </LightTooltip>

            {/* CHATS */}
            <LightTooltip title={t("layout.message")} placement="right">
              <Link href="/chats" className={miniItem}>
                {renderIcon("/chats", message, messageActive)}
              </Link>
            </LightTooltip>

            {/* NOTIFICATION */}
            <LightTooltip title={t("layout.notification")} placement="right">
              <div onClick={toggleDrawerNotification} className={miniItem}>
                {notificationDrawer ? like : likeActive}
              </div>
            </LightTooltip>

            {/* CREATE */}
            <LightTooltip title={t("layout.create")} placement="right">
              <div onClick={() => setOpen(true)} className={miniItem}>
                <AddBoxOutlinedIcon />
              </div>
            </LightTooltip>

            <CreatePostModal open={open} onClose={() => setOpen(false)} />

            <LightTooltip title={t("layout.profile")} placement="right">
              <Link
                href="/profile"
              >
                <img
                  src={
                    myProfile?.image
                      ? `${API}/images/${myProfile.image}`
                      : Profile.src
                  }
                  alt="profile"
                  className={`w-7 h-7 rounded-full ${pathname === "/profile" ? "border-2 border-black" : ""}`}
                />
              </Link>
            </LightTooltip>
          </div>

          {/* MORE */}
          <div className="flex flex-col gap-4 items-center">
            <LightTooltip title={t("layout.threads")} placement="right">
              <Link href="https://www.threads.com/" className={miniItem}>
                {threads}
              </Link>
            </LightTooltip>
            <LightTooltip title={t("layout.more")} placement="right">
              <div className={miniItem} onClick={handleMenuClick}>
                {setting}
              </div>
            </LightTooltip>
            <MenuComp
              anchorEl={anchorElMenu}
              open={openMenu}
              onClose={handleMenuClose}
            />
          </div>
        </div>
      </section>

      <div className="ml-[60px] w-full">{children}</div>
    </div>
  );
};

export default MiniSideBar;
