import { Box, Dialog } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import profileImg from "../../../../app/(router)/(protected)/profile/instagramDefaultProfile-removebg-preview.png";
import { API } from "@/shared/utils/config";

export type infoByid = {
  userName: string;
  image?: string;
  dateUpdated: string;
  location?: string;
};

export const MenuById = ({
  openMenu,
  onClose,
  info,
}: {
  openMenu: boolean;
  onClose: () => void;
  info: infoByid | null;
}) => {
  const { t } = useTranslation();
  const [openAbout, setOpenAbout] = useState(false);

  const handleAboutClick = () => {
    onClose();
    setTimeout(() => setOpenAbout(true), 150);
  };

  const fakeLocations: string[] = [
    "Belarus",
    "United States",
    "Germany",
    "Brazil",
    "Japan",
    "Canada",
    "Tajikistan"
  ];

  const randomLocation = () =>
    fakeLocations[Math.floor(Math.random() * fakeLocations.length)];
  return (
    <>
      {/* MENU */}
      <Dialog
        open={openMenu}
        onClose={onClose}
        PaperProps={{
          sx: {
            borderRadius: "14px",
            width: "90%",
            maxWidth: "360px",
          },
        }}
      >
        <Box display="flex" flexDirection="column">
          <Box sx={item(true)}>{t("block")}</Box>
          <Box sx={item(true)}>{t("restrict")}</Box>
          <Box sx={item(true)}>{t("report")}</Box>
          <Box sx={item()}>{t("shareTo")}</Box>
          <Box sx={item()} onClick={handleAboutClick}>{t("aboutThisAccount")}</Box>
          <Box
            sx={{
              py: 1.5,
              textAlign: "center",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            {t("cancel")}
          </Box>
        </Box>
      </Dialog>

      {/* ABOUT MODAL */}
      <Dialog
        open={openAbout}
        onClose={() => setOpenAbout(false)}
        PaperProps={{
          sx: {
            borderRadius: "14px",
            width: "90%",
            maxWidth: "360px",
          },
        }}
      >
        <Box p={3} display="flex" flexDirection="column" alignItems="center">
          <Box sx={{ fontWeight: 600, fontSize: 16, mb: 2 }}>
            {t("aboutThisAccount")}
          </Box>
          <img
            src={
              info?.image
                ? `${API}/images/${info?.image}`
                : `${profileImg?.src}`
            }
            alt="avatar"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              marginBottom: 16,
            }}
          />

          <Box sx={{ fontWeight: 600, fontSize: 16, mb: 1 }}>
            {info?.userName}
          </Box>
          <Box
            sx={{
              fontSize: 12,
              color: "#8e8e8e",
              textAlign: "center",
              mb: 2,
            }}
          >
            {t(
              "To help keep our community authentic, we’re showing information about accounts on Instagram.",
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 1,
              bgcolor: "rgba(0,0,0,0.08)",
              mb: 2,
            }}
          />
          {info?.dateUpdated && (
            <InfoRow
              icon="📅"
              label={t("dateJoined")}
              value={new Date(info.dateUpdated).toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
              })}
            />
          )}
          <InfoRow
            icon="📍"
            label={t("accountBasedIn")}
            value={info?.location || randomLocation()}
          />
          <Box
            mt={3}
            fontWeight={600}
            fontSize={14}
            sx={{ cursor: "pointer", textAlign: "center", width: "100%" }}
            onClick={() => setOpenAbout(false)}
          >
            {t("close")}
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

const item = (danger?: boolean) => ({
  py: 1.6,
  textAlign: "center",
  fontWeight: 500,
  cursor: "pointer",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  color: danger ? "#ED4956" : "inherit",
  "&:active": {
    bgcolor: "rgba(0,0,0,0.05)",
  },
});

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string | number;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 1, width: "100%" }}>
    <Box sx={{ mr: 1 }}>{icon}</Box>
    <Box>
      <Box sx={{ fontSize: 12, color: "#8e8e8e" }}>{label}</Box>
      <Box sx={{ fontSize: 14, fontWeight: 500 }}>{value}</Box>
    </Box>
  </Box>
);
