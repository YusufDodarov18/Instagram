"use client";
import {
  Box,
  Dialog,
  Avatar,
  Typography,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import Picker from "emoji-picker-react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { comment, menu, messageActive, stiker } from "@/app/widget/icons/svg";
import { API } from "@/shared/utils/config";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePosts } from "@/app/store/pages/home/posts/posts";
import MenuPost from "./MenuPost";

interface PostModalProps {
  open: boolean;
  post: {
    postId: number;
    userId: string;
    userName: string;
    userImage?: string | null;
    datePublished: string;
    images: string[];
    postLike: boolean;
    postLikeCount: number;
    userLikes: Array<{
      userId: string;
      userName: string;
      userPhoto?: string;
      fullname: string;
    }>;
    commentCount: number;
    comments: Array<{
      postCommentId: number;
      userId: string;
      userName: string;
      userImage: string;
      dateCommented: string;
      comment: string;
    }>;
    postView: number;
    userViews: any[];
    postFavorite: boolean;
    userFavorite: any[];
    title: string | null;
    content: string;
  };
  onClose: () => void;
}

export default function PostModal({ open, post, onClose }: PostModalProps) {
  const [newComment, setNewComment] = useState("");
  const [showEmojies, setShowEmjies] = useState(false);
  const [modal, setModal] = useState(false);
  const {
    addComment,
    getPosts,
    addFavoritePost,
    likePosts,
    deleteComment,
    addPostView,
  } = usePosts();

  const { theme } = useTheme();
  const { t } = useTranslation();
  const handleComment = async () => {
    if (!newComment.trim()) return;
    const addNewComment = {
      postId: post.postId,
      commentText: newComment,
    };
    try {
      await addComment(addNewComment);
      setNewComment("");
      await getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const file = post.images?.[0];
  const isVideo = file?.endsWith(".mp4");
  const src = `${file}`;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            height: { xs: "90vh", sm: "100vh" },
          },
        }}
      >
        <Box
          flex={1}
          bgcolor={theme == "dark" ? "black" : "white"}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {isVideo ? (
            <video
              src={`${API}/images/${src}`}
              autoPlay
              loop
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={`${API}/images/${src}`}
              alt="post"
              className="w-full h-full object-contain"
            />
          )}
        </Box>

        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          bgcolor={theme == "dark" ? "black" : "white"}
          color={theme == "dark" ? "white" : "black"}
        >
          <Box display="flex" alignItems="center" p={2}>
            <Avatar
              src={post.userImage && `${API}/images/${post.userImage}`}
              alt="profile"
            />
            <Typography ml={1} fontWeight={600}>
              {post.userName}
            </Typography>
            <IconButton
              onClick={() => {
                setModal(true);
              }}
              sx={{
                marginLeft: "auto",
                cursor: "pointer",
                color: theme == "dark" ? "white" : "black",
              }}
            >
              {menu}
            </IconButton>
          </Box>
          <Divider sx={{ bgcolor: "#333" }} />

          <Box flex={1} p={2} overflow="auto">
            {post.comments.length == 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">{t("No comments yet.")}</Typography>
                <Typography>{t("Start the conversation.")}.</Typography>
              </Box>
            ) : (
              post.comments.map((c) => (
                <Box
                  key={c.postCommentId}
                  display="flex"
                  alignItems="flex-start"
                  mb={2}
                >
                  <Link
                    className="flex items-start mb-2"
                    href={`/profile${c.userId}`}
                  >
                    <Avatar
                      src={c.userImage && `${API}/images/${c.userImage}`}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box ml={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {c.userName}
                      </Typography>
                      <Typography variant="body2">{c.comment}</Typography>
                    </Box>
                  </Link>
                </Box>
              ))
            )}
          </Box>

          <Divider sx={{ bgcolor: "#333" }} />

          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"start"}
            p={1}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <IconButton
                  onClick={async () => await likePosts(post.postId)}
                  sx={{
                    color: post.postLike
                      ? "red"
                      : theme == "dark"
                        ? "white"
                        : "black",
                  }}
                >
                  {post.postLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton sx={{ color: theme == "dark" ? "white" : "black" }}>
                  {comment}
                </IconButton>
                <IconButton sx={{ color: theme == "dark" ? "white" : "black" }}>
                  {messageActive}
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  onClick={async () => await addFavoritePost(post.postId)}
                  sx={{
                    color: theme == "dark" ? "white" : "black",
                    marginLeft: "auto",
                  }}
                >
                  {post.postFavorite ? (
                    <BookmarkIcon />
                  ) : (
                    <BookmarkBorderIcon />
                  )}
                </IconButton>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ ml: 1, mt: 1 }}>
                {new Date(post.datePublished).toLocaleDateString("tg-TJ", {
                  day: "numeric",
                  month: "long",
                })}
              </Typography>
            </Box>
          </Box>

          <Box position="relative">
            {showEmojies && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: "50px",
                  left: 0,
                  zIndex: 999,
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <Picker
                  onEmojiClick={(emojiObject) => {
                    setNewComment((prev) => prev + emojiObject.emoji);
                    setShowEmjies(false);
                  }}
                  theme={theme == "dark" ? "dark" : "light"}
                />
              </Box>
            )}
            <Box
              display="flex"
              p={1}
              alignItems="center"
              borderTop="1px solid #333"
              gap={1}
            >
              <Typography
                sx={{ ml: 1, cursor: "pointer" }}
                onClick={() => setShowEmjies(!showEmojies)}
              >
                {stiker}
              </Typography>
              <TextField
                variant="standard"
                placeholder={t("Add a comment...")}
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    color: theme == "dark" ? "white" : "black",
                    pl: 1,
                  },
                }}
              />
              <IconButton
                onClick={handleComment}
                sx={{ color: theme == "dark" ? "white" : "black" }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Dialog>

      <MenuPost
        onClose={() => setModal(false)}
        open={modal}
        onCloseModal={onClose}
        id={post.postId.toFixed()}
      />
    </>
  );
}
