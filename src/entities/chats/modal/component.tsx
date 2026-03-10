import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DecodedToken } from "@/app/(router)/types";
import { X } from "lucide-react";
import Image from "next/image";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { API } from "@/shared/utils/config";
import profile from "../../../app/(router)/(protected)/profile/profil-removebg-preview.png";
import { useChats } from "@/app/store/pages/chats/chat";

const ModalChat = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const [decode, setDecode] = useState<null | DecodedToken>(null);
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const { getChats, chats } = useChats();
  useEffect(() => {
    getChats();
  }, [getChats]);
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-sm m-0 p-0 [&>button]:hidden pt-7">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              py: "3px",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Новое сообщение
            </Typography>
            <X
              onClick={() => onClose()}
              className="w-6 h-6 absolute right-7 cursor-pointer"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              borderBottom: "1px solid #D8dfe4",
              borderTop: `1px solid #D8dfe4`,
              px: 1.5,
              py: 1,
            }}
          >
            <Typography>Кому:</Typography>
            <input
              type="text"
              placeholder="поиск..."
              className="outline-0 focus:outline-0 w-full"
            />
          </Box>
          <Typography
            variant="body2"
            sx={{ textIndent: 10, fontWeight: "bold" }}
          >
            Рекомендуемые
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              gap: 2,
              px: 2,
              overflowY: "auto",
              maxHeight: "300px",
            }}
          >
            {chats.map((chat) => (
              <Box
                key={chat.chatId}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Box>
                    <Image
                      src={
                        chat.receiveUserImage
                          ? `${API}/images/${chat.receiveUserImage}`
                          : profile.src
                      }
                      alt="image-profile"
                      width={38}
                      height={38}
                      className="rounded-full object-cover"
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      {chat.receiveUserName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {t("Online")}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <div
                    onClick={() => setChecked(!checked)}
                    className="w-10 h-10 flex items-center justify-center cursor-pointer"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${checked ? "bg-black border-black" : "bg-white border-gray-400"} border-2`}
                    >
                      {checked && <Check size={18} className="text-white" />}
                    </div>
                  </div>
                </Box>
              </Box>
            ))}
            <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#4A5DF9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "45px",
                }}
              >
                Chat
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalChat;
