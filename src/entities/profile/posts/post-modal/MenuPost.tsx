import { usePosts } from "@/app/store/pages/home/posts/posts";
import { Dialog, Box, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";
import { useTranslation } from "react-i18next";

const itemsClass = {
  borderBottom: "1px solid #ddd",
  cursor: "pointer",
  p: 1.5,
};

function MenuPost({
  open,
  onClose,
  onCloseModal,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
  onCloseModal: () => void;
}) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { deletePost } = usePosts();
  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          backgroundColor: theme === "dark" ? "#161616" : "",
          color: theme === "dark" ? "white" : "",
        }}
      >
        <Typography
          sx={{
            p: 1.5,
            color: "red",
            fontWeight: 700,
            borderBottom: "1px solid #ddd",
            cursor: "pointer",
          }}
          onClick={async () => {
            if (!id) return;
            await deletePost(id);
            onClose();
            onCloseModal();
          }}
        >
          {t("delete")}
        </Typography>

        <Typography sx={itemsClass}>{t("Edit")}</Typography>

        <Typography sx={itemsClass}>{t("hideLikeCount")}</Typography>

        <Typography sx={itemsClass}>{t("disableComments")}</Typography>

        <Typography sx={itemsClass}>{t("Go to post")}</Typography>

        <Typography sx={itemsClass}>{t("shareTo")}</Typography>

        <Typography sx={itemsClass}>{t("Copy link")}</Typography>

        <Typography sx={itemsClass}>{t("Embed on website")}</Typography>

        <Typography sx={itemsClass}>{t("aboutThisAccount")}</Typography>

        <Typography sx={{ p: 1.5, cursor: "pointer" }} onClick={onClose}>
          {t("Cancel")}
        </Typography>
      </Box>
    </Dialog>
  );
}

export default MenuPost;
