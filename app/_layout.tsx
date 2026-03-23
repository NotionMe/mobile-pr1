import React from "react";
import { Slot } from "expo-router";
import { enableScreens } from "react-native-screens";
import { AuthProvider } from "../src/context/AuthContext";
import {
  AppSettingsProvider,
} from "../src/theme/AppSettingsContext";
import { PlantsProvider } from "../src/context/PlantsContext";

enableScreens(false);

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppSettingsProvider>
        <PlantsProvider>
          <Slot />
        </PlantsProvider>
      </AppSettingsProvider>
    </AuthProvider>
  );
}
