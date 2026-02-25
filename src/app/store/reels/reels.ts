import axiosRequest from "@/api/axiosRequest";
import { AddCommentProps, ReelsStore } from "@/app/(router)/types";
import { create } from "zustand";

export const useReels = create<ReelsStore>((set) => ({
    reels: [],
    loading: false,

     getReels: async() =>{
            try {
                set({loading:true})
                const { data } = await axiosRequest.get(
                  `/Post/get-reels?PageSize=10000000`,
                );
                set({
                    reels:data.data,
                    loading:false
                })
            } catch (error) {
                console.error("Ошибка Сервера.",error)
                 set({ loading: false });
            }
        },
    
    likePosts:async postId=>{
        try {
            await axiosRequest.post(`/Post/like-post?postId=${postId}`)

            set((state)=>({
                reels:state.reels.map((post)=>{
                    if(post.postId===postId){
                        const isLiked=post.postLike
                        return {
                            ...post,
                            postLike:!isLiked,
                            postLikeCount:isLiked?post.postLikeCount-1:post.postLikeCount+1
                        }
                    }
                    return post
                })
            }))
        } catch (error){}
    },
    
    addFollowingRelationship:async followingUserId=>{
        try {
          await axiosRequest.post(
            `/FollowingRelationShip/add-following-relation-ship?followingUserId=${followingUserId}`
          )      

          set((state)=>({
            reels:state.reels.map(user=>{
                if(user.userId===followingUserId){
                    return {...user,isSubscriber:true}
                }
                return user
            })
          }))
        } catch (error) {}
    },

    deleteFollowingRelationship:async followingUserId=>{
        try {
            await axiosRequest.delete(`/FollowingRelationShip/delete-following-relation-ship?followingUserId=${followingUserId}`)

            set((state)=>({
                reels:state.reels.map(user=>{
                    if(user.userId===followingUserId){
                        return {...user, isSubscriber:false}
                    }
                    return user
                })
            }))
        } catch (error){}
    },

    addFavoritePost:async postId=>{
        try {
            await axiosRequest.post(`http://37.27.29.18:8003/Post/add-post-favorite`,{postId})

            set((state)=>({
                reels:state.reels.map(post=>{
                    if(post.postId==postId){
                        return {...post,postFavorite:!post.postFavorite}
                    }

                    return post
                })
            }))
        } catch (error) {
        }
    },

    addComment: async ({postId,commentText}:AddCommentProps) => {
        try {
            await axiosRequest.post(`http://37.27.29.18:8003/Post/add-comment`,{
                comment:commentText,
                postId
            })

            set((state)=>({
                reels:state.reels.map(post=>{
                    if(post.postId===postId){
                        return {
                            ...post,
                            commentCount:post.commentCount+1,
                            comments:[...(post.comments||[]), {
                                comment:commentText,
                                userName:state.currentUserName||"Вы",
                                dateCommented: new Date().toISOString(), 
                            }]
                        }
                    }

                    return post
                })
            }))

        } catch (err) {
            console.log("Ошибка при добавлении комментария", err)
        }
    }
}))