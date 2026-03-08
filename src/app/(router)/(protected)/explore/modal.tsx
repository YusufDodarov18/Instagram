"use client";
import * as React from "react";
import { post } from "../../types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useExplore } from "@/app/store/explore/explore";
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
import { useTranslation } from "react-i18next";
import Link from "next/link";
import defaultProfile from "../profile/profil-removebg-preview.png";
import { API } from "@/shared/utils/config";
import { comment } from "@/app/provider/icons/svg";
import { useTheme as useNextTheme } from "next-themes";
import EmojiPicker from "emoji-picker-react";

export default function ModalExplore({
  open,
  onClose,
  selectedPost,
}: {
  open: boolean;
  onClose: () => void;
  selectedPost: post | null;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {
    addComment,
    addFavoritePost,
    addFollowingRelationship,
    deleteFollowingRelationship,
    likePosts,
    comments,
    setInitialComment,
  } = useExplore();
  const [textComment, setTextComment] = React.useState<string>("");
  const [isLiked, setIsLiked] = React.useState(selectedPost?.postLike ?? false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [showEmojis, setShowEmojies] = React.useState(false);
  const [likedComments, setLikedComments] = React.useState<object>(new Set());
  const [isFavorited, setIsFavorited] = React.useState(false);
  const [commentModal, setCommentModal] = React.useState(false);
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useNextTheme();

  React.useEffect(() => {
    if (selectedPost) {
      setInitialComment(selectedPost.comments);
      setIsLiked(selectedPost.postLike || false);
    }
  }, [selectedPost]);

  React.useEffect(() => {
    const video = document.getElementById("post-video");
    if (video && video instanceof HTMLVideoElement) {
      video.muted = false;
      setIsMuted(false);
      video.play().catch((e) => {
        console.log("AutoPlay falied", e);
      });
    }
  }, [selectedPost]);

  if (!selectedPost) return;

  const sendComment = () => {
    const comment = {
      commentText: textComment,
      postId: selectedPost?.postId,
    };
    addComment(comment);
    setTextComment("");
  };

  const handleLike = () => {
    likePosts(selectedPost?.postId);
    setIsLiked((prev) => !prev);
  };

  const handleFollow = () => {
    if (isFollowed) {
      addFollowingRelationship(selectedPost.userId);
    } else {
      deleteFollowingRelationship(selectedPost.userId);
    }
  };

  const handleFavorite = () => {
    setIsFavorited((prev) => !prev);
    addFavoritePost(selectedPost.postId);
  };

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

  const handleOpenComment = () => {
    if (isMobile) {
      setCommentModal(true);
    }
  };

  const handleCloseModalComment = () => handleCloseModalComment;

  if (isMobile) {
    return (
      <>
        <Modal open={open} onClose={onClose} aria-labelledby="post-modal">
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              bgcolor: "background.paper",
              overflow: "auto",
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 0,
                display: "flex",
                alignItems: "centers",
                justifyContent: "space-between",
                p: 2,
                borderBottom: `1px solid`,
                backgroundColor: theme.palette.background.paper,
                zIndex: 10,
              }}
            >
              <IconButton onClick={onClose} size="small">
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" fontWeight="bold">
                {t("post")}
              </Typography>
              <Box sx={{ width: 40 }} />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                borderBottom: "1px solid",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Link href={`/profile/${selectedPost?.userId}`}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={
                        selectedPost.userImage
                          ? `${API}/images/${selectedPost.userImage}`
                          : `${defaultProfile.src}`
                      }
                      sx={{ width: 32, height: 32 }}
                    />
                    <Typography variant="body2" fontWeight="bold">
                      {selectedPost?.userName}
                    </Typography>
                  </Box>
                </Link>
                <Button
                  size="small"
                  variant="text"
                  color="primary"
                  sx={{
                    color: "#708DFF",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }}
                  onClick={handleFollow}
                >
                  {isFollowed ? t("follow") : t("unFollow")}
                </Button>
              </Box>
              <IconButton size="small">
                <MoreHoriz />
              </IconButton>
            </Box>

            <Box
              sx={{
                width: "100%",
                backgroundColor: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                minHeight: "50vh",
              }}
            >
              {selectedPost?.images?.map((fileName) => {
                const isVideo =
                  fileName.endsWith(".mp4") || fileName.endsWith(".webm");
                const src = `${API}/images/${fileName}`;
                if (isVideo) {
                  return (
                    <Box
                      key={selectedPost.postId}
                      sx={{ position: "relative", width: "100%" }}
                    >
                      <video
                        id="post-video"
                        src={src}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                        onClick={(e) => {
                          const video = e.currentTarget;
                          if (video.paused) {
                            video.play();
                          } else {
                            video.pause();
                          }
                        }}
                        autoPlay
                        playsInline
                        muted={isMuted}
                      />
                      <IconButton
                        size="small"
                        onClick={() => {
                          const video = document.getElementById("post-video");
                          if (video && video instanceof HTMLVideoElement) {
                            video.muted = !video.muted;
                            setIsMuted(video.muted);
                          }
                        }}
                        sx={{
                          position: "absolute",
                          bottom: 16,
                          right: 16,
                          backgroundColor: "rgba(0,0,0,0.5)",
                          color: "white",
                          zIndex: 2,
                          "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.7)",
                          },
                        }}
                      >
                        {isMuted ? (
                          <VolumeOff fontSize="small" />
                        ) : (
                          <VolumeUp fontSize="small" />
                        )}
                      </IconButton>
                    </Box>
                  );
                }
                return (
                  <img
                    key={selectedPost.postId}
                    src={src || defaultProfile.src}
                    alt="Post content"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                );
              })}
            </Box>

            <Box sx={{ backgroundColor: theme.palette.background.paper }}>
              <Box sx={{ p: 2, pb: 1 }}>
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
                      onClick={handleLike}
                      color={isLiked ? "error" : "default"}
                    >
                      {isLiked ? (
                        <Favorite sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                    <IconButton size="small" onClick={handleOpenComment}>
                      <ChatBubbleOutline />
                    </IconButton>
                    <IconButton size="small">
                      <Send />
                    </IconButton>
                  </Box>
                  <IconButton onClick={handleFavorite} size="small">
                    {isFavorited ? (
                      <Bookmark sx={{ color: theme.palette.text.primary }} />
                    ) : (
                      <BookmarkBorder />
                    )}
                  </IconButton>
                </Box>
                {selectedPost?.postLikeCount === 0 ? (
                  <Typography
                    sx={{ textAlign: "start" }}
                    variant="body2"
                    fontWeight="bold"
                  >
                    {t("Be the first to like this!")}
                  </Typography>
                ) : (
                  <Typography variant="body2" fontWeight="bold">
                    {selectedPost?.postLikeCount +
                      (isLiked !== selectedPost?.postLike
                        ? isLiked
                          ? 1
                          : -1
                        : 0)}{" "}
                    {t("likes")}
                  </Typography>
                )}
                <Button
                  variant="text"
                  size="small"
                  onClick={handleOpenComment}
                  sx={{
                    p: 0,
                    textTransform: "none",
                    color: "text.secondary",
                    justifyContent: "flex-start",
                    minWidth: "auto",
                  }}
                >
                  {t("View all comments")} ({comments.length})
                </Button>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  {t("now")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Modal>

        <Modal
          open={commentModal}
          onClose={handleCloseModalComment}
          aria-labelledby="comments-modal"
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              bgcolor: "background.paper",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                borderBottom: "1px solid",
                position: "relative",
              }}
            >
              <IconButton
                sx={{ position: "absolute", left: 16 }}
                onClick={handleCloseModalComment}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" fontWeight="bold">
                {t("Comment")}
              </Typography>
            </Box>

            <Box sx={{ flex: 1, overflowY: "auto" }}>
              {comments && comments.length > 0 ? (
                comments.map((comment, i) => (
                  <Box key={i} sx={{ p: 2, borderBottom: "1px solid" }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar
                        src={
                          comment.userImage
                            ? `${API}/images/${comment.userImage}`
                            : `${defaultProfile.src}`
                        }
                        sx={{ width: 32, height: 32 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Typography variant="body2" fontWeight="bold">
                            {comment.userName}
                          </Typography>
                          <Typography variant="body2" sx={{ flex: 1 }}>
                            {comment.comment}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mt: 1,
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            {t("now")}.
                          </Typography>
                          <Button
                            size="small"
                            variant="text"
                            sx={{
                              p: 0,
                              minWidth: "auto",
                              textTransform: "none",
                              color: "text.secondary",
                              fontSize: "12px",
                            }}
                          >
                            {t("answer")}
                          </Button>
                          <Button
                            size="small"
                            variant="text"
                            sx={{
                              p: 0,
                              minWidth: "auto",
                              textTransform: "none",
                              color: "text.secondary",
                              fontSize: "12px",
                            }}
                          >
                            {t("Show translation")}
                          </Button>
                        </Box>
                        <Button
                          size="small"
                          variant="text"
                          sx={{
                            p: 0,
                            mt: 1,
                            minWidth: "auto",
                            textTransform: "none",
                            color: "text.secondary",
                            fontSize: "12px",
                            justifyContent: "flex-start",
                          }}
                        >
                          ——— {t("See all answers")} (2)
                        </Button>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleLikeToComments(i)}
                          sx={{ p: 0.5 }}
                        >
                          {likedComments.has(i) ? (
                            <Favorite fontSize="small" sx={{ color: "red" }} />
                          ) : (
                            <FavoriteBorder fontSize="small" />
                          )}
                        </IconButton>
                        {likedComments.has(i) && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "10px" }}
                          >
                            1
                          </Typography>
                        )}
                      </Box>

                      <Box
                        sx={{
                          borderTop: `1px solid ${theme.palette.divider}`,
                          backgroundColor: theme.palette.background.paper,
                          p: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar sx={{ width: 32, height: 32 }}>
                            <Typography variant="body2">{t("I")}</Typography>
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <TextField
                              value={textComment}
                              onChange={(e) => setTextComment(e.target.value)}
                              fullWidth
                              placeholder={t("Add a comment...")}
                              variant="standard"
                              InputProps={{
                                disableUnderline: true,
                                endAdornment: textComment.trim() && (
                                  <InputAdornment position="end">
                                    <Button
                                      onClick={sendComment}
                                      size="small"
                                      color="primary"
                                      sx={{
                                        textTransform: "none",
                                        fontWeight: "bold",
                                        minWidth: "auto",
                                      }}
                                    >
                                      {t("Post")}
                                    </Button>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                "& .MuiInputBase-input": {
                                  fontSize: "14px",
                                },
                              }}
                            />
                          </Box>
                          <IconButton size="small">
                            <EmojiEmotions />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                    height: "100%",
                  }}
                >
                  <Typography color="text.secondary" align="center">
                    {t("No comments yet.")} <br />
                    {t("Start the conversation.")}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Modal>
      </>
    );
  }

  return (
    <Modal
      sx={{ color: resolvedTheme === "dark" ? "#fff" : "#121212" }}
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
          bgcolor: theme.palette.background.paper,
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
          {selectedPost?.images?.map((fileName) => {
            const isVideo =
              fileName.endsWith(".mp4") || fileName.endsWith(".webm");
            const src = `${API}/images/${fileName}`;

            if (isVideo) {
              return (
                <Box
                  key={selectedPost.postId}
                  sx={{ position: "relative", width: "100%", height: "100%" }}
                >
                  <video
                    id="post-video"
                    src={src}
                    className="w-full h-full object-center"
                    onClick={(e) => {
                      const video = e.currentTarget;
                      if (video.paused) {
                        video.play();
                      } else {
                        video.pause();
                      }
                    }}
                    autoPlay
                    playsInline
                    muted={isMuted}
                  />
                  <IconButton
                    size="small"
                    onClick={() => {
                      const video = document.getElementById("post-video");
                      if (video && video instanceof HTMLVideoElement) {
                        video.muted = !video.muted;
                        setIsMuted(video.muted);
                      }
                    }}
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      zIndex: 2,
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    {isMuted ? (
                      <VolumeOff fontSize="small" />
                    ) : (
                      <VolumeUp fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              );
            }
            return (
              <img
                key={selectedPost.postId}
                src={src}
                className="w-full h-full object-cover"
              />
            );
          })}
        </Box>
        <Box
          sx={{
            width: 400,
            display: "flex",
            flexDirection: "column",
            bgcolor: resolvedTheme === "dark" ? "#121212" : "#fff",
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: resolvedTheme === "dark" ? "#121212" : "#fff",
              color: resolvedTheme === "dark" ? "white" : "#121212",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Link href={`/profile/${selectedPost.userId}`}>
                <Avatar
                  src={
                    selectedPost?.userImage
                      ? `${selectedPost.userImage}`
                      : `${defaultProfile.src}`
                  }
                  sx={{ width: 32, height: 32 }}
                />
              </Link>
              <Box>
                <Link href={`/profile/${selectedPost?.userId}`}>
                  <Typography variant="body2" fontWeight="bold">
                    {selectedPost?.userName}
                  </Typography>
                </Link>
                <Typography variant="caption">{t("Original audio")}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                size="small"
                variant="text"
                color="primary"
                sx={{
                  color: "#708DFF",
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                }}
                onClick={handleFollow}
              >
                {isFollowed ? t("follow") : t("unFollow")}
              </Button>
              <IconButton size="small">
                <MoreHoriz />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
            {comments.length > 0 ? (
              comments.map((elem, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Avatar
                      src={
                        selectedPost.userImage
                          ? `${API}/images/${selectedPost.userImage}`
                          : `${defaultProfile.src}`
                      }
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="body2" fontWeight="bold">
                          {elem.userName}
                        </Typography>
                        <Typography variant="body2">{elem.comment}</Typography>
                      </Box>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleLikeToComments(i)}
                    >
                      {likedComments.has(i) ? (
                        <Favorite fontSize="small" sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorder fontSize="small" />
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
                }}
              >
                <Typography color="text.secondary" align="center">
                  {t("No comments yet.")} <br />
                  {t("Start the conversation.")}
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ borderTop: "1px solid" }}>
            <Box sx={{ p: 2, pb: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={handleLike}
                    sx={{
                      color: isLiked
                        ? "red"
                        : resolvedTheme == "dark"
                          ? "white"
                          : "black",
                    }}
                  >
                    {isLiked ? (
                      <Favorite sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                  <IconButton
                    sx={{ color: resolvedTheme == "dark" ? "white" : "black" }}
                    size="small"
                  >
                    {comment}
                  </IconButton>
                  <IconButton
                    sx={{ color: resolvedTheme == "dark" ? "white" : "black" }}
                    size="small"
                  >
                    <Send />
                  </IconButton>
                </Box>
                <IconButton
                  sx={{ color: resolvedTheme == "dark" ? "white" : "black" }}
                  onClick={handleFavorite}
                  size="small"
                >
                  {isFavorited ? <Bookmark /> : <BookmarkBorder />}
                </IconButton>
              </Box>
              {selectedPost?.postLikeCount === 0 ? (
                <Typography sx={{ textAlign: "start" }} variant="body2">
                  {t("Be the first to like this!")}
                </Typography>
              ) : (
                <Typography variant="body2" fontWeight="bold">
                  {selectedPost?.postLikeCount +
                    (isLiked !== selectedPost?.postLike
                      ? isLiked
                        ? 1
                        : -1
                      : 0)}
                  <span> {t("likes")}</span>
                </Typography>
              )}
              <Typography variant="caption">
                {selectedPost?.datePublished
                  ? new Date(selectedPost.datePublished).toLocaleDateString(
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
                  if (textComment.trim() !== "") sendComment();
                }}
              >
                <TextField
                  value={textComment}
                  onChange={(e) => setTextComment(e.target.value)}
                  fullWidth
                  variant="standard"
                  placeholder={t("Add a comment...")}
                  onFocus={() => setShowEmojies(false)}
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
                        <Button type="submit" size="small" color="primary">
                          {t("Post")}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
                {showEmojis && (
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
  );
}
