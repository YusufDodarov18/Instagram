import axiosRequest from "@/api/axiosRequest";
import { ChatsStore } from "@/app/(router)/types";
import axios from "axios";
import { create } from "zustand";

export const useChats=create<ChatsStore>((set,get)=>({
    chats:[],
    loading:false,
    chatById:[],
    lastMessage:[],

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
            await axiosRequest.post(`/Chat/create-chat?receiverUserId=${id}`)
            get().getChats()
        } catch(error){}
    },

    sendMessage: async (formData)=>{
        try {
            await axiosRequest.post('/Chat/send-message',formData)
            get().getChatById(formData.get('ChatId'))
        } catch (error) {}
    },

    deleteMessage:async (messageId,chatId) =>{
        try {
            await axiosRequest.delete(`/Chat/delete-message?massageId=${messageId}`)
            get().getChatById(chatId)
        } catch {}
    },

    deleteChat: async chatId => {
        try {
            await axiosRequest.delete(`/Chat/delete-chat?chatId=${chatId}`)
            get().getChats()
        }
        catch{}
    },

    getLastMessages: async () => {
	    try {
	    	const chatsRes = await axiosRequest.get(
	    		'/Chat/get-chats',
	    		{
	    			headers: {
	    				Authorization: `Bearer ${localStorage.getItem('access_token')}`,
	    			},
	    		}
	    	)

	    	const chats = chatsRes.data.data
	    	const map = {}

	    	await Promise.all(
	    		chats.map(async (chat:any) => {
	    			const res = await axios.get(
	    				`http://37.27.29.18:8003/Chat/get-chat-by-id?chatId=${chat.chatId}`,
	    				{
	    					headers: {
	    						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
	    					},
	    				}
	    			)

	    			let messages = res.data.data

	    			if (messages && messages.length > 0) {
	    				messages = messages.sort(
	    					(a:any, b:any) => new Date(b.createdAt) - new Date(a.createdAt)
	    				)

	    				const lastMessage = messages[0] 
	    				map[chat.chatId] = lastMessage
	    			}
	    		})
	    	)

	    	set({ lastMessage: map })
	    } catch (error) {
	    	console.error('Ошибка при получении последних сообщений:', error)
	    }
   },

}))