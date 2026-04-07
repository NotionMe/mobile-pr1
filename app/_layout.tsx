import React from "react";
import { Slot } from "expo-router";
import { enableScreens } from "react-native-screens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../src/context/AuthContext";
import {
  AppSettingsProvider,
} from "../src/theme/AppSettingsContext";
import { PlantsProvider } from "../src/context/PlantsContext";

enableScreens(false);

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppSettingsProvider>
          <PlantsProvider>
            <Slot />
          </PlantsProvider>
        </AppSettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
