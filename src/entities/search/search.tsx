"use client";

import { useDrawerStore } from "@/app/store/provider/search/search";
import { Box, Divider, Drawer, Skeleton } from "@mui/material";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { t } from "i18next";
import Image from "next/image";
import { API } from "@/shared/utils/config";
import ClearIcon from "@mui/icons-material/Clear";
import avatar from "../../app/provider/images/ava.jpeg";
import CloseIcon from "@mui/icons-material/Close";
import { DecodedToken } from "@/app/(router)/types";
import { jwtDecode } from "jwt-decode";

function Search() {
  const {
    isOpen,
    clearSearchHistory,
    closeDrawer,
    datas,
    deleteSearchHistory,
    getSearchHistory,
    history,
    loading,
    postSearchHistory,
    searchUser,
    toggleDrawer,
  } = useDrawerStore();
  const [search, setSearch] = useState("");
  const [decode, setDecode] = useState<null | DecodedToken>(null);
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setDecode(decoded);
    }
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    searchUser(value);
  };

  const handleClick = (id: string) => {
    if (String(id) === String(decode?.sid)) {
      router.push(`/profile`);
    } else {
      router.push(`/profile/${id}`);
    }
    postSearchHistory(id);
    closeDrawer();
    setSearch("");
  };

  useEffect(() => {
    if (isOpen) {
      getSearchHistory();
    }
  }, [isOpen]);

  const DrawerList = (
    <Box
      sx={{
        width: 420,
        backgroundColor: resolvedTheme == "dark" ? "#121212" : "white",
        color: resolvedTheme == "dark" ? "white" : "black",
      }}
      role="presentation"
    >
      <Box className="px-4">
        <Box className="flex justify-between items-center px-2">
          <h1 className="text-[25px] mb-8 mt-5">{t("search1")}</h1>
          <Box onClick={closeDrawer}>
            <CloseIcon className="cursor-pointer" />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            px: "14px",
            py: "8px",
            borderRadius: "999px",
            backgroundColor: resolvedTheme === "dark" ? "#262626" : "#EFEFEF",
          }}
        >
          <SearchIcon
            sx={{
              color: resolvedTheme === "dark" ? "#8e8e8e" : "#737373",
              fontSize: 25,
            }}
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e);
            }}
            type="search"
            placeholder={t("search1")}
            className="w-full bg-transparent outline-none border-none text-[20px]"
            style={{
              color: resolvedTheme === "dark" ? "white" : "black",
            }}
          />
        </Box>
      </Box>
      <Divider sx={{ margin: "25px 0px" }} />
      <Box className="px-4">
        <Box className="flex justify-between">
          <h2 className="text-[17px] mb-5">{t("Recent")}</h2>
          {history.length > 0 ? (
            <div
              className="duration-200 text-[#85A1FF] cursor-pointer hover:underline"
              onClick={clearSearchHistory}
            >
              {t("clear")}
            </div>
          ) : null}
        </Box>
        <Box
          className="flex flex-col gap-5"
          style={{
            backgroundColor: resolvedTheme == "dark" ? "#121212" : "white",
          }}
        >
          {loading ? (
            <div className="flex items-center gap-5">
              <Skeleton variant="circular" width={60} height={60} />
              <div className="flex flex-col gap-2">
                <Skeleton variant="text" width={120} height={24} />
                <Skeleton variant="text" width={200} height={20} />
              </div>
            </div>
          ) : search !== "" && datas.length === 0 ? (
            <p className="text-[#737373] m-auto mt-[200px] mb-[242px] text-center">
              {t("No recent searches.")}
            </p>
          ) : search !== "" ? (
            datas.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-5 cursor-pointer"
                onClick={() => handleClick(user.id)}
              >
                <Image
                  src={user.avatar ? `${API}/images/${user.avatar}` : avatar}
                  alt="avatar"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h2>{user.userName}</h2>
                  <h3 className="text-[#9E9E9E]">
                    {user.fullName} · {t("Subscribers")} {user.subscribersCount}
                  </h3>
                </div>
              </div>
            ))
          ) : history.length === 0 ? (
            <p className="text-[#737373] text-center mt-[200px]">
              {t("No recent searches.")}
            </p>
          ) : (
            history.map((el) => (
              <div key={el.id} className="flex items-center justify-between">
                <div
                  className="flex items-center gap-6 cursor-pointer"
                  onClick={() => {
                    if (String(el.users.id) === String(decode?.sid)) {
                      router.push("/profile");
                    } else {
                      router.push(`/profile/${el.users.id}`);
                    }
                    closeDrawer();
                  }}
                >
                  <Image
                    src={
                      el.users.avatar
                        ? `${API}/images/${el.users.avatar}`
                        : avatar
                    }
                    alt="avatar"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h2>{el.users.userName}</h2>
                    <h3 className="text-[#9E9E9E]">
                      {el.users.fullName} · {t("Subscribers")}{" "}
                      {el.users.subscribersCount}
                    </h3>
                  </div>
                </div>
                <ClearIcon
                  className="cursor-pointer"
                  onClick={() => deleteSearchHistory(el.id.toString())}
                />
              </div>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      anchor="left"
      PaperProps={{
        sx: {
          left: "43px",
          width: "420px",
          top: 0,
          height: "100vh",
          position: "fixed",
          boxShadow: 3,
          bgcolor: resolvedTheme == "dark" ? "#121212" : "white",
        },
      }}
      ModalProps={{
        keepMounted: true,
        BackdropProps: {
          sx: {
            backgroundColor: "transparent",
          },
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
}

export default Search;
