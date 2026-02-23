import React from "react";
import { View, Text, Switch, StyleSheet, ScrollView } from "react-native";
import { useAppSettings } from "../theme/AppSettingsContext";

export const SettingsScreen = () => {
  const { settings, updateSettings } = useAppSettings();

  const isDark = settings.theme === "dark";

  const toggleTheme = () => {
    updateSettings({ theme: isDark ? "light" : "dark" });
  };

  const toggleDetails = () => {
    updateSettings({ showDetails: !settings.showDetails });
  };

  return (
    <ScrollView
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text
        style={[styles.headerText, isDark ? styles.textDark : styles.textLight]}
      >
        Налаштування
      </Text>

      <View
        style={[styles.settingRow, isDark ? styles.rowDark : styles.rowLight]}
      >
        <Text
          style={[
            styles.settingText,
            isDark ? styles.textDark : styles.textLight,
          ]}
        >
          Темна тема
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDark}
        />
      </View>

      <View
        style={[styles.settingRow, isDark ? styles.rowDark : styles.rowLight]}
      >
        <Text
          style={[
            styles.settingText,
            isDark ? styles.textDark : styles.textLight,
          ]}
        >
          Показувати вік рослин
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={settings.showDetails ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDetails}
          value={settings.showDetails}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
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
    marginBottom: 24,
    textAlign: "center",
  },
  textLight: {
    color: "#333",
  },
  textDark: {
    color: "#eee",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  rowLight: {
    backgroundColor: "#fff",
  },
  rowDark: {
    backgroundColor: "#2a2a2a",
  },
  settingText: {
    fontSize: 18,
  },
});
