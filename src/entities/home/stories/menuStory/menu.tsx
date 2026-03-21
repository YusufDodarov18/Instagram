import { Box, Dialog, DialogContent } from "@mui/material";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useStory } from "@/app/store/pages/home/stories/story";

export default function MenuStory({
  open,
  onClose,
  storyId,
}: {
  open: boolean;
  onClose: () => void;
  storyId?: number;
}) {
  const { deleteStory } = useStory();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const itemStyle = {
    width: "100%",
    textAlign: "center",
    padding: "14px 0",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: theme == "dark" ? "#262626" : "white",
          borderRadius: "12px",
          width: "400px",
          overflow: "hidden",
        },
      }}
    >
      <DialogContent
        sx={{
          padding: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            ...itemStyle,
            color: "#ED4956",
            fontWeight: 600,
            borderBottom: `1px solid ${
              theme === "dark" ? "rgba(255,255,255,0.1)" : "#d1d1cb"
            }`,
          }}
          onClick={async () => {
            if (storyId) {
              deleteStory(storyId);
              onClose();
            }
          }}
        >
          {storyId ? t("delete") : t("Report inappropriate content")}
        </Box>
        <Box
          sx={{
            ...itemStyle,
            color: theme == "dark" ? "#ffffff" : "",
            borderBottom: `1px solid ${
              theme === "dark" ? "rgba(255,255,255,0.1)" : "#d1d1cb"
            }`,
          }}
        >
          {t("aboutThisAccount")}
        </Box>
        <Box
          onClick={onClose}
          sx={{
            ...itemStyle,
            color: theme == "dark" ? "#ffffff" : "",
          }}
        >
          {t("Cancel")}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
