"use client";

import { API } from "@/shared/utils/config";
import { useEffect, useState } from "react";
import PostModal from "./post-modal/modal";
import { myPost } from "@/app/(router)/types";
import { useProfile } from "@/app/store/pages/profile/myProfile/profile";

export default function MyPosts() {
  const { getMyPosts, myPosts } = useProfile();
  const [selectedPost, setSelectedPost] = useState<null | myPost>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  return (
    <>
      <div className="grid grid-cols-3 gap-[2px] sm:gap-4 px-1 sm:px-0">
        {myPosts?.map((el) => {
          const file = el.images?.[0];
          const src = `${API}/images/${file}`;
          const isVideo = file?.endsWith(".mp4");
          return (
            <div
              key={el.postId}
              onClick={() => {
                setSelectedPost(el);
                setOpen(true);
              }}
              className="w-full aspect-square overflow-hidden cursor-pointer"
            >
              {isVideo ? (
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <img
                  src={src}
                  alt="user post"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded"
                />
              )}
            </div>
          );
        })}
      </div>
      {selectedPost && (
        <PostModal
          open={open}
          post={selectedPost}
          onClose={() => {
            setOpen(false);
            setSelectedPost(null);
          }}
        />
      )}
    </>
  );
}
