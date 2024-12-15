import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface IChatStore {
  users: any[];
  isLoading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
}

export const useChatStore = create<IChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/users");
      set({ users: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
