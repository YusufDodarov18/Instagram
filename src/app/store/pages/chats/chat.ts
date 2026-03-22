import axiosRequest from "@/api/axiosRequest";
import { ChatsStore } from "@/app/(router)/types";
import { create } from "zustand";

export const useChats=create<ChatsStore>((set,get)=>({
    chats:[],
    loading:false,
    chatById:[],
    datas:[],

    getChats:async ()=>{
        try {
            set({ loading:true})
            const {data} =await axiosRequest.get("/Chat/get-chats")
            
            const getLastMessage= await Promise.all(
                data.data.map(async (chat: any) => {
                    try {
                        const {data: messages}=await axiosRequest.get(
                            `/Chat/get-chat-by-id?chatId=${chat.chatId}`
                        )
                        
                        let message=messages.data.at(0)
                        let lastMsg=null

                        if (message) {
                            if (message.messageText) {
                                if(message.messageText.endsWith(".mp4")){
                                    lastMsg = "🎥 Sent a video";
                                } else if (message.messageText.endsWith(".png") || message.messageText.endsWith(".jpg")) {
                                    lastMsg = "📷 Sent a photo";
                                } else {
                                    lastMsg = message.messageText; 
                                }
                            } else if (message.file) {
                                if (Array.isArray(message.file)) {
                                    const firstFile = message.file[0];
                                    if (firstFile.endsWith(".mp4") || firstFile.endsWith(".webm")) {
                                        lastMsg = "🎥 Sent a video";
                                    } else if (firstFile.endsWith(".ogg")) {
                                        lastMsg = "🎤 Voice message";
                                    } else {
                                        lastMsg = "📷 Sent a photo";
                                    }
                                } else {
                                    if (message.file.endsWith(".mp4") || message.file.endsWith(".webm")) {
                                        lastMsg = "🎥 Sent a video";
                                    } else if (message.file.endsWith(".ogg")) {
                                        lastMsg = "🎤 Voice message";
                                    } else {
                                        lastMsg = "📷 Sent a photo";
                                    }
                                }
                            }
                        }

                        return { ...chat, lastMessage: lastMsg };
                    } catch (error) {
                        console.error("ошибка при получении последнего сообщения: ", error)
                        return { ...chat,lastMessage: null }
                    }
                })
            )
            set({chats:getLastMessage, loading:false})
        } catch (error) {
            console.error(error)
            set({loading: false })
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
            get().getChats()
        } catch (error) {
            console.error("SEND ERROR:", error)
        }
    },

    deleteMessage:async (messageId,chatId) =>{
        try {
            await axiosRequest.delete(`/Chat/delete-message?massageId=${messageId}`)
            get().getChatById(Number(chatId))
            get().getChats()
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
    },

    // getFirstMessage: async chatId=>{
    //     try {
    //         const {data}=await axiosRequest.get(`/Chat/get-chat-by-id?chatId=${chatId}`)
    //         const lastMsg=data.data.sort((a,b):any=>
    //             new Date(a.sendMessageDate).getTime() -new Date(b.sendMessageDate).getTime()
    //         ).at(0);
    //         // console.log(lastMsg)
    //         set(state=> ({
    //             chats:state.chats.map(chat=>(
    //                 chat.chatId==chatId?{...chat,lastMessage:lastMsg?.messageText||""}: chat
    //             ))
    //         }))
    //     } catch (error) {
    //         console.error("Ошибка при получении первого сообщения: ",error)
    //     }
    // }
}))