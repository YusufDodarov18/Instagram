import axiosRequest from "@/api/axiosRequest";
import { CreatePostType } from "@/app/(router)/types";
import { create } from "zustand";

export const useCreatePost = create<CreatePostType>((set, get) => ({
  token: null,
  images: [],
  caption: "",
  title: "",
  loading: false,
  error: "",
  success: false,

  setToken: (newToken) => set({ token: newToken }),
  setImages: (files) => set({ images: files }),
  addImage: (file) => set((state) => ({ images: [...state.images, file] })),

  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
    })),

  setCaption: (text) => set({ caption: text }),
  setTitle: (text) => set({ title: text }),

  reset: () =>
    set({
      images: [],
      caption: "",
      title: "",
      loading: false,
      error: "",
      success: false,
    }),

  uploadPost: async () => {
    const { images, caption, title, token } = get();

    if (images.length === 0) {
      return set({ error: "Изображение обязательно" });
    }

    const authToken = token || localStorage.getItem("access_token");

    if (!authToken) {
      return set({ error: "Пользователь не авторизован" });
    }

    const formData = new FormData();

    images.forEach((img) => {
      formData.append("Images", img);
    });

    formData.append("Content", caption);
    formData.append("Title", title);

    try {
      set({ loading: true, error: "", success: false });

      await axiosRequest.post(`/Post/add-post`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      set({
        images: [],
        caption: "",
        title: "",
        loading: false,
        error: "",
        success: true,
      });
    } catch (error: any) {
      set({
        loading: false,
        error:
          error?.response?.status === 401
            ? "Неавторизованный доступ"
            : error?.response?.data?.message || "Ошибка при загрузке поста",
        success: false,
      });
    }
  },
}));
