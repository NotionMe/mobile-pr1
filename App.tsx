import React, { useMemo, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationButtons } from "./src/components/NavigationButtons";
import { GARDEN_PLANTS, Plant } from "./src/data/plants";
import { AddPlantScreen } from "./src/screens/AddPlantScreen";
import { GardenScreen } from "./src/screens/GardenScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import {
  AppSettingsProvider,
  useAppSettings,
} from "./src/theme/AppSettingsContext";

type Screen = "garden" | "settings" | "addPlant";

function MainContainer() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("garden");
  const [plants, setPlants] = useState<Plant[]>(GARDEN_PLANTS);
  const { settings } = useAppSettings();

  const isDark = settings.theme === "dark";
  const paperTheme = useMemo(() => {
    const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;

    return {
      ...baseTheme,
      roundness: 10,
      colors: {
        ...baseTheme.colors,
        primary: "#3A7D44",
        secondary: "#6A994E",
        tertiary: "#A7C957",
        background: isDark ? "#101510" : "#F3F6EE",
        surface: isDark ? "#1A231A" : "#FFFFFF",
        surfaceVariant: isDark ? "#263126" : "#E8F0E1",
        onSurfaceVariant: isDark ? "#C7D5C0" : "#52604D",
        secondaryContainer: isDark ? "#2B3A2B" : "#DCECCF",
        onSecondaryContainer: isDark ? "#ECF7E8" : "#20311F",
        error: "#BA1A1A",
      },
    };
  }, [isDark]);

  const handleAddPlant = (plant: Plant) => {
    setPlants((prevPlants) => [plant, ...prevPlants]);
  };

  const handleDeletePlant = (plantId: string) => {
    setPlants((prevPlants) =>
      prevPlants.filter((plant) => plant.id !== plantId),
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "settings":
        return <SettingsScreen />;
      case "addPlant":
        return (
          <AddPlantScreen
            onAddPlant={handleAddPlant}
            onPlantAdded={() => setCurrentScreen("garden")}
          />
        );
      case "garden":
      default:
        return (
          <GardenScreen
            plants={plants}
            onDeletePlant={handleDeletePlant}
            onNavigateToAdd={() => setCurrentScreen("addPlant")}
          />
        );
    }
  };

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <SafeAreaView
          style={[
            styles.container,
            { backgroundColor: paperTheme.colors.background },
          ]}
        >
          <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

          <View style={styles.content}>{renderScreen()}</View>

          <NavigationButtons
            currentScreen={currentScreen}
            onScreenChange={setCurrentScreen}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
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
  },
  content: {
    flex: 1,
  },
});
