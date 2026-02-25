import axiosRequest from "@/api/axiosRequest";
import { ExploreStore } from "@/app/(router)/types";
import { create } from "zustand";

export const useExplore = create<ExploreStore>((set, get) => ({
  posts: [],
  comments: [],
  users: [],
  history: [],
  isOpen: false,
  loading: false,
  closeDrawer: () => set({ isOpen: false }),

  getPosts: async () => {
    try {
      const { data } = await axiosRequest.get(
        `/Post/get-posts?PageSize=100000000`,
      );
      set({ posts: data.data });
    } catch (error) {
      console.error("Ошибка Сервера.", error);
    }
  },

  likePosts: async (postId) => {
    await axiosRequest.post(`/Post/like-post?postId=${postId}`);

    set((state) => ({
      posts: state.posts.map((post) =>
        post.postId === postId
          ? {
              ...post,
              postLike: !post.postLike,
              postLikeCount: post.postLike
                ? post.postLikeCount - 1
                : post.postLikeCount + 1,
            }
          : post,
      ),
    }));
  },

  addFollowingRelationship: async (followingUserId) => {
    await axiosRequest.post(
      `/FollowingRelationShip/add-following-relation-ship?followingUserId=${followingUserId}`,
    );

    set((state) => ({
      posts: state.posts.map((user) =>
        user.userId === followingUserId
          ? { ...user, isSubscriber: true }
          : user,
      ),
    }));
    await get().getPosts();
  },

  deleteFollowingRelationship: async (followingUserId) => {
    await axiosRequest.delete(
      `/FollowingRelationShip/delete-following-relation-ship?followingUserId=${followingUserId}`,
    );

    set((state) => ({
      posts: state.posts.map((user) =>
        user.userId === followingUserId
          ? { ...user, isSubscriber: false }
          : user,
      ),
    }));
    await get().getPosts();
  },

  addFavoritePost: async (postId) => {
    await axiosRequest.post(`/Post/add-post-favorite`, { postId });

    set((state) => ({
      posts: state.posts.map((post) =>
        post.postId === postId
          ? { ...post, postFavorite: !post.postFavorite }
          : post,
      ),
    }));
  },

  addComment: async (comment) => {
    set((state) => ({ comments: [...state.comments, comment] }));
    try {
      await axiosRequest.post(`/Post/add-comment`, comment);
    } catch (error) {
      console.error(error);
    }
  },

  setInitialComment: (comment) => {
    set(() => ({ comments: comment || [] }));
  },

  searchUser: async (userName) => {
    set({ isOpen: true });
    try {
      const { data } = await axiosRequest(
        `/User/get-users?UserName=${userName}`,
      );
      set(() => ({ users: data.data, loading: false }));
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  postSearchHistory: async (id) => {
    try {
      await axiosRequest.post(
        `/User/add-user-search-history?UserSearchId=${id}`,
      );
    } catch (error) {
      console.error(error);
    }
  },

  getSearchHistory: async () => {
    set({ loading: false });
    try {
      const { data } = await axiosRequest.get(
        `/User/get-user-search-histories`,
      );
      set(() => ({ history: data.data, loading: false }));
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  deleteSearchHistory: async (id) => {
    try {
      await axiosRequest.delete(`/User/delete-user-search-history?id=${id}`);
      get().getSearchHistory();
    } catch (error) {
      console.error(error);
    }
  },

  clearSearchHistory: async () => {
    try {
      await axiosRequest.delete(`/User/delete-user-search-histories`);
      get().getSearchHistory();
    } catch (error) {
      console.error(error);
    }
  },
}));
