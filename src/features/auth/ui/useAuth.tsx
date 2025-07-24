import { useAuthStore } from "../model/auth-store";

export const useAuth = () => {
  const { user, login, logout } = useAuthStore();
  return { user, login, logout };
};
