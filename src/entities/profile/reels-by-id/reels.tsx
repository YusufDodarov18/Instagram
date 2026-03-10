import { useProfileById } from "@/app/store/pages/profile/profile-by-id/profile-by-id";
import { API } from "@/shared/utils/config";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ReelsById() {
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
      {/* {selectedPost && (
            <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
          )} */}
    </>
  );
}
