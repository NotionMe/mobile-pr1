import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, Alert } from "react-native";
import { PlantCard } from "../components/PlantCard";
import { GARDEN_PLANTS } from "../data/plants";
import { useAppSettings } from "../theme/AppSettingsContext";

export const GardenScreen = () => {
  const { settings } = useAppSettings();
  const [plants, setPlants] = useState(GARDEN_PLANTS);

  const handlePlantPress = (plantName: string) => {
    Alert.alert("Дія з рослиною", `Ви обрали: ${plantName}`);
  };

  const isDark = settings.theme === "dark";

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
      ]}
    >
      <Text
        style={[styles.headerText, isDark ? styles.textDark : styles.textLight]}
      >
        Мій Сад
      </Text>

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlantCard {...item} onPress={() => handlePlantPress(item.name)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: "#F5F5F5",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
    textAlign: "center",
  },
  textLight: {
    color: "#2E7D32",
  },
  textDark: {
    color: "#A5D6A7",
  },
  listContent: {
    paddingBottom: 24,
  },
});
