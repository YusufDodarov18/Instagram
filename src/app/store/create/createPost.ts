import axiosRequest from "@/api/axiosRequest";
import { CreatePostType } from "@/app/(router)/types";
import { create } from "zustand";

export const useCreatePost = create<CreatePostType>((set, get) => ({
  token: null,
  image: null,
  caption: "",
  title: "",
  loading: false,
  error: "",
  success: false,

  setToken: (newToken) => set({ token: newToken }),
  setImage: (file) => set({ image: file }),
  setCaption: (text) => set({ caption: text }),
  setTitle: (text) => set({ title: text }),

  reset: () =>
    set({
      image: null,
      caption: "",
      title: "",
      loading: false,
      error: "",
      success: false,
    }),

  uploadPost: async () => {
    const { image, caption, title, token } = get();
    if (!image) {
      return set({ error: "Изображение обязательно" });
    }
    const authToken = token || localStorage.getItem("access_token");

    if (!authToken) {
      return set({ error: "Пользователь не авторизован" });
    }

    const formData = new FormData();
    formData.append("Images", image);
    formData.append("Content", caption);
    formData.append("Title", title);

    try {
      set({ loading: true, error: "", success: false });

      await axiosRequest.post(`/Post/add-post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      set({
        image: null,
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
            ? "Неавторизованный доступ. Проверь токен."
            : error?.response?.data?.message || "Ошибка при загрузке поста",
        success: false,
      });
    }
  },
}));
