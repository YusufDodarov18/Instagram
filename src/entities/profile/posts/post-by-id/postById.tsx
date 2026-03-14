import { useProfileById } from "@/app/store/pages/profile/profile-by-id/profile-by-id";
import { API } from "@/shared/utils/config";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useTheme } from "next-themes";
import PostModalById from "./postModal";

export default function PostById() {
  const { getPostById, posts } = useProfileById();
  const pathname = usePathname();
  const [selectedPost, setSelectedPost] = useState<null | number>(null);
  const id = pathname.split("/")[2];
  const { theme } = useTheme();
  if (!id) return null;

  useEffect(() => {
    if (id) {
      getPostById(id);
    }
  }, [id, getPostById]);

  if (!posts) return;
  // console.log(selectedPost);
  return (
    <>
      <div className="grid grid-cols-3 gap-[2px] sm:gap-4 px-1 sm:px-0">
        {posts?.map((el) => {
          const file = el.images?.[0];
          const src = `${API}/images/${file}`;
          const isVideo = file?.endsWith(".mp4");
          return (
            <div
              key={el.postId}
              onClick={() => {
                if (!el.postId && el.postId !== 0) return;
                setSelectedPost(Number(el.postId));
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
        <PostModalById
          open={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          postId={selectedPost}
        />
      )}
    </>
  );
}
