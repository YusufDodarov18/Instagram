import { useProfileById } from "@/app/store/profile/profile-by-id/profile-by-id";
import { API } from "@/shared/utils/config";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PostById() {
  const { getPostById, posts } = useProfileById();
  const pathname = usePathname();

  const id = pathname.split("/")[2];

  useEffect(() => {
    if (id) {
      getPostById(id);
    }
  }, [id, getPostById]);

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
            //   onClick={() => setSelectedPost(el)}
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
      {/* {selectedPost && (
            <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
          )} */}
    </>
  );
}
