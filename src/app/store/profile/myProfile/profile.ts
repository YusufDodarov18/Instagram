import axiosRequest from "@/api/axiosRequest";
import { ProfileStore } from "@/app/(router)/types";
import { API } from "@/shared/utils/config";
import { create } from "zustand";

export const useProfile = create<ProfileStore>((set, get) => ({
  myProfile: null,
  loading: false,
  myPosts: [],
  myPostSaved: [],
  myFollowers: [],
  myFollowing: [],
  myImageProfile: null,
  followingLoading: false,
  followersLoading: false,

  getMyProfile: async () => {
    set({ loading: true });
    const { data } = await axiosRequest.get(
      `${API}/UserProfile/get-my-profile`,
    );
    set({ myProfile: data.data, loading: false });
  },

  getMyPosts: async () => {
    try {
      const { data } = await axiosRequest.get(`${API}/Post/get-my-posts`);
      set({ myPosts: data });
    } catch (error) {
      console.error(error);
    }
  },

  getMyFollowers: async (userId) => {
    try {
      set({ followersLoading: true });
      const { data } = await axiosRequest.get(
        `${API}/FollowingRelationShip/get-subscribers?UserId=${userId}`,
      );
      set({ myFollowers: data.data, followersLoading: false });
    } catch (error) {
      console.error(error);
    }
  },

  getMyFollowing: async (userId) => {
    try {
      set({ followingLoading: true });
      const { data } = await axiosRequest.get(
        `${API}/FollowingRelationShip/get-subscriptions?UserId=${userId}`,
      );
      set({ myFollowing: data.data, followingLoading: false });
    } catch (error) {
      console.error(error);
    }
  },

  getMyPostSaved: async () => {
    try {
      const { data } = await axiosRequest.get(
        `${API}/UserProfile/get-post-favorites`,
      );
      set({ myPostSaved: data.data });
    } catch (error) {
      console.log(error);
    }
  },

  updateImageProfile: async (file) => {
    try {
      const formData = new FormData();
      formData.append("imageFile", file);

      const { data } = await axiosRequest.put(
        `${API}/UserProfile/update-user-image-profile`,
        formData,
      );

      set({ myImageProfile: data.data });
      get().getMyProfile()
    } catch (error) {
      console.error(error);
    }
  },

  deleteImageProfile: async () => {
    try {
      await axiosRequest.delete(`${API}/UserProfile/delete-user-image-profile`);
      set({ myImageProfile: null });
    } catch (error) {
      console.error(error);
    }
  },

  addFollowing: async (userId, sid) => {
    try {
      await axiosRequest.post(
        `${API}/FollowingRelationShip/add-following-relation-ship?followingUserId=${userId}`,
      );
      get().getMyFollowing(sid);
      get().getMyFollowers(sid);
      get().getMyProfile();
    } catch (error) {
      console.error(error);
    }
  },

  unFollowing: async (userId, sid) => {
    try {
      await axiosRequest.delete(
        `${API}/FollowingRelationShip/delete-following-relation-ship?followingUserId=${userId}`,
      );
      get().getMyFollowing(sid);
      get().getMyFollowers(sid);
      get().getMyProfile();
    } catch (error) {
      console.error(error);
    }
  },

  updateProfile:async formData=>{
    try {
      set({loading:true})
      await axiosRequest.put(`/UserProfile/update-user-profile`,formData)
      set({loading:false})
      get().getMyProfile()
    } catch (error) {
      console.error(error)
    }
  }
}));
