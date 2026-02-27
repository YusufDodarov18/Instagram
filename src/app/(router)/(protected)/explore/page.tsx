"use client";

import { useExplore } from "@/app/store/explore/explore";
import React, { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";
import { API } from "@/shared/utils/config";
import defaultProfile from "../profile/profil-removebg-preview.png";
import { Box } from "@mui/material";
import { post } from "../../types";
import { commentVideo, likeVideo } from "@/app/provider/svg/svg";
import ModalExplore from "./modal";
import { useTheme } from "next-themes";
import getToken from "@/api/token";
import { useRouter } from "next/navigation";

function page() {
  const {
    getPosts,
    posts,
    clearSearchHistory,
    closeDrawer,
    deleteSearchHistory,
    getSearchHistory,
    history,
    loading,
    searchUser,
    postSearchHistory,
    users,
  } = useExplore();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<post | null>(null);
  const [openSearchBox, setOpenSeacrhBox] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const myId = getToken()?.sid;
  const router = useRouter();

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    searchUser(e.target.value);
  }

  function handleClose() {
    setOpenSeacrhBox(false);
    setSearchText("");
  }

  useEffect(() => {
    if (openSearchBox) {
      getSearchHistory();
    }
  }, [openSearchBox]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      await getPosts();
      setIsLoading(false);
    };
    fetchPosts();
  }, [getPosts]);
  return (
    <>
      <div className="md:hidden pt-3 px-3 pb-2 mb-3 fixed top-0 left-0 right-0 z-20 shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="w-[100%] rounded-[5px] px-3 flex items-center border">
            <SearchIcon />
            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setOpenSeacrhBox(true);
                handleSearch(e);
              }}
              onFocus={() => setOpenSeacrhBox(true)}
              placeholder={t("search1")}
              className="w-[90%] text-[18px] border-0 outline-0 px-4 py-2 focus:border-none focus:outline-none"
              style={{
                backgroundColor: "transparent",
              }}
            />
          </div>
          <button
            onClick={handleClose}
            style={{
              display: openSearchBox ? "block" : "none",
            }}
          >
            {t("Cancel")}
          </button>
        </div>
        {openSearchBox && (
          <div
            className="flex flex-col gap-5 fixed top-[60px] left-0 right-0 z-10 px-3 py-5 shadow-lg rounded-lg h-[100vh]"
            style={{
              backgroundColor: resolvedTheme === "dark" ? "#121212" : "#fff",
            }}
          >
            <div className="flex justify-between">
              <h2 className="text-[17px] mb-5">{t("Recent")}</h2>
              <button
                onClick={clearSearchHistory}
                className="bg-transparent text-[17px] mb-5 text-[#0095F6] cursor-pointer"
              >
                {t("clear")}
              </button>
            </div>
            {loading ? (
              <div className="flex items-center gap-5">
                <Skeleton variant="circular" width={60} height={60} />
                <div className="flex flex-col gap-2">
                  <Skeleton variant="text" width={120} height={24} />
                  <Skeleton variant="text" width={200} height={20} />
                </div>
              </div>
            ) : searchText === "" && history.length === 0 ? (
              <p className="m-auto mt-[200px]">{t("No recent searches.")}</p>
            ) : searchText.trim() !== "" ? (
              users?.map((user) => (
                <div
                  className="flex items-center gap-5"
                  key={user.id}
                  onClick={() => {
                    postSearchHistory(user.id);
                    if (String(user.id) === String(myId)) {
                      router.push("/profile");
                    } else {
                      router.push(`/profile/${user.id}`);
                    }
                    closeDrawer();
                  }}
                >
                  <img
                    src={
                      user.avatar !== ""
                        ? `${API}/images/${user.avatar}`
                        : `${defaultProfile.src}`
                    }
                    alt="avatar"
                    width={70}
                    height={80}
                    className="rounded-[50%] w-[60px] h-[60px] cursor-pointer"
                  />
                  <div>
                    <h2 className="cursor-pointer">{user.userName}</h2>
                    <h3>
                      {user.fullName} . {t("Subscribers")}{" "}
                      {user.subscribersCount}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              history?.map((elem) => (
                <div
                  className="flex items-center justify-between"
                  key={elem.id}
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={
                        elem.users.avatar !== ""
                          ? `${API}/images/${elem.users.avatar}`
                          : defaultProfile.src
                      }
                      alt="avatar"
                      width={70}
                      height={80}
                      className="rounded-[50%] w-[60px] h-[60px]"
                    />
                    <div>
                      <h2>{elem.users.userName}</h2>
                      <h3>
                        {elem.users.fullName} . {t("Subscribers")}{" "}
                        {elem.users.subscribersCount}
                      </h3>
                    </div>
                  </div>
                  <ClearIcon
                    onClick={() => deleteSearchHistory(elem.id.toString())}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="w-[100%] max-w-[1000px] m-auto grid grid-cols-3 gap-[1px] mt-[65px] md:mt-5">
        {isLoading
          ? Array.from({ length: 15 }).map((_, i: number) => (
              <Box key={i} className="aspect-square">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  animation="wave"
                  sx={{
                    backgroundColor: resolvedTheme === "dark" ? "#333" : "",
                  }}
                />
              </Box>
            ))
          : Array.isArray(posts) &&
            posts.map((e, i) => (
              <div
                className="relative group aspect-square overflow-hidden cursor-pointer"
                key={i}
                onClick={() => {
                  setSelectedPost(e);
                  setOpenModal(true);
                }}
              >
                {Array.isArray(e.images) &&
                  e.images
                    .filter((fileName) => fileName.trim() !== "")
                    .slice(0, 1)
                    .map((fileName) => {
                      const isVideo =
                        fileName.toLowerCase().endsWith(".mp4") ||
                        fileName.endsWith(".webm");
                      const src = `${API}/images/${fileName}`;
                      return (
                        <React.Fragment key={fileName}>
                          {isVideo ? (
                            <video
                              autoPlay
                              muted
                              loop
                              playsInline
                              src={src}
                              className="w-[100%] h-[100%] object-cover"
                            />
                          ) : (
                            <img
                              src={src}
                              alt="media"
                              className="w-[100%] h-[100%] object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <div className="flex gap-6 font-semibold text-sm text-white">
                              <div className="flex items-center gap-1">
                                {likeVideo}
                                <p>{e.postLikeCount}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {commentVideo}
                                <p>{e.commentCount}</p>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
              </div>
            ))}
      </div>
      <ModalExplore
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedPost={selectedPost ? selectedPost : null}
      />
    </>
  );
}
export default page;
