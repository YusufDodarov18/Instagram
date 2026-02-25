"use client";
import "../../../styles/animation.css";
import { useReels } from "@/app/store/reels/reels";
import { API } from "@/shared/utils/config";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useEffect, useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "next/link";
import profile from "../../../provider/images/profil-removebg-preview.png";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import {
  comment,
  DownArrow,
  messageActive,
  upArrow,
} from "@/app/provider/svg/svg";
import EmojiPicker from "emoji-picker-react";
import { useTranslation } from "react-i18next";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function page() {
  const [open, setOpen] = useState<boolean>(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [pausedStates, setPausedStates] = useState<Record<number, boolean>>({});
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState<string>("");
  const [showEmojis, setShowEmojies] = useState<boolean>(false);
  const { t } = useTranslation();
  
  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);

  const handleSend = () => {
    const postId = reels[currentVideoIndex]?.postId;

    if (text.trim() !== "" || postId) {
      addComment({ postId, commentText: text });
      setText("");
    }
  };

  const {
    getReels,
    reels,
    loading,
    likePosts,
    addFollowingRelationship,
    deleteFollowingRelationship,
    addFavoritePost,
    addComment,
  } = useReels();

  useEffect(() => {
    getReels();
  }, [getReels]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          const video = videoRef.current[index];
          if (!video) return;

          if (entry.isIntersecting) {
            setCurrentVideoIndex(index);
            video.muted = isMuted;
            video.play().catch(() => {});
            setPausedStates((prev) => ({ ...prev, [index]: false }));
          } else {
            video.pause();
            video.muted = true;
          }
        });
      },
      { threshold: 0.7 },
    );

    videoRef.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [isMuted]);

  // Функция скролла рилсов
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      // Вычисляем новый индекс, округляя до ближайшего видео
      const newIndex = Math.min(
        Math.max(Math.round(scrollTop / (containerHeight * 0.9)), 0),
        reels.length - 1,
      );
      if (newIndex !== currentVideoIndex && newIndex < reels.length) {
        setCurrentVideoIndex(newIndex);
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentVideoIndex, reels?.length]);

  const toggleMuted = () => {
    const currentVideo = videoRef.current[currentVideoIndex];
    if (!currentVideo) return;

    const newMuted = !currentVideo.muted;
    currentVideo.muted = newMuted;
    setIsMuted(newMuted);
  };

  // Функция для паузы/воспроизведения видео по клику
  const togglePause = (index: number) => {
    const video = videoRef.current[index];
    if (!video) return;

    if (video.paused) {
      video.play();
      setPausedStates((prev) => ({ ...prev, [index]: false }));
    } else {
      video.pause();
      setPausedStates((prev) => ({ ...prev, [index]: true }));
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        ref={containerRef}
        sx={{
          width: "100%",
          maxWidth: 430,
          mx: "auto",
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          py: "5vh",
        }}
      >
        {loading
          ? Array.from(new Array(3)).map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100vh",
                  scrollSnapAlign: "center",
                  scrollSnapStop: "always",
                  borderRadius: 2,
                  overflow: "hidden",
                  mb: "2vh",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height="100%"
                  sx={{ borderRadius: 2 }}
                />
              </Box>
            ))
          : reels?.map((el, i) => (
              <Box
                key={el.postId}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "98vh",
                  backgroundColor: "#000",
                  scrollSnapAlign: "center",
                  scrollSnapStop: "always",
                  borderRadius: 2,
                  overflow: "hidden",
                  mb: "2vh",
                }}
              >
                <video
                  ref={(ref) => (videoRef.current[i] = ref!)}
                  data-index={i}
                  src={`${API}/images/${el.images}`}
                  loop
                  playsInline
                  autoPlay
                  muted
                  onClick={() => togglePause(i)}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {pausedStates[i] && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                      pointerEvents: "none",
                      animation: "fadeScale 0.25s ease",
                    }}
                  >
                    <Box
                      sx={{
                        width: 90,
                        height: 90,
                        borderRadius: "50%",
                        backgroundColor: "rgba(0,0,0,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(2px)",
                      }}
                    >
                      <PlayArrowIcon
                        sx={{
                          fontSize: 52,
                          color: "#fff",
                          ml: "4px",
                        }}
                      />
                    </Box>
                  </Box>
                )}

                <IconButton
                  onClick={toggleMuted}
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    color: "#fff",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    width: 32,
                    height: 32,
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                  }}
                >
                  {isMuted ? (
                    <VolumeOffIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <VolumeUpIcon sx={{ fontSize: 20 }} />
                  )}
                </IconButton>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    left: 16,
                    right: 70,
                    color: "white",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Link href={`/profile/${el.userId}`}>
                      <Avatar
                        src={
                          el.userImage
                            ? `${API}/images/${el.userImage}`
                            : `${profile}`
                        }
                        sx={{
                          width: 32,
                          height: 32,
                          border: "1px solid rgba(255,255,255,0.2)",
                        }}
                      />
                    </Link>
                    <Link href={`/profile/${el.userId}`}>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ fontSize: "14px" }}
                      >
                        {el.userName}
                      </Typography>
                    </Link>
                    <Button
                      onClick={() =>
                        el.isSubscriber
                          ? deleteFollowingRelationship(el.userId)
                          : addFollowingRelationship(el.userId)
                      }
                      variant="contained"
                      size="small"
                      sx={{
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "8px",
                        cursor: "pointer",
                        bgcolor: "transparent",
                        fontWeight: 600,
                        minWidth: "auto",
                      }}
                    >
                      {el.isSubscriber ? t("Following") : t("Follow")}
                    </Button>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, fontSize: "15px", lineHeight: 1.3 }}
                  >
                    {el?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 1,
                      lineHeight: 1.3,
                      fontSize: "14px",
                      mb: 1.5,
                    }}
                  >
                    {el.content}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography
                      variant="caption"
                      sx={{ fontSize: "13px", opacity: 0.8 }}
                    >
                      🎵 {el.userName} • Оригинальное аудио
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    right: 12,
                    bottom: 80,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <IconButton sx={{ color: "#fff", p: 0.5 }}>
                      {el.postLike ? (
                        <FavoriteIcon
                          onClick={() => likePosts(el.postId)}
                          sx={{ fontSize: 26, color: "#ff3040" }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          onClick={() => likePosts(el.postId)}
                          sx={{ fontSize: 26 }}
                        />
                      )}
                    </IconButton>
                    <Typography
                      variant="caption"
                      sx={{ fontSize: "12px", fontWeight: 600, color: "white" }}
                    >
                      {el.postLikeCount}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <IconButton sx={{ color: "#fff", p: 0.5 }}>
                      <Box onClick={handleClickOpen} sx={{ fontSize: 26 }}>
                        {comment}
                      </Box>
                    </IconButton>
                    <Typography
                      variant="caption"
                      sx={{ fontSize: "12px", fontWeight: 600, color: "white" }}
                    >
                      {el.commentCount}
                    </Typography>
                  </Box>
                  <IconButton sx={{ color: "#fff", p: 0.5 }}>
                    <Typography sx={{ fontSize: 26 }}>
                      {messageActive}
                    </Typography>
                  </IconButton>
                  <IconButton sx={{ color: "#fff", p: 0.5 }}>
                    {el.postFavorite ? (
                      <BookmarkIcon
                        onClick={() => addFavoritePost(el.postId)}
                        sx={{ fontSize: 26 }}
                      />
                    ) : (
                      <BookmarkBorderIcon
                        onClick={() => addFavoritePost(el.postId)}
                        sx={{ fontSize: 26 }}
                      />
                    )}
                  </IconButton>
                  <IconButton sx={{ color: "#fff", p: 0.5 }}>
                    <MoreHorizIcon sx={{ fontSize: 26 }} />
                  </IconButton>
                  <Box sx={{ mt: 1 }}>
                    <Avatar
                      src={
                        el.userImage
                          ? `${API}/images/${el.userImage}`
                          : `${profile}`
                      }
                      sx={{
                        width: 28,
                        height: 28,
                        border: "2px solid rgba(255,255,255,0.3)",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
      </Box>
      <Box
        sx={{
          position: "fixed",
          backgroundColor: "background.paper",
          boxShadow: 3,
          zIndex: 1300,
          display: open ? "flex" : "none",
          flexDirection: "column",
          // Стили для мобильных устройств (xs)
          bottom: { xs: 0, sm: "auto" }, // Прилипает к низу на мобильных
          left: { xs: 0, sm: "auto" }, // Полная ширина на мобильных
          right: { xs: 0, sm: "25px" }, // Прилипает к правой стороне на десктопе
          top: { xs: "auto", sm: "10vh" }, // Отступ сверху на десктопе
          width: { xs: "100%", sm: "320px" }, // Полная ширина на мобильных, фиксированная на десктопе
          height: { xs: "70vh", sm: "70vh" }, // Выше на мобильных, фиксированная на десктопе
          borderRadius: { xs: "16px 16px 0 0", ssm: 2 }, // Закругленные верхние углы на мобильных, стандартные на десктопе
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", sm: "none" }, // Отображается только на мобильных
            justifyContent: "center",
            py: 1,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 4,
              backgroundColor: "grey.400",
              borderRadius: 2,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: "1px solid #ddd",
          }}
        >
          <IconButton onClick={handleClickClose} sx={{ ml: -1 }}>
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center", mr: 4 }}
          >
            {t("Comment")}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: "auto", px: 2, py: 1 }}>
          {reels?.[currentVideoIndex]?.comments?.length > 0 ? (
            reels?.[currentVideoIndex].comments.map((comment, i) => (
              <Box
                key={i}
                sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}
              >
                <Avatar
                  src={
                    comment?.userImage
                      ? `${API}/images/${comment?.userImage}`
                      : "/no-avatar.png"
                  }
                  alt={comment.userName}
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                      {comment?.userName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(comment.dateCommented).toLocaleDateString(
                        "ru-RU",
                        {
                          day: "numeric",
                          month: "short",
                        },
                      )}
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: 0.5 }}>{comment.comment}</Typography>
                </Box>
                <IconButton size="small" sx={{ ml: 1 }}>
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography sx={{ px: 2, py: 1 }}>
              {t("No comments yet.")}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            borderTop: "1px solid #ddd",
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
            position: "relative",
          }}
        >
          <EmojiEmotionsIcon
            onClick={() => setShowEmojies((prev) => !prev)}
            sx={{ cursor: "pointer", color: "gray" }}
          />
          <TextField
            variant="standard"
            fullWidth
            placeholder={t("Add a comment...")}
            onFocus={() => setShowEmojies(false)}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <IconButton onClick={handleSend}>
            <SendIcon />
          </IconButton>
          {showEmojis && (
            <Box
              sx={{
                position: "absolute",
                bottom: "60px",
                left: 0,
                width: "100%",
                zIndex: 10,
              }}
            >
              <EmojiPicker
                onEmojiClick={(em) => {
                  setText((prev) => prev + em.emoji);
                  setShowEmojies(false);
                }}
                searchDisabled
                skinTonesDisabled
                height={350}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 2,
          position: "fixed",
          zIndex: 9999,
          right: 16,
          top: "55%",
          transform: "translateY(-50%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#212328",
            color: "white",
            cursor: "pointer",
            borderRadius: "50%",
            width: 48,
            height: 48,
          }}
          onClick={() => {
            const container = containerRef.current;
            if (!container) return;

            const newIndex = Math.max(currentVideoIndex - 1, 0);
            setCurrentVideoIndex(newIndex);
            const videoHeight = container.clientHeight * 0.9;
            container.scrollTo({
              top: newIndex * videoHeight,
              behavior: "smooth",
            });
          }}
        >
          {upArrow}
        </Box>
        <Box
          onClick={() => {
            const container = containerRef.current;
            if (!container) return;

            const newIndex = Math.min(currentVideoIndex + 1, reels.length - 1);
            setCurrentVideoIndex(newIndex);
            const videoHeight = container.clientHeight * 0.9;
            container.scrollTo({
              top: newIndex * videoHeight,
              behavior: "smooth",
            });
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#212328",
            color: "white",
            cursor: "pointer",
            borderRadius: "50%",
            width: 48,
            height: 48,
          }}
        >
          {DownArrow}
        </Box>
      </Box>
    </Box>
  );
}
