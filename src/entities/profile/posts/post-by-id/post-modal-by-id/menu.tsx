import { usePosts } from "@/app/store/pages/home/posts/posts";
import { Dialog, Box, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Insert } from "./insertCode";

const itemsClass = {
  borderBottom: "1px solid #ddd",
  cursor: "pointer",
  p: 1.5,
};

function MenuPostById({
  open,
  onClose,
  onCloseModal,
  onOpenInsert,
}: {
  open: boolean;
  onClose: () => void;
  onCloseModal: () => void;
  onOpenInsert: () => void;
}) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <>
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
          >
            {t("report")}
          </Typography>
          <Typography sx={itemsClass} onClick={onClose}>{t("Go to post")}</Typography>
          <Typography sx={itemsClass}>{t("shareTo")}</Typography>
          <Typography sx={itemsClass} onClick={onClose}>{t("Copy link")}</Typography>
          <Typography
            sx={itemsClass}
            onClick={() => {
              onClose();
              onOpenInsert();
            }}
          >
            {t("Embed on website")}
          </Typography>
          <Typography sx={itemsClass} onClick={onClose}>{t("aboutThisAccount")}</Typography>
          <Typography sx={{ p: 1.5, cursor: "pointer" }} onClick={onClose}>{t("Cancel")}</Typography>
        </Box>
      </Dialog>
    </>
  );
}

export default MenuPostById;
