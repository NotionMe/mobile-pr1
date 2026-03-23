import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "../src/context/AuthContext";

export default function AppIndex() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/sign-in" />;
}
