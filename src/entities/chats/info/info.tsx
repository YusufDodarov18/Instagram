"use client";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { API } from "@/shared/utils/config";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { mute } from "@/app/widget/icons/svg";
import { useProfileById } from "@/app/store/pages/profile/profile-by-id/profile-by-id";
import { useChats } from "@/app/store/pages/chats/chat";
import profile from "./profile.png"

function DrawerInfo({
  open,
  close,
  id,
}: {
  open: boolean;
  close: () => void;
  id: string;
}) {
  const { theme } = useTheme();
  const { loading, getInfoById, info } = useProfileById();
  const { deleteChat } = useChats();
  const router = useRouter();
  const { t } = useTranslation();
  const pathName = usePathname();
  const chatId = pathName.split("/")[2];

  useEffect(() => {
    getInfoById(id);
  }, [getInfoById]);

  return (
    <Drawer anchor="right" open={open} onClose={close}>
      <Box
        sx={{
          width: 300,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: theme == "dark" ? "#212121" : "",
          color: theme === "dark" ? "white" : "",
        }}
      >
        <List sx={{ flex: 1 }}>
          <Box sx={{ px: 3, py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              {t("Information")}
            </Typography>
          </Box>
          <Box
            sx={{
              borderBottom: "1px solid #c5c6c7",
              borderTop: "1px solid #c5c6c7",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
              px: 3,
              py: 2,
            }}
          >
            {mute}
            <Typography>{t("Turn off message notifications")}</Typography>
            <SwitchBase />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 3,
              px: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "600" }}>
              {t("Participants")}
            </Typography>
            <ListItemButton
              sx={{ display: "flex", gap: 2, alignItems: "center" }}
            >
              <Box>
                <img
                  src={
                    info?.image
                      ? `${API}/images/${info.image}`
                      : profile.src
                  }
                  alt="profile"
                  onClick={() => router.push(`/profile/${id}`)}
                  className="w-14 h-14 rounded-full cursor-pointer"
                />
              </Box>
              <Box>
                <Typography
                  onClick={() => router.push(`/profile/${id}`)}
                  variant="body1"
                  sx={{ fontWeight: "600" }}
                >
                  {info?.userName}
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  {info && info?.firstName + info?.lastName}
                </Typography>
              </Box>
            </ListItemButton>
          </Box>
        </List>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderTop: "1px solid #c5c6c7",
            px: 2,
            py: 3,
          }}
        >
          <Typography
            sx={{
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {t("Nickname")}
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {t("block")}
          </Typography>
          <Typography sx={{ cursor: "pointer" }} color="error">
            {t("report")}
          </Typography>
          <Typography
            onClick={async () => await deleteChat(Number(chatId))}
            sx={{ cursor: "pointer" }}
            color="error"
          >
            {t("delete_chat")}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

const SwitchBase = styled(Switch)(() => ({
  width: 52,
  height: 30,
  padding: 0,
  display: "flex",
  "& .MuiSwitch-switchBase": {
    padding: 3,
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#2F6BFF",
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 24,
    height: 24,
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  "& .MuiSwitch-track": {
    borderRadius: 30,
    backgroundColor: "#9CA3AF",
    opacity: 1,
  },
}));

export default DrawerInfo;
