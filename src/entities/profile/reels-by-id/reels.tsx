import { useProfileById } from "@/app/store/pages/profile/profile-by-id/profile-by-id";
import { API } from "@/shared/utils/config";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PostModalById from "../posts/post-by-id/postModal";

export default function ReelsById() {
  const { getPostById, posts } = useProfileById();
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      getPostById(id);
    }
  }, [id, getPostById]);

  return (
    <>
      <div className="grid grid-cols-3 gap-[2px] sm:gap-4 px-1 sm:px-0">
        {posts
          ?.filter((el) => {
            const file = el?.images?.[0];
            return typeof file === "string" && file.endsWith(".mp4");
          })
          .map((el) => {
            const file = el.images?.[0];
            const src = `${API}/images/${file}`;

            return (
              <div
                key={el.postId}
                className="w-full aspect-square overflow-hidden"
                onClick={() => setSelectedPost(el.postId)}
              >
                <video
                  src={src}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover rounded"
                />
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
