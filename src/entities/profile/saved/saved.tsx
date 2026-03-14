import { API } from "@/shared/utils/config";
import React, { useEffect, useState } from "react";
import { useProfile } from "@/app/store/pages/profile/myProfile/profile";
import PostModalById from "../posts/post-by-id/postModal";

function MySavedPosts() {
  const { getMyPostSaved, myPostSaved } = useProfile();
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getMyPostSaved();
      setLoading(false);
    };
    fetchData();
  }, [getMyPostSaved]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-[2px] sm:gap-4 px-1 sm:px-0">
        {myPostSaved.map((el) => {
          const file = el.images?.[0];
          const src = `${API}/images/${file}`;
          const isVideo = file?.endsWith("mp4");
          return (
            <div
              className="w-[100%] aspect-square overflow-hidden cursor-pointer"
              onClick={() => setSelectedPost(el.postId)}
              key={el.postId}
            >
              {isVideo ? (
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <img
                  src={src}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded"
                  alt="user post"
                />
              )}
            </div>
          );
        })}
      </div>

      {selectedPost && (
        <PostModalById
          postId={selectedPost}
          open={!!selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
}

export default MySavedPosts;
