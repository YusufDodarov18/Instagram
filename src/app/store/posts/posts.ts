import {
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
} from "date-fns";import axiosRequest from "@/api/axiosRequest";
import { create } from "zustand";
import { PostsStore } from "@/app/(router)/types";

export const usePosts = create<PostsStore>((set,get) => ({
    posts:[],
    loading:false,
    subscribtions:[],

    getPosts: async ()=>{
        try {
            set({loading:true})
            const { data }=await axiosRequest.get(`/Post/get-posts?PageSize=4`)
            set({
                posts:data?.data,
                loading:false
            }) 
        } catch (err) {
            set({loading:false})
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
              postLikeCount: post.postLike? post.postLikeCount - 1:post.postLikeCount + 1,
            }
          :post,
      ),
    }));
  },

  addFavoritePost: async (postId) => {
    await axiosRequest.post(`/Post/add-post-favorite`,{postId});

    set((state) => ({
      posts: state.posts.map((post) =>
        post.postId === postId?{ ...post, postFavorite: !post.postFavorite }
          :post,
      ),
    }));
  },

  addComment: async ({ postId, commentText }) => {
    await axiosRequest.post(`/Post/add-comment`, {
      comment: commentText,
      postId,
    });

    set((state) => ({
      posts: state.posts.map((post) =>
        post.postId === postId
          ? {
              ...post,
              commentCount: post.commentCount + 1,
              comments: [
                ...post.comments,
                {
                  comment: commentText,
                  userName: "Вы",
                  dateCommented: new Date().toISOString(),
                },
              ],
            }
          : post,
      ),
    }));
  },

    formatShortTime: (date:Date) => {
        if (!date) return "";
        const now = new Date();
        const published=new Date(date)

        const diffMins=differenceInMinutes(now, published);
        const diffHours=differenceInHours(now, published);
        const diffDays=differenceInDays(now, published);

        if(diffMins<60) return `${diffMins}m`
        if (diffHours < 24) return `${diffHours}h`;

        return `${diffDays}d`;
    },

    getSubscribtions:async(userId)=>{
      try {
        const {data}=await axiosRequest.get(
          `/FollowingRelationShip/get-subscriptions?UserId=${userId}`
        )        

        const users=data?.data?.map(item=>item.userShortInfo.userId)||[]
        set({subscribtions:users})

        return users
      } catch (error) {
        console.error("Failed to get subscriptions:", error);
        throw error
      }
    },

    addFollowingRelationship:async(followingUserId)=>{
      try {
        await axiosRequest.post(
          `/FollowingRelationShip/add-following-relation-ship?followingUserId=${followingUserId}`
        )        
        const subscribtions=get().subscribtions
        if(!subscribtions.includes(followingUserId)){
          set({subscribtions:[...subscribtions,followingUserId]})
        }
      } catch (error) {
          console.error("Failed to follow user:", error);
      }
    }
}))