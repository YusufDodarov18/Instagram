import axiosRequest from "@/api/axiosRequest";
import { ProfileStoreById } from "@/app/(router)/types";
import { API } from "@/shared/utils/config";
import { create } from "zustand";

export const useProfileById = create<ProfileStoreById>((set) => ({
  info: null,
  loading: false,
  loadingPost: false,
  loadingPostSaved: false,
  posts: [],
  followings: [],
  followers: [],
  followersLoading: false,
  followingLoading: false,
  chats: [],

  getInfoById: async (id) => {
    try {
      set({ loading: true });
      const { data } = await axiosRequest.get(
        `/UserProfile/get-is-follow-user-profile-by-id?followingUserId=${id}`,
      );
      set({ info: data.data, loading: false });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  },

  getPostById: async (id) => {
    try {
      set({ loadingPost: true });
      const { data } = await axiosRequest.get(
        `${API}/Post/get-posts?UserId=${id}`,
      );
      set({ posts: data.data, loadingPost: false });
    } catch (error) {
      console.error(error);
    }
  },

  getFollowersById: async (userId) => {
    try {
      set({ followersLoading: true });
      const { data } = await axiosRequest.get(
        `${API}/FollowingRelationShip/get-subscribers?UserId=${userId}`,
      );
      set({ followers: data.data, followersLoading: false });
    } catch (error) {
      console.error(error);
    }
  },

  getFollowingById: async (userId) => {
    try {
      set({ followingLoading: true });
      const { data } = await axiosRequest.get(
        `${API}/FollowingRelationShip/get-subscriptions?UserId=${userId}`,
      );
      set({ followings: data.data, followingLoading: false });
    } catch (error) {
      console.error(error);
    }
  },

  getChat: async () => {
    try {
      const { data } = await axiosRequest.get(`${API}/Chat/get-chats`);
      set({ chats: data.data });
    } catch (error) {}
  },
}));
