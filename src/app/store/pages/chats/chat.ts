import axiosRequest from "@/api/axiosRequest";
import { ChatsStore } from "@/app/(router)/types";
import { create } from "zustand";

export const useChats=create<ChatsStore>((set,get)=>({
    chats:[],
    loading:false,
    chatById:[],
    lastMessage:[],
    datas:[],

    getChats:async ()=>{
        try {
            set({ loading:true })
            const {data}=await axiosRequest.get("/Chat/get-chats")
            set({chats:data.data, loading:false})
        } catch (error) {
            console.log("Error",error)
            set({loading:false})
        }
    },

    getChatById:async id =>{
        try {
            set({loading:true})
            const {data}=await axiosRequest.get(`/Chat/get-chat-by-id?chatId=${id}`)
            set({chatById:data.data, loading:false})           
        } catch (error) {
            set({loading:false})
            console.error('Пользователь не найден', error)
        }
    },

    createChat:async id=>{
        try {
           const {data}= await axiosRequest.post(
                `/Chat/create-chat?receiverUserId=${id}`
            )
            get().getChats()
           return data.data
        } catch(error){}
    },

    sendMessage: async (formData)=>{
        try {
            await axiosRequest.put('/Chat/send-message',formData)
            get().getChatById(Number(formData.get('ChatId')))
        } catch (error) {
            console.error("SEND ERROR:", error)
        }
    },

    deleteMessage:async (messageId,chatId) =>{
        try {
            await axiosRequest.delete(`/Chat/delete-message?massageId=${messageId}`)
            get().getChatById(Number(chatId))
        } catch {}
    },

    deleteChat: async chatId => {
        try {
            await axiosRequest.delete(`/Chat/delete-chat?chatId=${chatId}`)
            get().getChats()
        }
        catch{}
    },

    searchUsers:async userId=>{
        try {
            const {data}=await axiosRequest.get(
                `/User/get-users?UserName=${userId}`
            )
            set({datas:data.data})
        } catch (error) {
            console.error(error)
        }
    }
}))