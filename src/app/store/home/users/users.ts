import axiosRequest from "@/api/axiosRequest";
import { getUsersType } from "@/app/(router)/types";
import { create } from "zustand";

export const useUser = create<getUsersType>((set, get) => ({
  users: [],
  loading: false,
  subscribers: [],

  getUsers: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosRequest.get(`/User/get-users?PageSize=${10}`);
      set(() => ({ users: data.data, loading: false }));
    } catch (error) {
      console.error(error);
    }
  },

  deleteUser: async (userId) => {
    try {
      await axiosRequest.delete(`/User/delete-user?userId=${userId}`);
    } catch (error) {
      console.log(error);
    }
  },

  getSubscribers: async (userId) => {
    try {
      set({ loading: true });
      const { data } = await axiosRequest.get(
        `/FollowingRelationShip/get-subscribers?UserId=${userId}`,
      );
      set({ loading: false, subscribers: data.data });
    } catch (error) {
      console.error(error);
    }
  },

  addFollowing: async (followingUserId) => {
    try {
      await axiosRequest.post(
        `/FollowingRelationShip/add-following-relation-ship?followingUserId=${followingUserId}`,
      );
      set((state) => ({
        subscribers: [
          ...state.subscribers,
          { userShortInfo: { userId: followingUserId } },
        ],
      }));
    } catch (error) {
      console.error(error);
      // throw new Error("Error to follow by user!");
    }
  },

  unFollowing: async (followingUserId) => {
    try {
      await axiosRequest.delete(
        `/FollowingRelationShip/delete-following-relation-ship?followingUserId=${followingUserId}`,
      );
      set((state) => ({
        subscribers: state.subscribers.filter(
          (user) => user.userShortInfo.userId !== followingUserId,
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
