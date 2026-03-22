"use client";
import "./story.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useStory } from "@/app/store/pages/home/stories/story";
import profile from "../../../../app/(router)/(protected)/profile/profil-removebg-preview.png";
import { API } from "@/shared/utils/config";
import StoryByid from "../storyByid/storyByid";
import getToken from "@/api/token";
import { t } from "i18next";

export default function Story() {
  const { datas, getStories, loading, addStory, addStoriesPost } = useStory();
  let [arrowLeft, setArrowLeft] = useState(false);
  let [arrowRight, setArrowRight] = useState(false);
  let [modalStoryById, setModalStoryById] = useState(false);
  let [selectedStory, setSelectedStory] = useState<number | null>(null);
  let [watchedStory, setWatchedStories] = useState<number[]>([]);
  let scrollRef = useRef<HTMLDivElement>(null);
  let inputRef = useRef<HTMLInputElement | null>(null);
  let myId = getToken().sid;

  if (!myId) return;

  const chackScroll = () => {
    let scroll = scrollRef.current;
    if (!scroll) return;
    setArrowLeft(scroll.scrollLeft > 0);
    setArrowRight(scroll.scrollLeft < scroll.scrollWidth - scroll.clientWidth - 1);
  };

  useEffect(() => {
    getStories();
  }, [getStories]);

  useEffect(() => {
    chackScroll();
    let scroll = scrollRef.current;
    if (!scroll) return;
    scroll.addEventListener("scroll", chackScroll);
    var resize = new ResizeObserver(chackScroll);
    resize.observe(scroll);
    return () => {
      scroll.removeEventListener("scroll", chackScroll);
      resize.disconnect();
    };
  }, [datas]);

  const handleScroll = (dir: "left" | "right") => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    scroll.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("stories");
    if (stored) {
      setWatchedStories(JSON.parse(stored));
    }
  }, []);

  const handleSelectStory = async (index: number) => {
    const user = stories[index];
    const userId = stories[index].userId;
    let viewedStory = [...watchedStory];

    if (!viewedStory.includes(userId)) {
      viewedStory.push(userId);
      setWatchedStories(viewedStory);
      sessionStorage.setItem("stories", JSON.stringify(viewedStory));
    }

    if (!user.stories || user.stories.length === 0) {
      if (user.userId === myId) {
        inputRef.current?.click();
        return;
      }
    }

    setSelectedStory(index);
    setModalStoryById(true);
  };

  const stories = datas
    ? [
        ...datas.filter((user) => user.userId === myId),
        ...datas.filter((user) => user.userId !== myId),
      ]
    : [];

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    await addStory(file);
    await getStories();
  };

  const hasStory = (user: any) => user.stories && user.stories.length > 0;
  return (
    <>
      <div className="w-[100%] flex justify-start gap-3 relative group border-b border-border">
        {arrowLeft && (
          <button className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card shadow-md border border-border items-center justify-center text-foreground/70 hover:text-foreground hover:shadow-lg transition-all cursor-pointer" onClick={() => handleScroll("left")}>
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {arrowRight && (
          <button className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card shadow-md border border-border items-center justify-center text-foreground/70 hover:text-foreground hover:shadow-lg transition-all cursor-pointer" onClick={() => handleScroll("right")}>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <div className="flex gap-4 px-4 py-3 overflow-x-auto scrollbar-hide" ref={scrollRef}>
          {loading
            ? Array.from({ length: 5 }).map(() => (
                <div className="flex flex-col items-center gap-1">
                  <div className="rounded-[50%] p-[2.5px] bg-gradient-to-br animate-pulse">
                    <div className="rounded-[50%] p-[2px] bg-card">
                      <div className="w-[56px] h-[56px] sm:w-[66px] sm:h-[66px] rounded-[50%] flex items-center justify-center overflow-hidden bg-secondary">
                        <div className="w-[100%] h-[100%] bg-gradient-to-br from-muted to-secondary"></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[10px] sm:h-[12px] w-[50px] sm:w-[60px] bg-muted rounded animate-pulse"></div>
                </div>
              ))
            : stories?.map((user, i) => {
                let isMe = user.userId === myId;
                let userHasStory = hasStory(user);
                return (
                  <motion.button
                    className="flex flex-col items-center gap-1.5 relative flex-shrink-0"
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <div className={`p-[2.5px] rounded-[50%] ${!hasStory(user)? "": user.userId === myId? "bg-[conic-gradient(from_180deg,#f9ce34_0deg,#ee2a7b_120deg,#6228d7_240deg,#f9ce34_360deg)] dark:bg-[conic-gradient(from_180deg,#f9ce34_0deg,#ec4899_120deg,#8b5cf6_240deg,#f9ce34_360deg)]": !watchedStory.includes(user.userId) ? "bg-[conic-gradient(from_180deg,#f9ce34_0deg,#ee2a7b_120deg,#6228d7_240deg,#f9ce34_360deg)] dark:bg-[conic-gradient(from_180deg,#f9ce34_0deg,#ec4899_120deg,#8b5cf6_240deg,#f9ce34_360deg)]" : "bg-gray-300 dark:bg-gray-600"}`} onClick={() => handleSelectStory(i)}>
                      <div className="rounded-[50%] p-[2px] bg-card">
                        <div className="w-[56px] h-[56px] sm:w-[66px] sm:h-[66px] rounded-[50%] flex items-center justify-center overflow-hidden bg-secondary">
                          <div className="w-[100%] h-[100%]flex items-center justify-center bg-gradient-to-br  from-muted to-secondary cursor-pointer">
                            <img src={user.userImage?`${API}/images/${user.userImage}`: profile.src}/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRef}
                      accept="image/*,video/*"
                      onChange={handleChangeFile}
                    />
                    {user.userId === myId && (
                      <div className="absolute bottom-[12px] left-[52px] p-[3px] rounded-[50%] cursor-pointer flex justify-center items-center bg-[#f1f1f1] dark:bg-[#000]" onClick={() => inputRef?.current?.click()}>
                        <Plus />
                      </div>
                    )}
                    <span className="max-w-[66px] text-[11px] sm:text-xs text-foreground truncate">
                      {user.userId === myId ? t("Your Story") : user.userName}
                    </span>
                  </motion.button>
                );
              })}
        </div>
      </div>

      {selectedStory !== null && modalStoryById && (
        <StoryByid
          onClose={() => setModalStoryById(false)}
          stories={stories}
          open={modalStoryById}
          userId={selectedStory}
        />
      )}
    </>
  );
}