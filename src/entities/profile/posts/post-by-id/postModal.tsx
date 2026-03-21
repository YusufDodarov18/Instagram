"use client";

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import profile from "../../../../app/(router)/(protected)/profile/profil-removebg-preview.png";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  MoreHoriz,
  FavoriteBorder,
  Favorite,
  ChatBubbleOutline,
  Send,
  BookmarkBorder,
  Bookmark,
  EmojiEmotions,
  VolumeUp,
  VolumeOff,
  ArrowBack,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { comment, message, messageActive } from "@/app/widget/icons/svg";
import { usePostById } from "@/app/store/pages/profile/posts/post";
import { API } from "@/shared/utils/config";
import { useProfileById } from "@/app/store/pages/profile/profile-by-id/profile-by-id";
import { useTranslation } from "react-i18next";
import getToken from "@/api/token";
import EmojiPicker from "emoji-picker-react";
import MenuPostById from "./menu";
import { formatDate } from "@/entities/home/comments/script";

export default function PostModalById({
  open = false,
  onClose,
  postId,
}: {
  open: boolean;
  onClose: () => void;
  postId: number | null;
}) {
  const [likedComments, setLikedComments] = useState<object>(new Set());
  const [textComment, setTextComment] = useState("");
  const [insertOpen, setInsertOpen] = useState(false);
  const [showEmojies, setShowEmojies] = useState(false);
  const [menu, setMenu] = useState(false);
  const { theme } = useTheme();
  const {
    addCommentPost,
    addFavoritePost,
    deleteComment,
    follow,
    getPostById,
    dataById,
    likePost,
    loading,
    unFollow,
  } = usePostById();
  const { info, getInfoById, followers, getFollowersById } = useProfileById();
  const { t, i18n } = useTranslation();
  const userid = getToken().sid;
  const router = useRouter();

  if (postId === null) return null;

  useEffect(() => {
    if (postId) {
      getPostById(postId);
    }
  }, [postId]);

  // useEffect(() => {
  //   if (dataById?.userId) {
  //     getInfoById(dataById.userId);
  //     getFollowersById(dataById.userId);
  //   }
  // }, [dataById]);

  //   console.log(postId);
  if (!dataById) return null;

  const handleLikeToComments = (commentIndex: number) => {
    setLikedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentIndex)) {
        newSet.delete(commentIndex);
      } else {
        newSet.add(commentIndex);
      }
      return newSet;
    });
  };

  if (!info) return;

  const file = dataById?.images?.[0];
  const src = `${API}/images/${file}`;
  const isVideo = file?.endsWith("mp4") || file.endsWith(".webm");
  return (
    <>
      <Modal
        sx={{ color: theme === "dark" ? "#fff" : "#121212" }}
        open={open}
        onClose={onClose}
        aria-labelledby="post-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 1200,
            width: "90vw",
            height: "90vh",
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            overflow: "hidden",
            bgcolor: theme === "dark" ? "#212328" : "white",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              backgroundColor: "#000",
            }}
          >
            {isVideo ? (
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={src}
                alt="image"
                className="w-full h-full object-cover"
              />
            )}
          </Box>
          <Box
            sx={{
              width: 400,
              display: "flex",
              flexDirection: "column",
              bgcolor: theme === "dark" ? "#121212" : "#fff",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom:
                  "1px solid " + (theme === "dark" ? "#2c2a2a" : "#dbdada"),
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: theme === "dark" ? "#121212" : "#fff",
                color: theme === "dark" ? "white" : "#121212",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Link href={`/profile/${dataById.userId}`}>
                  <Avatar
                    src={
                      dataById.userImage
                        ? `${API}/images/${dataById.userImage}`
                        : profile.src
                    }
                    sx={{ width: 32, height: 32 }}
                  />
                </Link>
                <Box>
                  <Link href={`/profile/${dataById.userId}`}>
                    <Typography variant="body2" fontWeight="bold">
                      {dataById?.userName}
                    </Typography>
                  </Link>
                  <Typography variant="caption">
                    {info?.firstName + " " + info?.lastName}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {followers.find(
                  (follower) => follower.userShortInfo.userId == userid,
                ) && (
                  <Button
                    size="small"
                    variant="text"
                    color="primary"
                    onClick={async () => {
                      await follow(dataById.userId, dataById.postId);
                    }}
                    sx={{
                      color: theme == "dark" ? "#708DFF" : "#4150F7",
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: "transparent",
                      },
                    }}
                  >
                    {t("Follow")}
                  </Button>
                )}
                <IconButton size="small" onClick={() => setMenu(true)}>
                  <MoreHoriz sx={{ color: theme == "dark" ? "white" : "" }} />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
              {dataById?.comments?.length > 0 ? (
                dataById.comments?.map((elem, i) => (
                  <Box key={i} sx={{ mb: 1 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Avatar
                        src={
                          elem.userImage
                            ? `${API}/images/${elem.userImage}`
                            : profile.src
                        }
                        sx={{ width: 32, height: 32 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{ wordBreak: "break-word" }}
                        >
                          <Box
                            component="span"
                            fontWeight="bold"
                            sx={{ mr: 0.5, whiteSpace: "nowrap" }}
                            onClick={() => {
                              if (elem.userId == userid) {
                                router.push(`/profile`);
                              } else {
                                router.push(`/profile/${elem.userId}`);
                              }
                            }}
                          >
                            {elem.userId === userid ? t("you") : elem.userName}:
                          </Box>
                          <Box component="span">{elem.comment}</Box>
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            mt: 0.5,
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ display: "flex", gap: 1.3 }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ cursor: "pointer", color: "#6A7A7A" }}
                            >
                              {formatDate(elem.dateCommented, t)}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ cursor: "pointer", color: "#6A7A7A" }}
                              onClick={() => handleLikeToComments(i)}
                            >
                              {t("like")}: {dataById?.postLikeCount}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ cursor: "pointer", color: "#6A7A7A" }}
                            >
                              {t("answer")}
                            </Typography>
                          </Box>
                          <IconButton size="small">
                            <MoreHoriz
                              sx={{ color: theme == "dark" ? "white" : "" }}
                              fontSize="small"
                            />
                          </IconButton>
                        </Box>
                      </Box>

                      <IconButton
                        size="small"
                        onClick={() => handleLikeToComments(i)}
                      >
                        {likedComments.has(i) ? (
                          <Favorite fontSize="small" sx={{ color: "red" }} />
                        ) : (
                          <FavoriteBorder
                            fontSize="small"
                            sx={{ color: theme == "dark" ? "white" : "" }}
                          />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h5">{t("No comments yet.")}</Typography>
                  <Typography>{t("Start the conversation.")}</Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ borderTop: "1px solid" }}>
              <Box sx={{ p: 2, pb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => likePost(dataById.postId)}
                      sx={{
                        color: dataById.postLike
                          ? "red"
                          : theme == "dark"
                            ? "white"
                            : "black",
                      }}
                    >
                      {dataById.postLike ? (
                        <Favorite sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                    <IconButton
                      sx={{ color: theme == "dark" ? "white" : "black" }}
                      size="small"
                    >
                      {comment}
                    </IconButton>
                    <IconButton
                      sx={{ color: theme == "dark" ? "white" : "black" }}
                      size="small"
                    >
                      {messageActive}
                    </IconButton>
                  </Box>
                  <IconButton
                    sx={{ color: theme == "dark" ? "white" : "black" }}
                    size="small"
                    onClick={() => addFavoritePost(dataById.postId)}
                  >
                    {dataById.postFavorite ? <Bookmark /> : <BookmarkBorder />}
                  </IconButton>
                </Box>
                <Typography sx={{ textAlign: "start" }} variant="body2">
                  {t("Be the first to like this!")}
                </Typography>
                <Typography variant="caption">
                  {dataById?.datePublished
                    ? new Date(dataById.datePublished).toLocaleDateString(
                        i18n.language,
                        {
                          day: "numeric",
                          month: "long",
                        },
                      )
                    : ""}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TextField
                    fullWidth
                    variant="standard"
                    value={textComment}
                    onChange={(e) => setTextComment(e.target.value)}
                    placeholder={t("Add a comment...")}
                    sx={{
                      input: {
                        color: theme === "dark" ? "#fff" : "#121212",
                      },
                      "& .MuiInputAdornment-root svg": {
                        color: theme === "dark" ? "#B0B0B0" : "gray",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton size="small">
                            <EmojiEmotions
                              onClick={() => setShowEmojies((prev) => !prev)}
                              sx={{ cursor: "pointer", color: "gray" }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            onClick={async () => {
                              if (textComment.trim()) {
                                await addCommentPost({
                                  postId: dataById.postId,
                                  commentText: textComment,
                                });
                                setTextComment("");
                              }
                            }}
                            type="submit"
                            size="small"
                            color="primary"
                          >
                            {t("Post")}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {showEmojies && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "60px",
                        left: "600px",
                        width: "100%",
                        zIndex: 10,
                      }}
                    >
                      <EmojiPicker
                        onEmojiClick={(em) => {
                          setTextComment((prev) => prev + em.emoji);
                          setShowEmojies(false);
                        }}
                        searchDisabled
                        skinTonesDisabled
                        height={350}
                      />
                    </Box>
                  )}
                </form>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
      {menu && (
        <MenuPostById
          onClose={() => setMenu(false)}
          onCloseModal={onClose}
          open={menu}
          onOpenInsert={() => setInsertOpen(true)}
        />
      )}
      <Dialog open={insertOpen} onClose={() => setInsertOpen(false)}>
        <DialogContent sx={{ p: 0 }}>
          <div className="w-[500px] max-w-[100%] font-mono p-[16px] rounded-[8px] bg-[#282727] text-white">
            <textarea
              name="codes"
              id="code"
              readOnly
              className="w-[100%] h-[220px] rounded-[4px] p-[10px] text-[13px]  bg-[black] text-[gray] border-1 border-solid border-[#444] resize-none box-border"
              value={`<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DV1fiMSjHwy/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DV1fiMSjHwy/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Посмотреть эту публикацию в Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DV1fiMSjHwy/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Публикация от Carl Berndt | Photographer (@carlo_wiewaswo)</a></p></div></blockquote><script async src="//www.instagram.com/embed.js"></script>`}
            />
            <div className="flex items-center mt-[12px] mb-[12px] gap-[8px]">
              <input
                type="checkbox"
                className="w-[16px] h-[16px] accent-[#3897f0] cursor-pointer"
                defaultChecked
              />
              <label htmlFor="" className="text-[18px] cursor-pointer">
                {t("Enable signature")}
              </label>
            </div>
            <button className="w-[100%] p-[10px] text-[15px] rounded-[6px] font-bold cursor-pointer text-[white] bg-[#385af0] hover:bg-[#1d4aeb]">
              {t("Copy the embed code")}
            </button>
            <p className="text-[12px] mt-[10px] mb-[0] text-left text-[#aaaaaa] font-sans">
              {t("By using this embed code you agree to")}
              <a
                href="instagram.com/about/legal/terms/api/"
                target="_blank"
                rel="noreferrer"
                className="text-[#5874f2]"
              >
                {t("API Terms of Use")}
              </a>
              Instagram
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
