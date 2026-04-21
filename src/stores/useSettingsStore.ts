import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = "light" | "dark";

interface AppSettings {
  theme: Theme;
  showDetails: boolean;
  gardenerName: string;
  gardenMotto: string;
  showOnlyNeedsAttention: boolean;
  compactCards: boolean;
  sessionOnly: boolean;
}

interface SettingsState extends AppSettings {
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  setSessionOnly: (sessionOnly: boolean) => void;
}

const defaultSettings: AppSettings = {
  theme: "light",
  showDetails: true,
  gardenerName: "",
  gardenMotto: "",
  showOnlyNeedsAttention: false,
  compactCards: false,
  sessionOnly: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
      setSessionOnly: (sessionOnly) => set({ sessionOnly }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        if (state.sessionOnly) {
          return { sessionOnly: state.sessionOnly };
        }
        return {
          theme: state.theme,
          showDetails: state.showDetails,
          gardenerName: state.gardenerName,
          gardenMotto: state.gardenMotto,
          showOnlyNeedsAttention: state.showOnlyNeedsAttention,
          compactCards: state.compactCards,
          sessionOnly: state.sessionOnly,
        };
      },
    }
  )
);
