import { instagram } from "@/app/widget/icons/svg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Box, Typography } from "@mui/material";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "next-themes";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };
export default function MenuRecomendation({
  open,
  onClose,
  userName,
}: {
  open: boolean;
  onClose: () => void;
  userName: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState(userName);
  const [password, setPassword] = useState("E6@t3a.7Tw%si6Y");
  const { t } = useTranslation();
  const { theme } = useTheme();
  useEffect(() => {
    if (userName) {
      setName(userName);
    }
  }, [userName]);
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="[&>button]:hidden">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 3,
              pt: 1,
            }}
          >
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={onClose}
            />
            <Typography>{instagram}</Typography>
            <Box>
              <Input
                placeholder={t("authentication.login.login")}
                className="w-[350px] focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 outline-none shadow-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Box className="relative mt-3">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("authentication.login.password")}
                  className="h-10 w-full bg-[#fafafa] border border-gray-300 rounded-md px-3 pr-20 text-sm focus:bg-white focus:border-gray-400 focus-visible:ring-0 focus:ring-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password && (
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold cursor-pointer"
                  >
                    {showPassword ? "Скрыть" : "Показать"}
                  </span>
                )}
              </Box>
              <Box
                sx={{ display: "flex", gap: 0, mt: 2, alignItems: "center" }}
              >
                <Checkbox
                  {...label}
                  defaultChecked
                  sx={{
                    color: theme === "dark" ? "#fff" : "#000",
                    "&.Mui-checked": {
                      color: theme === "dark" ? "#fff" : "#000",
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "sans-serif", fontWeight: "700" }}
                >
                  {t("authentication.login.Save")}
                </Typography>
              </Box>
              <Button
                disabled={name === ""}
                className="w-full mt-3 cursor-pointer text-[17px] bg-[#4A5DF9] hover:bg-[#3f54f8]"
              >
                {t("authentication.login.enter")}
              </Button>
            </Box>
            <Typography
              component="p"
              sx={{
                fontFamily: "revert-layer",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                borderBottom: "2px solid transparent",
                display: "inline-block",
                "&:hover": {
                  borderBottom: "2px solid ",
                },
              }}
            >
              {t("authentication.login.forgot")}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
