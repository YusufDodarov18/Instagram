"use client";
import { FilterType } from "@/app/(router)/types";
import { useCreatePost } from "@/app/store/create/createPost";
import { useProfile } from "@/app/store/pages/profile/myProfile/profile";
import { API } from "@/shared/utils/config";
import getCroppedImg from "@/shared/utils/cropImage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CropIcon from "@mui/icons-material/Crop";
import FilterIcon from "@mui/icons-material/Filter";
import FlipIcon from "@mui/icons-material/Flip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const FILTERS = [
  { value: "none", label: "Normal", icon: "🟣" },
  { value: "grayscale(100%)", label: "B&W", icon: "⚫" },
  { value: "sepia(60%)", label: "Sepia", icon: "🟤" },
  { value: "brightness(150%)", label: "Bright", icon: "⚪" },
  { value: "contrast(200%)", label: "Contrast", icon: "🔳" },
  { value: "hue-rotate(90deg)", label: "Hue", icon: "🌈" },
  { value: "saturate(200%)", label: "Saturate", icon: "🎨" },
  { value: "invert(100%)", label: "Invert", icon: "🔲" },
  { value: "blur(2px)", label: "Blur", icon: "🌀" },
];

const MAX_FILE_SIZE_MB = 50; // Max file size in MB
const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime",
];

export default function CreatePostModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (value: boolean) => void;
}) {
  const {
    image,
    caption,
    setImage,
    setCaption,
    loading,
    error,
    success,
    reset,
    uploadPost,
    title,
    setTitle,
  } = useCreatePost();
  const { myProfile, getMyProfile } = useProfile();

  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState<null | string>(null);
  const [filter, setFilter] = useState<FilterType>("none");
  const [loadingLocal, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [fileError, setFileError] = useState<null | string>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef(null);
  const captionRef = useRef<null | HTMLTextAreaElement>(null);
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const validateFile = (file: File): string | null => {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      return "Unsupported file format.";
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`;
    }

    return null;
  };

  const handleFIleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];

    if (!file) return;

    const error = validateFile(file);

    if (error) {
      setFileError(error);
      return;
    }
    setFileError(null);
    const isVid = file.type.startsWith("video");
    setIsVideo(isVid);
    setImage(file);
    setCroppedImage(null);
    setFilter("none");
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);

    if (isVid) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setStep(3);
    } else {
      setStep(1);
    }
  };

  const handleCrop = async () => {
    if (!image || isVideo || !croppedAreaPixels) return;
    try {
      setLoading(true);
      const croppedBlob = await getCroppedImg(
        URL.createObjectURL(image),
        croppedAreaPixels,
        rotation,
        flipHorizontal,
        flipVertical,
      );
      setCroppedImage(croppedBlob);
      setImage(new File([croppedBlob], image.name, { type: image.type }));
      setStep(2);
    } catch (err) {
      console.log("Error cropping image:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  const applyFilterToImage = async (
    blob: Blob,
    filterString: string,
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.translate(canvas.width / 2, canvas.height / 2);
        if (flipHorizontal) ctx?.scale(-1, 1);
        if (flipVertical) ctx?.scale(1, -1);
        ctx?.translate(-canvas.width / 2, -canvas.height / 2);
        (ctx as CanvasRenderingContext2D).filter = filterString;
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((filteredBlob) => {
          if (!filteredBlob) reject(new Error("Error applying filter"));
          else resolve(filteredBlob);
        }, "image/jpeg");
      };
      img.onerror = (e: Event | string) => {
        reject(e);
      };
      img.src = URL.createObjectURL(blob);
    });
  };
  const handleUpLoad = async () => {
    if (!image) return;
    try {
      setLoading(true);

      let file = image;
      if (!isVideo && croppedImage) {
        const filterBlob = await applyFilterToImage(croppedImage, filter);
        file = new File([filterBlob], image.name, { type: image.type });
        setImage(file);
      }
      await uploadPost();
      router.push("/profile");
    } catch (e) {
      console.log("Error uploading post:", e);
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    reset();
    setStep(0);
    setVideoUrl(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleClose = () => {
    resetModal();
    onClose(false);
  };

  useEffect(() => {
    if (success) {
      resetModal();
      onClose(false);
    }
  }, [success, onClose]);

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const error = validateFile(file);
      if (error) {
        setFileError(error);
        return;
      }
      setFileError(null);
      const isVid = file.type.startsWith("video");
      setIsVideo(isVid);
      setImage(file);
      setCroppedImage(null);
      setFilter("none");
      setRotation(0);

      if (isVid) {
        const url = URL.createObjectURL(file);
        setVideoUrl(url);
        setStep(3);
      } else {
        setStep(1);
      }
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const captionText = captionRef.current;
    if (!captionText) return;
    const newText =
      caption.substring(0, captionText.selectionStart) +
      emojiData.emoji +
      caption.substring(captionText.selectionEnd);
    setCaption(newText);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          maxHeight: "90vh",
          minHeight: "70vh",
          borderRadius: 1,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 1,
          borderBottom: "1px solid #dbdbdb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {step > 0 ? (
          <IconButton onClick={() => setStep(step - 1)} disabled={loadingLocal}>
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <div style={{ width: 24 }} />
        )}
        <Typography variant="subtitle1" fontWeight={600}>
          {step === 0
            ? t("create")
            : step === 1
              ? t("crop")
              : step === 2
                ? t("Filters")
                : t("create")}
        </Typography>
        {step === 3 ? (
          <Button
            onClick={handleUpLoad}
            disabled={loading || loadingLocal}
            color="primary"
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            {loading || loadingLocal ? (
              <CircularProgress size={20} />
            ) : (
              t("share")
            )}
          </Button>
        ) : (
          <div style={{ width: 24 }} />
        )}
      </DialogTitle>
      {/* Select photo  */}
      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          flexDirection: step === 3 ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          bgcolor: theme === "dark" ? "##1f1e1d" : "#fafafa",
          ...(step === 3 && { height: "calc(90vh - 64px)" }),
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {step === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <svg
              aria-label="Icon to represent media such as images or videos"
              color="#262626"
              fill="#262626"
              height="77"
              role="img"
              viewBox="0 0 97.6 77.3"
              width="96"
            >
              <path
                d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                fill="currentColor"
              ></path>
              <path
                d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                fill="currentColor"
              ></path>
              <path
                d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                fill="currentColor"
              ></path>
            </svg>
            <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>
              {t("Drag photos and videos here")}
            </Typography>
            {fileError && (
              <Typography color="error" sx={{ mb: 2 }}>
                {fileError}
              </Typography>
            )}
            <Button
              variant="contained"
              component="label"
              sx={{
                mb: 2,
                textTransform: "none",
                bgcolor: "rgb(74, 93, 249)",
                "&:hover": { bgcolor: "rgb(74, 73, 209)" },
              }}
            >
              {t("add")}
              <input
                ref={fileInputRef}
                hidden
                accept="image/*,video/*"
                type="file"
                onChange={handleFIleChange}
              />
            </Button>
          </Box>
        )}

        {step === 1 && image && !isVideo && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              minHeight: 500,
            }}
          >
            <Cropper
              image={URL.createObjectURL(image)}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              cropShape="rect"
              showGrid={false}
              style={{ containerStyle: { height: "100%", width: "100%" } }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                px: 2,
              }}
            >
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e, z) => setZoom(z)}
                sx={{ width: "80%", color: "#fff" }}
                aria-label="Zoom"
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Tooltip title="Rotate left" arrow>
                <IconButton
                  onClick={() => setRotation(rotation - 90)}
                  sx={{ bgcolor: "rgba(0,0,0,0.5)", color: "#fff" }}
                >
                  <RotateLeftIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Rotate right" arrow>
                <IconButton
                  onClick={() => setRotation(rotation + 90)}
                  sx={{ bgcolor: "rgba(0,0,0,0.5)", color: "#fff" }}
                >
                  <RotateRightIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Flip horizontal" arrow>
                <IconButton
                  onClick={() => setFlipHorizontal(!flipHorizontal)}
                  sx={{ bgcolor: "rgba(0,0,0,0.5)", color: "#fff" }}
                >
                  <FlipIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Apply crop" arrow>
                <IconButton
                  onClick={handleCrop}
                  sx={{ bgcolor: "rgba(0,0,0,0.5)", color: "#fff" }}
                  disabled={loadingLocal}
                >
                  {loadingLocal ? (
                    <CircularProgress size={20} />
                  ) : (
                    <CropIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        )}

        {step === 2 && croppedImage && !isVideo && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              <img
                src={URL.createObjectURL(croppedImage)}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  filter: filter,
                  objectFit: "contain",
                  transform: `${flipHorizontal ? "scaleX(-1)" : ""} ${
                    flipVertical ? "scaleY(-1)" : ""
                  }`,
                }}
                alt="Filter preview"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                width: "100%",
                py: 2,
                borderTop: "1px solid #dbdbdb",
                alignItems: "center",
              }}
            >
              <FilterIcon sx={{ mx: 2, color: "#8e8e8e" }} />
              {FILTERS.map((f) => (
                <Tooltip key={f.value} title={f.label} arrow>
                  <Box
                    onClick={() => {
                      if (f?.value) {
                        setFilter(f.value as FilterType);
                      }
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mx: 1,
                      cursor: "pointer",
                      minWidth: 80,
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 30,
                        backgroundColor: "#f0f0f0",
                        borderRadius: "50%",
                        mb: 1,
                        border:
                          filter === f.value ? "2px solid #0095f6" : "none",
                      }}
                    >
                      {f.icon}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: 12,
                        color: filter === f.value ? "#0095f6" : "#8e8e8e",
                        fontWeight: filter === f.value ? 600 : 400,
                      }}
                    >
                      {f.label}
                    </Typography>
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </Box>
        )}

        {step === 3 && image && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "65%" },
                height: "100%",
                bgcolor: "#000",
              }}
            >
              {isVideo ? (
                <video
                  src={videoUrl || ""}
                  controls
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              ) : (
                <img
                  src={
                    croppedImage
                      ? URL.createObjectURL(croppedImage || null)
                      : URL.createObjectURL(image)
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    filter: filter,
                    objectFit: "contain",
                    transform: `${flipHorizontal ? "scaleX(-1)" : ""} ${
                      flipVertical ? "scaleY(-1)" : ""
                    }`,
                    cursor: "crosshair",
                  }}
                  alt="Preview"
                />
              )}
              {loadingLocal && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <CircularProgress color="inherit" />
                </Box>
              )}
            </Box>
            <Box
              sx={{
                width: { xs: "100%", sm: "35%" },
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                p: 2,
                overflowY: "auto",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Avatar
                  src={
                    myProfile?.image
                      ? `${API}/images/${myProfile.image}`
                      : "/default-avatar.jpg"
                  }
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
                <Typography fontWeight={600}>{myProfile?.userName}</Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <textarea
                  ref={captionRef}
                  className="w-[100%] h-[140px] resize-none focus:outline-0"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 0.5,
                    color: "#737373",
                    pb: 1,
                    borderBottom: "1px solid #dcdee0",
                  }}
                >
                  <Box>
                    <InsertEmoticonIcon
                      ref={emojiRef}
                      onClick={() => setShowEmoji((p) => !p)}
                      sx={{ cursor: "pointer" }}
                    />

                    <Popper
                      open={showEmoji}
                      anchorEl={emojiRef.current}
                      placement="top-end"
                      style={{ zIndex: 2000 }}
                    >
                      <ClickAwayListener
                        onClickAway={() => setShowEmoji(false)}
                      >
                        <Box>
                          <EmojiPicker onEmojiClick={onEmojiClick} />
                        </Box>
                      </ClickAwayListener>
                    </Popper>
                  </Box>
                  <Typography>{caption.length}/2,200</Typography>
                </Box>
              </Box>
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              <Box sx={{ width: "100%", ml: -1, p: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <TextField
                    placeholder={t("add_location")}
                    variant="outlined"
                    sx={inputStyle}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <LocationOnIcon sx={{ cursor: "pointer" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <TextField
                    variant="outlined"
                    sx={inputStyle}
                    placeholder={t("add_collaborators")}
                  />
                  <PersonAddAltIcon sx={{ cursor: "pointer" }} />
                </Box>
              </Box>
              <Accordion
                type="multiple"
                collapsible
                defaultValue="shipping"
                className="max-w-70"
              >
                <AccordionItem value="returns" className="pb-5">
                  <AccordionTrigger className="text-lg">
                    {t("setting.accessibility")}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-3">
                    <Typography sx={{ color: "#A8A8A8" }} variant="body2">
                      {t("accessibility_info")}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Image
                        width={50}
                        height={45}
                        src={URL.createObjectURL(image)}
                        alt="image"
                        style={{ borderRadius: 4 }}
                      />
                      <input
                        type="text"
                        placeholder={t("write_alt_text")}
                        style={{
                          width: "100%",
                          background: "transparent",
                          border: "none",
                          outline: "none",
                          borderBottom: "1px solid #2a2a2a",
                          padding: "8px 4px",
                          color: "#A8A8A8",
                          fontSize: "14px",
                        }}
                      />
                    </Box>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger className="cursor-pointer text-lg">
                    {t("advanced_settings")}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col items-center gap-3 py-3 px-2 pb-5">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      <Typography>{t("hide_likes_views")}</Typography>
                      <Switch className="scale-125 cursor-pointer" />
                    </Box>
                    <p className="text-[#6A717A] dark:text-[#A8A8A8]">
                      {t("likes_views_info")}
                      <span
                        className="text-[#708DFF] underline-0 cursor-pointer hover:underline hover:text-[#708DFF]"
                        onClick={() =>
                          router.push(
                            `https://help.instagram.com/113355287252104`,
                          )
                        }
                      >
                        {t("authentication.register.contactInfoMore")}
                      </span>
                    </p>
                  </AccordionContent>
                  <AccordionContent className="flex flex-col gap-3 py-3 px-2">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      <Typography>{t("turn_off_comments")}</Typography>
                      <Switch className="scale-125 cursor-pointer" />
                    </Box>
                    <p className="text-[#6A717A] dark:text-[#A8A8A8]">
                      {t("change_later_info")}
                    </p>
                  </AccordionContent>
                  <AccordionContent className="flex flex-col items-center gap-3 py-3 px-2">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      <Typography>{t("threads_auto_post")}</Typography>
                      <Switch className="scale-125 cursor-pointer" />
                    </Box>
                    <p className="text-[#6A717A] dark:text-[#A8A8A8]">
                      {t("threads_share_info")}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Box>
          </Box>
        )}
      </DialogContent>

      {step === 1 && (
        <DialogActions
          sx={{ justifyContent: "center", borderTop: "1px solid #dbdbdb" }}
        >
          <Button
            onClick={handleCrop}
            variant="text"
            sx={{ textTransform: "none", color: "#0095f6", fontWeight: 600 }}
            disabled={loadingLocal}
          >
            {loadingLocal ? <CircularProgress size={20} /> : t("next")}
          </Button>
        </DialogActions>
      )}

      {step === 2 && (
        <DialogActions
          sx={{ justifyContent: "center", borderTop: "1px solid #dbdbdb" }}
        >
          <Button
            onClick={() => setStep(3)}
            variant="text"
            sx={{ textTransform: "none", color: "#0095f6", fontWeight: 600 }}
          >
            {t("next")}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

const inputStyle = {
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
};
