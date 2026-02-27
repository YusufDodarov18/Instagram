import { useDrawerNotification } from "@/app/store/notification/notification";
import { useUser } from "@/app/store/users/users";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import getToken from "@/api/token";

export default function Notification() {
  const {
    closeDrawerNotification,
    notificationDrawer,
    toggleDrawerNotification,
  } = useDrawerNotification();
  const { getUsers, deleteUser, users, loading } = useUser();
  const [followeds, setFolloweds] = useState([]);
  const { t } = useTranslation();
  const [decode, setDecode] = useState(null);
  const myId = getToken()?.sid;

  useEffect(() => {
    if (notificationDrawer) {
      getUsers();
    }
  }, [notificationDrawer]);

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation">
      <Box sx={{ p: 2 }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", pt: "10px" }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            {t("Notifications")}
          </Typography>
          <Box onClick={closeDrawerNotification}>
            <CloseIcon className="cursor-pointer" />
          </Box>
        </Box>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
          {t("This month")}
        </Typography>
        <List>
          {loading
            ? [...Array(5)].map((_, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Skeleton width="70%" height={16} />
                    <Skeleton width="45%" height={14} />
                  </Box>
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={30}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              ))
            : users.map((notif) => (
                <ListItem key={notif.id} disablePadding sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Link
                      href={`/profile/${notif.id}`}
                      onClick={() => closeDrawerNotification}
                    >
                      <Avatar
                        src={`https://instagram-api.softclub.tj/images/${notif?.avatar}`}
                        sx={{
                          width: 40,
                          height: 40,
                          mr: 2,
                          bgcolor: "grey.300",
                        }}
                      />
                    </Link>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ lineHeight: 1.3 }}>
                        <Link
                          href={`/profile/${notif.id}`}
                          onClick={() => closeDrawerNotification}
                        >
                          <Typography
                            component="span"
                            fontWeight="bold"
                            sx={{ fontSize: "0.875rem" }}
                          >
                            {notif.fullName}
                          </Typography>
                        </Link>
                        <br /> {t("subscribed")}(- <br /> {t("as) on yours")}{" "}
                        <br /> {t("updates.")}.
                        <Typography
                          component="span"
                          color="text.secondary"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {notif?.date || ""}
                        </Typography>
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        textTransform: "none",
                        // width: followedIds.includes(notif.id)
                        //   ? "160px"
                        //   : "175px",
                        px: 1,
                        py: 0.5,
                        fontSize: "0.75rem",
                        textAlign: "center",
                      }}
                    >
                      {/* {followedIds.includes(notif.id)
                          ? "Подписки"
                          : "Подписаться в ответ"} */}
                      {t("Subscribe in response")}
                    </Button>
                  </Box>
                </ListItem>
              ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      open={notificationDrawer}
      onClose={toggleDrawerNotification}
      anchor="left"
      PaperProps={{
        sx: {
          left: "43px",
          width: "420px",
          top: 0,
          height: "100vh",
          position: "fixed",
          boxShadow: 3,
        },
      }}
      ModalProps={{
        keepMounted: true,
        BackdropProps: {
          sx: {
            backgroundColor: "transparent",
          },
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
}
// rgb(74, 93, 249)
