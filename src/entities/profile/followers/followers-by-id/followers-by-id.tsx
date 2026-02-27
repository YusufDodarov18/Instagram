import { DecodedToken, MyFollowers } from "@/app/(router)/types";
import { useProfile } from "@/app/store/profile/myProfile/profile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { API } from "@/shared/utils/config";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import profileDefault from "../../../../app/(router)/(protected)/profile/profil-removebg-preview.png";
import { useProfileById } from "@/app/store/profile/profile-by-id/profile-by-id";

function FollowersById({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { followers, followings, followersLoading } = useProfileById();
  const [search, setSearch] = useState<string>("");
  const [decode, setDecode] = useState<DecodedToken | null>(null);
  const [subscribed, setSubscribed] = useState<MyFollowers[]>([]);
  const { addFollowing, unFollowing } = useProfile();
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setDecode(decoded);
      } catch (err) {
        console.error("Ошибка декодирования токена:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (open && followers) {
      const followingId = new Set(
        followings.map((f) => f.userShortInfo.userId),
      );
      setSubscribed(
        followers.map((follower) => ({
          ...follower,
          isFollowing: followingId.has(follower.userShortInfo.userId),
        })),
      );
    }
  }, [open, followers, followings]);

  const toggleFollow = async (
    userId: string,
    isCurrentlyFollowing: boolean,
  ) => {
    if (!decode) return;
    setSubscribed((prev) =>
      prev.map((user) =>
        user.userShortInfo.userId === userId
          ? { ...user, isFollowing: !isCurrentlyFollowing }
          : user,
      ),
    );

    try {
      if (isCurrentlyFollowing) {
        await unFollowing(userId, decode?.sid);
      } else {
        await addFollowing(userId, decode?.sid);
      }
    } catch (error) {
      console.error("Ошибка при смене подписки:", error);
    }
  };

  const filteredFollowers = subscribed.filter(
    (elem) =>
      elem.userShortInfo.userName
        .toLowerCase()
        .includes(search.toLowerCase().trim()) ||
      elem.userShortInfo.fullname
        .toLowerCase()
        .includes(search.toLowerCase().trim()),
  );

  return (
    <Dialog open={open}>
      <form onSubmit={(e) => e.preventDefault()}>
        <DialogContent className="sm:max-w-md max-h-[70vh] overflow-hidden overflow-y-auto [&>button]:hidden dark:bg-[#1b1b1b] dark:text-white bg-white text-[black]">
          <DialogHeader className="border-b pb-3 relative">
            <DialogTitle className="text-center w-full">
              {t("yourFollowing")}
            </DialogTitle>
            <span
              className="absolute right-[0] top-[-21px] text-[36px] cursor-pointer"
              onClick={onClose}
            >
              ×
            </span>
          </DialogHeader>
          <section>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search1")}
              className="w-[100%] outline-[0] bg-[#F3F5F7] dark:bg-[#25292E] py-2 indent-3 rounded-4xl"
            />
          </section>

          <section>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                flexDirection: "column",
              }}
            >
              {followersLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Skeleton variant="circular" width={44} height={44} />
                      <Box>
                        <Skeleton variant="text" width={100} height={14} />
                        <Skeleton variant="text" width={140} height={13} />
                      </Box>
                    </Box>
                    <Skeleton
                      variant="rectangular"
                      width={80}
                      height={32}
                      sx={{ borderRadius: "20px" }}
                    />
                  </Box>
                ))
              ) : filteredFollowers.length === 0 ? (
                <Typography textAlign="center" color="#8e8e8e" mt={2}>
                  {t("No results found.")}
                </Typography>
              ) : (
                filteredFollowers.map((elem) => {
                  const isSelf = decode?.sid === elem.userShortInfo.userId;
                  return (
                    <Box
                      key={elem.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Box
                          sx={{ width: 44, height: 44, position: "relative" }}
                        >
                          <Link href={`/profile/${elem.userShortInfo.userId}`}>
                            <img
                              src={
                                elem.userShortInfo.userPhoto
                                  ? `${API}/images/${elem.userShortInfo.userPhoto}`
                                  : `${profileDefault.src}`
                              }
                              alt="profile"
                              className="rounded-full object-cover w-full h-full"
                            />
                          </Link>
                        </Box>
                        <Box>
                          <Link
                            href={
                              isSelf
                                ? "/profile"
                                : `/profile/${elem.userShortInfo.userId}`
                            }
                          >
                            <Typography fontSize={14} fontWeight={500}>
                              {elem.userShortInfo.userName}
                            </Typography>
                          </Link>
                          <Typography fontSize={13} color="#8e8e8e">
                            {elem.userShortInfo.fullname}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        {!isSelf && (
                          <Button
                            variant="contained"
                            sx={{
                              bgcolor: "#4A5DF9",
                              boxShadow: "none",
                              "&:hover": {
                                boxShadow: "none",
                                bgcolor: "rgb(54 75 255)",
                              },
                            }}
                            onClick={() =>
                              toggleFollow(
                                elem.userShortInfo.userId,
                                elem.isFollowing,
                              )
                            }
                          >
                            {elem.isFollowing ? t("unFollow") : t("Follow")}
                          </Button>
                        )}
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
          </section>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default FollowersById;
