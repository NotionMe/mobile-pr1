import React, { createContext, useContext, ReactNode } from "react";
import { useSettingsStore, Theme } from "../stores/useSettingsStore";

export type { Theme };

interface AppSettings {
  theme: Theme;
  showDetails: boolean;
  gardenerName: string;
  gardenMotto: string;
  showOnlyNeedsAttention: boolean;
  compactCards: boolean;
}

interface AppSettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

const AppSettingsContext = createContext<AppSettingsContextType>({
  settings: {
    theme: "light",
    showDetails: true,
    gardenerName: "",
    gardenMotto: "",
    showOnlyNeedsAttention: false,
    compactCards: false,
  },
  updateSettings: () => {},
});

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const theme = useSettingsStore((state) => state.theme);
  const showDetails = useSettingsStore((state) => state.showDetails);
  const gardenerName = useSettingsStore((state) => state.gardenerName);
  const gardenMotto = useSettingsStore((state) => state.gardenMotto);
  const showOnlyNeedsAttention = useSettingsStore((state) => state.showOnlyNeedsAttention);
  const compactCards = useSettingsStore((state) => state.compactCards);
  const updateSettings = useSettingsStore((state) => state.updateSettings);

  const settings: AppSettings = {
    theme,
    showDetails,
    gardenerName,
    gardenMotto,
    showOnlyNeedsAttention,
    compactCards,
  };

  return (
    <AppSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => useContext(AppSettingsContext);
