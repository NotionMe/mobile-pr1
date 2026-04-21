import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  token?: string;
}

interface UserState {
  currentUser: AuthUser | null;
  isLoading: boolean;
  sessionOnly: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setSessionOnly: (sessionOnly: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      isLoading: false,
      sessionOnly: false,
      setUser: (user) => set({ currentUser: user }),
      setLoading: (loading) => set({ isLoading: loading }),
      setSessionOnly: (sessionOnly) => set({ sessionOnly }),
      logout: () => set({ currentUser: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        if (state.sessionOnly) {
          return { sessionOnly: state.sessionOnly };
        }
        return {
          currentUser: state.currentUser,
          sessionOnly: state.sessionOnly,
        };
      },
    }
  )
);
