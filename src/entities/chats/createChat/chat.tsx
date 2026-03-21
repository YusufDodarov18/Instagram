"use client";
import { useChats } from "@/app/store/pages/chats/chat";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Box, Button, Typography } from "@mui/material";
import { Check, X } from "lucide-react";
import Image from "next/image";
import profile from "../../../app/(router)/(protected)/profile/profil-removebg-preview.png";
import { API } from "@/shared/utils/config";

function CreateChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { getChats, chats, searchUsers, datas, createChat } = useChats();
  const { t } = useTranslation();
  const [select, setSelect] = useState<null | string>(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    getChats();
  }, [getChats]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    searchUsers(e.target.value);
  };

  const handleSelect = (id: string) => {
    if (select == id) {
      setSelect(null);
    } else {
      setSelect(id);
    }
  };

  const createNewChat = async () => {
    if (select) {
      const newChat = await createChat(select);
      if (newChat) {
        router.push(`/chats/${newChat}`);
        setSelect(null);
        onClose();
      }
    }
  };
  return (
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
            {t("New_Message")}
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
          <Typography>{t("To whom")}:</Typography>
          <input
            type="text"
            placeholder={t("search1")}
            className="outline-0 focus:outline-0 w-full"
            value={search}
            onChange={handleChange}
          />
        </Box>
        <Typography variant="body2" sx={{ textIndent: 10, fontWeight: "bold" }}>
          {t("Recommended")}
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
          {search.trim() ? (
            datas.length > 0 ? (
              datas.slice(0, 4).map((user) => (
                <Box
                  key={user.id}
                  onClick={() => handleSelect(user.id)}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Box>
                      <Image
                        src={
                          user.avatar
                            ? `${API}/images/${user.avatar}`
                            : profile.src
                        }
                        alt="image-profile"
                        width={38}
                        height={38}
                        className="rounded-full object-cover"
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1">{user.userName}</Typography>
                      <Typography variant="body2" sx={{ color: "gray" }}>
                        {user.fullName}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <div className="w-10 h-10 flex items-center justify-center cursor-pointer">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200  border-2 ${select == user.id ? "bg-black border-black" : "bg-white border-gray-400"}`}
                      >
                        {select === user.id && (
                          <Check size={18} className="text-white" />
                        )}
                      </div>
                    </div>
                  </Box>
                </Box>
              ))
            ) : (
              <Box>
                <Typography>{t("No accounts found.")}</Typography>
              </Box>
            )
          ) : (
            chats.map((chat) => (
              <Box
                key={chat.chatId}
                onClick={() => handleSelect(chat.receiveUserId)}
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
                  <div className="w-10 h-10 flex items-center justify-center cursor-pointer">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200  border-2  ${select == chat.receiveUserId ? "bg-black border-black" : "bg-white border-gray-400"}`}
                    >
                      {select === chat.receiveUserId && (
                        <Check size={18} className="text-white" />
                      )}
                    </div>
                  </div>
                </Box>
              </Box>
            ))
          )}
          <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
            <Button
              fullWidth
              disabled={select === null}
              variant="contained"
              onClick={createNewChat}
              sx={{
                bgcolor: "#4A5DF9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "45px",
                "&.Mui-disabled": {
                  bgcolor: "#8895f7",
                  color: "#fff",
                  opacity: 0.7,
                },
              }}
            >
              {t("chat")}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChat;
