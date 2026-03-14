import axiosRequest from "@/api/axiosRequest";
import { PostByIdStore } from "@/app/(router)/types";
import { create } from "zustand";

export const usePostById = create<PostByIdStore>((set, get) => ({
  datas: [],
  loading: false,
  dataById: null,

  getPosts: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosRequest.get(
        `/Post/get-posts?PageSize=${400}`,
      );
      set({ datas: data.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  getPostById: async (postId) => {
    try {
      set({ loading: true });
      const { data } = await axiosRequest.get(
        `/Post/get-post-by-id?id=${postId}`,
      );
      set({ dataById: data.data, loading: false });
    } catch (error) {
      console.error(error);
    }
  },

  likePost: async (postId) => {
    try {
      await axiosRequest.post(`/Post/like-post?postId=${postId}`);
      set((state) => ({
        datas: state.datas.map((post) =>
          post.postId === postId
            ? {
                ...post,
                postLike: !post.postLike,
                postLikeCount: post.postLike
                  ? post.postLikeCount + 1
                  : post.postLikeCount - 1,
              }
            : post,
        ),
      }));
      get().getPostById(postId);
    } catch (error) {
      console.error(error);
    }
  },

  addFavoritePost: async (postId) => {
    try {
      await axiosRequest.post(`/Post/add-post-favorite`, { postId });

      set((state) => ({
        datas: state.datas.map((post) =>
          post.postId === postId
            ? { ...post, postFavorite: !post.postFavorite }
            : post,
        ),
      }));
      get().getPostById(postId);
    } catch (error) {
      console.error(error);
    }
  },

  addCommentPost: async (formData) => {
    try {
      await axiosRequest.post(`/Post/add-comment`, {
        comment: formData.commentText,
        postId: formData.postId,
      });
      get().getPostById(formData.postId);
    } catch (error) {
      console.error(error);
    }
  },

  deleteComment: async (commentId, postId) => {
    await axiosRequest.delete(`/Post/delete-comment?commentId=${commentId}`);
    get().getPostById(postId);
  },

  follow: async (userId, postId) => {
    try {
      await axiosRequest.post(
        `/FollowingRelationShip/add-following-relation-ship?followingUserId=${userId}`,
      );
      get().getPostById(postId);
    } catch (error) {
      console.error(error);
    }
  },

  unFollow: async (userId, postId) => {
    await axiosRequest.delete(
      `/FollowingRelationShip/delete-following-relation-ship?followingUserId=${userId}`,
    );
    get().getPostById(postId);
  },
}));
