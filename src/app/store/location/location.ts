import axiosRequest from "@/api/axiosRequest";
import { UseLocationStore } from "@/app/(router)/types";
import { create } from "zustand";

export const useLocation=create<UseLocationStore>((set,get)=>({
    data:[],
    loading:false,

    getLocations:async ()=>{
        try {
            set({loading:true})
            const {data}=await axiosRequest.get("/Location/get-Locations")
            set({loading:false, data:data.data})
        } catch (error){}
    },

    addLocation:async (formData)=>{
        try {
            set({loading:true})
            await axiosRequest.post(
                `/Location/add-Location/${formData}`
            )
            set({loading:false})
        } catch (error) {}
    },

    deleteLocation:async id=>{
        try {
            await axiosRequest.delete(
                    `/Location/delete-Location?id=${id}`
            )
        } catch (error) {
            
        }
    }
}))
