import axiosRequest from "@/api/axiosRequest";
import { UseStoriesStore } from "@/app/(router)/types";
import { create } from "zustand";

export const useStory=create<UseStoriesStore>((set,get)=>({
    datas:[],
    loading:false,
    myStories:[],
    storyById:[],

    getStories:async()=>{
        try {
            set({loading:true})
            const {data}=await axiosRequest.get('/Story/get-stories')
            set({loading:false, datas:data.data})
        } catch (error) {
            set({loading:false})
        }
    },

    // getStoriesById:async userId=>{
    //     try {
    //         const {data}=await axiosRequest.get(
    //             `/Story/get-user-stories/{userId}`
    //         )
    //     } catch (error) {
    //         console.error("Пользователь не найден: ",error)
    //     }
    // }

    getMyStories: async () => {
        try {
            set({loading:true})
            const {data}=await axiosRequest.get("/Story/get-my-stories")
            set({loading:false,myStories:data.data})
        } catch (error) {
            set({loading:false})
        }
    },

    likeStory:async(storyId)=>{
        try{
            await axiosRequest.post(
                `/Story/LikeStory/?storyId=${storyId}`
            )
            set((state) => ({
                datas:state.datas.map(user=>({
                    ...user,
                    stories:user.stories.map(story=>story.id===storyId?
                        {...story,liked:!story.liked, likedCount:story.liked?story.likedCount+1:story.likedCount-1} :story
                    )
                }))
            }))
            get().getStories()
        }catch{}
    },

    getStoryById:async id=>{
        try {
            set({loading:false})
            const {data}=await axiosRequest.get(`/Story/GetStoryById?id=${id}`)
            set({loading:true,storyById:data.data})
        } catch (error) {
            set({loading:false})
        }
    },

    addStory:async (formData)=>{
        try {
            set({loading:true})
            await axiosRequest.post(`/Story/AddStories`, formData)
            set({loading:false})
        } catch{
          throw new Error("error to add stories!");
        }
    },

    addStoriesPost:async postId=>{
        try {
            set({loading:true})
            await axiosRequest.post(`/Story/AddStories?PostId=${postId}`)            
            set({loading:false})
        } catch (error) {
          console.error("Failed to add story:", error);
        }
    },

    deleteStory: async id=>{
        try {
            await axiosRequest.delete(`/Story/DeleteStory?id=${id}`)
        } catch (error) {
            console.error(error)
        }
    },

    addStoryView:async storyId=>{
        try {
            await axiosRequest.post(`/Story/add-story-view?StoryId=${storyId}`)
        } catch{}
    }
}))