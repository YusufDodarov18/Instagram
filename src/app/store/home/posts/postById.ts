// import axiosRequest from "@/api/axiosRequest";
// import { create } from "zustand";

// export const usePostById=create((set,get)=>({
//     posts:[],
//     loading:false,
    
//     getPosts:async(postId:number)=>{
//         try {
//             set({loading:true})
//             const {data}=await axiosRequest.get(
//                 `/Post/get-post-by-id?id=${postId}`
//             )            
//             set({posts:data.data,loading:false})
//         } catch (error) {
//         }
//     },
// }))