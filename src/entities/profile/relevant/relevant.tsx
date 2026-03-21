import { Input } from "@/components/ui/input";
import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export const Modal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          p: 0,
          m: 0,
          bgcolor: theme == "dark" ? "#212328" : "",
          color: theme == "dark" ? "white" : "",
          width: "500px",
        }}
      >
        <Box
          sx={{
            borderBottom: `1px solid ${theme === "dark" ? "#2b2a2a" : ""}`,
            py: 2,
            px: 2,
            display: "flex",
            gap: 3,
            alignItems: "center",
          }}
        >
          <X
            className="w-8 h-8 dark:text-white duration-150 hover:scale-120 cursor-pointer"
            onClick={onClose}
          />
          <Typography
            variant="body2"
            sx={{ textAlign: "center", flex: 1, fontSize: 19, mt: 1, mr: 3 }}
          >
            {t("Creating a relevant")}
          </Typography>
        </Box>
        <Box sx={{ height: "40%", width: "100%", py: 3, px: 3 }}>
          <Input
            placeholder={t("The title is relevant")}
            className="shadow-none focus:shadow-none h-[38px] focus:outline-none"
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignContentL: "center",
            borderTop: `1px solid ${theme === "dark" ? "#2b2a2a" : ""}`,
            py: 2,
            cursor: "pointer",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#4A5DF9", fontWeight: 600 }}
          >
            {t("next")}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
