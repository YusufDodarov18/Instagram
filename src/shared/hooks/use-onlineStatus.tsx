"use client";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useTranslation } from "react-i18next";
import getToken from "@/api/token";
import { useProfileById } from "@/app/store/pages/profile/profile-by-id/profile-by-id";
import { useChats } from "@/app/store/pages/chats/chat";

const SOCKET_URL = "http://localhost:5000";
const LS_KEY = "lastSeenMap";

function loadLastSeen(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveLastSeen(userId: string, iso: string) {
  try {
    const map = loadLastSeen();
    map[userId] = iso;
    localStorage.setItem(LS_KEY, JSON.stringify(map));
  } catch {}
}

export function useOnlineStatus() {
  const { setStatus } = useChats();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const saved = loadLastSeen();
    Object.entries(saved).forEach(([userId, lastSeen]) => {
      setStatus(userId, false, lastSeen);
    });

    const myId = getToken()?.sid;
    if (!myId) return;
    if (socketRef.current?.connected) return;

    const socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("userOnline", String(myId));
      setStatus(String(myId), true, null);
    });

    socket.on(
      "onlineList",
      (
        list: { userId: string; isOnline: boolean; lastSeen: string | null }[],
      ) => {
        list.forEach(({ userId, isOnline, lastSeen }) => {
          setStatus(userId, isOnline, lastSeen);
          if (!isOnline && lastSeen) saveLastSeen(userId, lastSeen);
        });
      },
    );

    socket.on("onlineStatus", ({ userId, isOnline, lastSeen }) => {
      setStatus(String(userId), isOnline, lastSeen);
      if (!isOnline && lastSeen) saveLastSeen(String(userId), lastSeen);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);
}

export function OnlineDot({ userId }: { userId: string | number }) {
  const isOnline = useChats((s) => s.isOnline(userId));
  if (!isOnline) return null;
  return <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
}

function formatLastSeen(iso: string,t: (k: string, opts?: any) => string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 120) return t("lastSeen.minutesAgo", { count: 1 });
  if (diff < 3600) return t("lastSeen.minutesAgo", { count: Math.floor(diff / 60) });
  if (diff < 86400) return t("lastSeen.hoursAgo", { count: Math.floor(diff / 3600) });
  if (diff < 604800) return t("lastSeen.daysAgo", { count: Math.floor(diff / 86400) });
  return t("lastSeen.longAgo");
}

export function OnlineText({ userId }: { userId: string | number }) {
  const { getInfoById, info } = useProfileById();
  const { t } = useTranslation();
  const isOnline = useChats((s) => s.isOnline(userId));
  const lastSeen = useChats((s) => s.getLastSeen(userId));

  useEffect(() => {
    if (userId) {
      getInfoById(userId.toString() ?? null);
    }
  }, [getInfoById, userId]);

  if (isOnline) {
    return (
      <p className="text-xs text-green-500 mt-0.5">{t("lastSeen.online")}</p>
    );
  }

  if (lastSeen) {
    return (
      <p className="text-xs text-gray-400 mt-0.5">
        {t("lastSeen.wasOnline")} {formatLastSeen(lastSeen, t)}
      </p>
    );
  }

  return <p className="text-xs text-[#A8A8A8] opacity-60">{info?.userName}</p>;
}
