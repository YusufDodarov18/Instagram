import { NotificationType } from "@/app/(router)/types";
import { create } from "zustand";

export const useDrawerNotification = create<NotificationType>((set) => ({
  notificationDrawer: false,
  openDrawerNotification: () => set({ notificationDrawer: true }),
  closeDrawerNotification: () => set({ notificationDrawer: false }),
  toggleDrawerNotification: () => set((state) => ({ notificationDrawer: !state.notificationDrawer })),
}));
