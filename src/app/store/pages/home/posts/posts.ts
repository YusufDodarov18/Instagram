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
            const { data }=await axiosRequest.get(`/Post/get-posts?PageSize=80`)
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

  addComment: async ({postId, commentText }) => {
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
    // get().getPostsById(postId)
  },

  deleteComment: async commentId=>{
     try {
        await axiosRequest.delete(`/Post/delete-comment?commentId=${commentId}`)
 
        set((state)=>({
          posts:state.posts.map(post=>({
              ...post,
              comments:post.comments.filter(comment=>comment.postCommentId!== Number(commentId)),
              commentCount:post.comments?.length? post.comments.length-1 :0
          }))
        }))
     } catch (error) {
        console.error("Ошибка при удалении комментария:", error)
     }
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
    },

    addPostView:async postId=>{
      try {
        await axiosRequest.post(`/Post/view-post?postid=${postId}`)
      } catch (error) {
        console.error(error)
      }
    },
    

    // getPostsById:async postId=>{
    //   try {
    //     await axiosRequest.get(`/Post/get-post-by-id?id=${postId}`)
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
    
    deletePost:async id=>{
      try {
        await axiosRequest.delete(`/Post/delete-post?id=${id}`)
        get().getPosts()
      } catch (error) {
        console.error(error)
      }
    }
}))