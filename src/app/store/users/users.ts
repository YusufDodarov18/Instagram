import axiosRequest from "@/api/axiosRequest";
import { getUsersType } from "@/app/(router)/types";
import { create } from "zustand";

export const useUser = create<getUsersType>((set) => ({
  users: [],
  loading: false,

  getUsers: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosRequest.get(`/User/get-users?PageSize=${10}`);
      set(() => ({ users: data.data, loading: false }));
    } catch (error) {
      console.error(error);
    }
  },

  deleteUser: async (userId) => {
    try {
      await axiosRequest.delete(`/User/delete-user?userId=${userId}`);
    } catch (error) {
      console.log(error);
    }
  },
}));
