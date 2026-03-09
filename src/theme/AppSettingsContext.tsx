import React, { createContext, useState, useContext, ReactNode } from "react";

export type Theme = "light" | "dark";

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

const defaultSettings: AppSettings = {
  theme: "light",
  showDetails: true,
  gardenerName: "",
  gardenMotto: "",
  showOnlyNeedsAttention: false,
  compactCards: false,
};

const AppSettingsContext = createContext<AppSettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
});

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AppSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => useContext(AppSettingsContext);
