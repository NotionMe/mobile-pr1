import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import {
  AppSettingsProvider,
  useAppSettings,
} from "./src/theme/AppSettingsContext";
import { GardenScreen } from "./src/screens/GardenScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import { NavigationButtons } from "./src/components/NavigationButtons";

type Screen = "garden" | "settings";

function MainContainer() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("garden");
  const { settings } = useAppSettings();

  const isDark = settings.theme === "dark";

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
      ]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <View style={styles.content}>
        {currentScreen === "garden" ? <GardenScreen /> : <SettingsScreen />}
      </View>

      <NavigationButtons
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
        isDark={isDark}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AppSettingsProvider>
      <MainContainer />
    </AppSettingsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  containerLight: {
    backgroundColor: "#F5F5F5",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  content: {
    flex: 1,
  },
});
