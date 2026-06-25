import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  hasRole: (...roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        if (typeof window !== "undefined") window.localStorage.setItem("ukhp_token", token);
        set({ user, token });
      },
      logout: () => {
        if (typeof window !== "undefined") window.localStorage.removeItem("ukhp_token");
        set({ user: null, token: null });
      },
      hasRole: (...roles) => !!get().user && roles.includes(get().user!.role),
    }),
    { name: "ukhp-auth" },
  ),
);
