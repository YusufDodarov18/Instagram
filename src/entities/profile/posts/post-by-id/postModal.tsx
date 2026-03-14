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
import MenuPostById from "./post-modal-by-id/menu";
import { Insert } from "./post-modal-by-id/insertCode";
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
                              {formatDate(elem.dateCommented,t)}
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
      <Insert open={insertOpen} onClose={() => setInsertOpen(false)} />
    </>
  );
}
