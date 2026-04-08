import axiosRequest from "@/api/axiosRequest";
import { getUsersType } from "@/app/(router)/types";
import { create } from "zustand";

export const useUser = create<getUsersType>((set, get) => ({
  users: [],
  loading: false,
  subscribers: [],
  subscriptions: [],

  getUsers: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosRequest.get(`/User/get-users?PageSize=${10}`);
      set({ users: data.data, loading: false });
    } catch (error) {
      console.error(error);
    }
  },

  getSubscribers: async (userId) => {
    try {
      const { data } = await axiosRequest.get(
        `/FollowingRelationShip/get-subscribers?UserId=${userId}`,
      );
      set({ subscribers: data.data });
    } catch (error) {
      console.error(error);
    }
  },

  getSubscriptions: async (userId) => {
    try {
      const { data } = await axiosRequest.get(
        `/FollowingRelationShip/get-subscriptions?UserId=${userId}`,
      );
      set({ subscriptions: data.data });
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
        subscriptions: [
          ...state.subscriptions,
          { id: Date.now(), userShortInfo: { userId: followingUserId } },
        ],
      }));
    } catch (error) {
      console.error(error);
    }
  },

  unFollowing: async (followingUserId) => {
    try {
      await axiosRequest.delete(
        `/FollowingRelationShip/delete-following-relation-ship?followingUserId=${followingUserId}`,
      );
      set((state) => ({
        subscriptions: state.subscriptions.filter(
          (user) => user.userShortInfo.userId !== followingUserId,
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  deleteUser: async (userId) => {
    try {
      await axiosRequest.delete(`/User/delete-user?userId=${userId}`);
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
  },
}));
