import axiosRequest from "@/api/axiosRequest";
import { DrawerStoreType } from "@/app/(router)/types";
import { create } from "zustand";

export const useDrawerStore=create<DrawerStoreType>((set,get)=>({
    datas:[],
    history:[],
    isOpen:false,
    loading:false,
    openDrawer: ()=>set({isOpen:true}),
    closeDrawer: ()=>set({isOpen:false}),
    toggleDrawer:()=>set(state=>({isOpen:!state.isOpen})),

    searchUser:async user=> {
        set({isOpen:true})
        try {
            const {data}= await axiosRequest(
                `/User/get-users?UserName=${user !== '' ? user : ''}`
            )
            set(()=>({datas:data.data,loading:false}))
        } catch (error) {
            console.error(error)
            set({loading:false})
        }
    },

    postSearchHistory: async id=> {
        try {
            await axiosRequest.post(
                `/User/add-user-search-history?UserSearchId=${id}`
            )
        } catch (error) {
            console.error(error)
        }
    },

    getSearchHistory:async()=> {
		set({ loading: true })
        try {
            const {data}=await axiosRequest.get(`/User/get-user-search-histories`)   
            set(()=>({history: data.data, loading:false}))         
        } catch (error) {
			set({ loading: false })
        }
    },

    deleteSearchHistory: async id =>{
        try {
            await axiosRequest.delete(`/User/delete-user-search-history?id=${id}`)
            get().getSearchHistory()
        } catch (error){}
    },

    clearSearchHistory: async () => {
        try {
            await axiosRequest.delete(`/User/delete-user-search-histories`)
			get().getSearchHistory()
        } catch (error) {
        }
    }
    
}))