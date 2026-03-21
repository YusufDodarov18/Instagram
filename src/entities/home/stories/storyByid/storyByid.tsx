"use client";
import { useStory } from "@/app/store/pages/home/stories/story";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { stories } from "@/app/(router)/types";
import { instagramText } from "@/app/widget/icons/svg";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { API } from "@/shared/utils/config";
import profile from "../../../../app/(router)/(protected)/profile/profil-removebg-preview.png";
import MenuStory from "../menuStory/menu";

function StoryByid({
  onClose,
  userId,
  stories,
}: {
  open: boolean;
  onClose: () => void;
  userId: number;
  stories: stories[];
}) {
  const [userIndex, setUserIndex] = useState(userId);
  const [storyIndex, setStoryIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [menu, setMenu] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [time, setTime] = useState(0);
  const { t } = useTranslation();
  const {
    addStoryView,
    addStory,
    getStoryById,
    storyById,
    loading,
    likeStory,
    addStoriesPost,
    myStories,
    datas,
    getMyStories,
    getStories,
  } = useStory();

  const currentUser = stories?.[userIndex];
  const currentStory = currentUser?.stories?.[storyIndex];
  const isVideo =
    currentStory?.fileName?.endsWith(".mp4") ||
    currentStory?.fileName?.endsWith(".webm");
  const userPhoto = currentUser?.userImage
    ? `${API}/images/${currentUser?.userImage}`
    : profile.src;
  const src = `${API}/images/${currentStory?.fileName}`;

  useEffect(() => {
    getStories();
  }, [getStories]);

  useEffect(() => {
    getMyStories();
  }, []);

  const handleNextStory = useCallback(() => {
    if (!currentUser) return;

    if (storyIndex < currentUser?.stories?.length - 1) {
      setStoryIndex((story) => story + 1);
      setTime(0);
    } else if (userIndex < stories.length - 1) {
      setUserIndex((user) => user + 1);
      setStoryIndex(0);
      setTime(0);
    } else {
      onClose();
    }
  }, [
    storyIndex,
    userIndex,
    currentUser?.stories?.length,
    stories.length,
    onClose,
  ]);

  const handlePrevStory = useCallback(() => {
    if (storyIndex > 0) {
      setStoryIndex((story) => story - 1);
      setTime(0);
    } else if (userIndex > 0 && stories[userIndex - 1]) {
      setUserIndex((user) => user - 1);
      setStoryIndex(stories[userIndex - 1].stories.length - 1);
    }
  }, [storyIndex, userIndex, stories]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          handleNextStory();
          break;
        case "ArrowLeft":
          handlePrevStory();
          break;
        case "Escape":
          onClose();
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNextStory, handlePrevStory, onClose]);

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (seconds < 60) return t("time.now");
    if (minutes < 60) return t("time.minutes", { count: minutes });
    if (hours < 24) return t("time.hours", { count: hours });
    if (days < 7) return t("time.days", { count: days });
    return t("time.weeks", { count: weeks });
  };

  const togglePause = () => {
    setPaused((prev) => !prev);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (paused) {
      video.pause();
    } else {
      video.play();
    }
  }, [paused]);

  useEffect(() => {
    if (paused) return;
    const duration = isVideo ? 15000 : 5000;
    const second = 50;
    const step = (second / duration) * 100;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev >= 100) {
          handleNextStory();
          return 0;
        }
        return prev + step;
      });
    }, second);

    return () => clearInterval(timer);
  }, [handleNextStory, isVideo, storyIndex, userIndex, paused]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = muted;
    }
  }, [storyIndex, userIndex, muted]);

  const handleMutedVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  const handleLikeStory = async (storyId: number) => {
    await likeStory(storyId);
  };

  const findStory = myStories?.stories?.find((story) => story?.id === currentStory?.id) || null;

  if (!stories || !stories.length || !currentUser || !currentStory || !userPhoto) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[100] bg-[#1A1A1A] flex py-5 justify-center flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex justify-between w-[100%] px-5 h-4">
            <Link href={`/`} onClick={onClose}>
              <h1 className="text-white cursor-pointer">{instagramText}</h1>
            </Link>
            <button className="text-white cursor-pointer" onClick={onClose}>
              <CloseIcon className="w-7 h-7" />
            </button>
          </div>
          <div className="flex justify-center h-[100%] items-center">
            {userIndex > 0 && (
              <button className="hidden sm:flex absolute left-4 z-[110] w-10 h-10 rounded-full bg-white items-center justify-center text-black" onClick={handlePrevStory}>
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {userIndex < stories.length - 1 && (
              <button className="hidden sm:flex absolute right-4 z-[110] w-10 h-10 rounded-full bg-white items-center justify-center text-black" onClick={handleNextStory}>
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <motion.div
              key={`${userIndex}`}
              className="relative w-full h-full sm:w-[400px] sm:h-[700px] sm:rounded-xl overflow-hidden bg-foreground"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 z-[105] flex">
                <div className="w-1/3 h-full" onClick={handlePrevStory} />
                <div className="w-1/3 h-full" />
                <div className="w-1/3 h-full" onClick={handleNextStory} />
              </div>
              <div className="absolute top-[0px] left-[0px] right-[0px] z-[106] flex gap-1 p-2 pt-3">
                {currentUser.stories.map((_, i) => (
                  <Progress
                    className="flex-1 h-[2.5px] bg-primary-foreground/30 [&>div]:bg-primary-foreground [&>div]:transition-all [&>div]:duration-100 [&>div]:ease-linear"
                    key={i}
                    value={i < storyIndex ? 100 : i === storyIndex ? time : 0}
                  />
                ))}
              </div>

              <div className="absolute top-6 left-0 right-0 z-[106] flex items-center gap-3 px-4 py-2">
                <div className="w-[100%] flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="cursor-pointer">
                      <img className="w-[40px] h-[40px] rounded-[50%] object-cover" src={userPhoto}/>
                    </div>
                    <div className="flex gap-3 text-white">
                      <h1>{currentUser?.userName}</h1>
                      <p className="text-gray-400">{timeAgo(currentStory?.createAt)}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center text-white cursor-pointer">
                    {isVideo &&
                      (muted ? (
                        <svg aria-label="Звук выключен" className="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="16" role="img" viewBox="0 0 48 48" width="16" onClick={handleMutedVideo}>
                          <title>Звук выключен</title>
                          <path d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z"></path>
                        </svg>
                      ) : (
                        <svg aria-label="Аудио воспроизводится" className="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16" onClick={handleMutedVideo}>
                          <title>Аудио воспроизводится</title>
                          <path d="M16.636 7.028a1.5 1.5 0 10-2.395 1.807 5.365 5.365 0 011.103 3.17 5.378 5.378 0 01-1.105 3.176 1.5 1.5 0 102.395 1.806 8.396 8.396 0 001.71-4.981 8.39 8.39 0 00-1.708-4.978zm3.73-2.332A1.5 1.5 0 1018.04 6.59 8.823 8.823 0 0120 12.007a8.798 8.798 0 01-1.96 5.415 1.5 1.5 0 002.326 1.894 11.672 11.672 0 002.635-7.31 11.682 11.682 0 00-2.635-7.31zm-8.963-3.613a1.001 1.001 0 00-1.082.187L5.265 6H2a1 1 0 00-1 1v10.003a1 1 0 001 1h3.265l5.01 4.682.02.021a1 1 0 001.704-.814L12.005 2a1 1 0 00-.602-.917z"></path>
                        </svg>
                      ))}
                    {paused ? (
                      <svg aria-label="Воспроизвести" className="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16" onClick={togglePause}>
                        <title>Воспроизвести</title>
                        <path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z"></path>
                      </svg>
                    ) : (
                      <svg aria-label="Приостановить" className="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="16" role="img" viewBox="0 0 48 48" width="16" onClick={togglePause}>
                        <title>Приостановить</title>
                        <path d="M15 1c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3zm18 0c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3z"></path>
                      </svg>
                    )}
                    <svg aria-label="Меню" className="x1lliihq x1n2onr6 x1g9anri" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" onClick={() => setMenu(true)}>
                      <title>Меню</title>
                      <circle cx="12" cy="12" r="2.75"></circle>
                      <circle cx="19.5" cy="12" r="2.75"></circle>
                      <circle cx="4.5" cy="12" r="2.75"></circle>
                    </svg>
                  </div>
                </div>
              </div>

              {/* <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-foreground/80 to-foreground">
                    {currentStory.fileName ? (
                      isVideo ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center text-primary-foreground/40">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-primary-foreground/20 flex items-center justify-center">
                              <div className="w-0 h-0 border-l-[14px] border-l-primary-foreground/30 border-y-[9px] border-y-transparent ml-1" />
                            </div>
                            <p className="text-xs">Видео</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted/10 via-foreground to-muted/5 flex items-center justify-center">
                          <div className="text-center text-primary-foreground/30">
                            <div className="w-20 h-20 mx-auto mb-2 rounded-lg border border-primary-foreground/10 flex items-center justify-center">
                              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--story-gradient-1))/0.3] via-foreground to-[hsl(var(--story-gradient-2))/0.2] flex items-center justify-center">
                        <p className="text-primary-foreground/20 text-sm">Контент нест</p>
                      </div>
                    )}
                  </div> 
              */}

              {currentStory.fileName &&
                (isVideo ? (
                  <video
                    className="w-[100%] h-[100%] object-cover"
                    autoPlay
                    src={src}
                    ref={videoRef}
                    muted={muted}
                  />
                ) : (
                  <img className="w-[100%] h-[100%] object-cover" src={src} />
                ))}
              {
                <div className="absolute bottom-[0px] z-[200] w-[100%] px-[27px] py-[16px] flex items-center gap-4 bg-gradient-to-t from-black/60 to-transparent">
                  <input
                    type="text"
                    placeholder={t("Answer")}
                    className="outline-[0px] py-[10px] px-[16px] border-[1.5px] rounded-[19px] bg-transparent flex-1 indent-[1px] border-white text-white placeholder:text-[#d6d6d6]"
                  />
                  {currentStory.liked ? (
                    <svg aria-label="Не нравится" className="duration-200 hover:scale-110 cursor-pointer text-[red]" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24" onClick={() => handleLikeStory(currentStory.id)}>
                      <title>Не нравится</title>
                      <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                    </svg>
                  ) : (
                    <svg aria-label="Нравится" className="duration-200 hover:scale-110 text-white cursor-pointer" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" onClick={() => handleLikeStory(currentStory.id)}>
                      <title>Нравится</title>
                      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                    </svg>
                  )}
                  <svg aria-label="Direct" className="duration-200 hover:scale-110 text-white cursor-pointer" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <title>Direct</title>
                    <path d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                    <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line>
                  </svg>
                </div>
              }
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {menu && (
        <MenuStory
          open={menu}
          storyId={findStory?.id}
          onClose={() => setMenu(false)}
        />
      )}
    </>
  );
}

export default StoryByid;
