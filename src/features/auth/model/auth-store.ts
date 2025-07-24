import { api } from "@shared/api";
import { create } from "zustand";

interface AuthState {
  user: { email: string } | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await api.post("/v1/auth/login", { email, password });
      const user = await api.get("/v1/auth/me");
      set({ user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    await api.post("/v1/auth/logout", {});
    set({ user: null });
  },

  checkAuth: async () => {
    try {
      const user = await api.get("/v1/auth/me");
      set({ user });
    } catch {
      set({ user: null });
    }
  },
}));
