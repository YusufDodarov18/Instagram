"use client";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import InitialLoading from "@/entities/initialLoading/initialLoading";
import MiniSideBar from "@/components/layout/mini-side-bar/mini-side-bar";
import SideBar from "@/components/layout/side-bar/side-bar";
import Search from "../../../entities/search/search";
import { useDrawerStore } from "@/app/store/search/search";
import { useDrawerNotification } from "@/app/store/notification/notification";
import Notification from "../../../entities/notification/notification";
import BottomNavigation from "@/components/layout/bottom-navigation/bottom-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useDrawerStore();
  const { notificationDrawer } = useDrawerNotification();
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const barType = useMemo(() => {
    if (windowWidth <= 767) return "bottom";
    if (
      windowWidth <= 1279 ||
      isOpen == true ||
      pathname.includes("chat") ||
      notificationDrawer == true||
      pathname.includes("settings")
    )
      return "minibar";
    return "bar";
  }, [windowWidth, pathname, isOpen, notificationDrawer]);

  const wrapWithBar = (children: React.ReactNode) => {
    switch (barType) {
      case "bottom":
        return <BottomNavigation>{children}</BottomNavigation>;
      case "minibar":
        return <MiniSideBar>{children}</MiniSideBar>;
      default:
        return <SideBar>{children}</SideBar>;
    }
  };

  return (
    <>
      {loading ? (
        <InitialLoading />
      ) : (
        <Fragment>
          <Notification />
          <Search />
          {wrapWithBar(children)}
        </Fragment>
      )}
    </>
  );
}
