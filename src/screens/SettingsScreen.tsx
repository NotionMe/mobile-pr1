import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Card,
  Checkbox,
  Divider,
  List,
  Switch,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useAppSettings } from "../theme/AppSettingsContext";

export const SettingsScreen = () => {
  const { settings, updateSettings } = useAppSettings();
  const theme = useTheme();
  const isDark = settings.theme === "dark";

  const toggleTheme = () => {
    updateSettings({ theme: isDark ? "light" : "dark" });
  };

  const toggleDetails = () => {
    updateSettings({ showDetails: !settings.showDetails });
  };

  const toggleAttentionFilter = () => {
    updateSettings({
      showOnlyNeedsAttention: !settings.showOnlyNeedsAttention,
    });
  };

  const toggleCompactCards = () => {
    updateSettings({ compactCards: !settings.compactCards });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text variant="headlineMedium" style={styles.headerText}>
        Налаштування
      </Text>

      <Card mode="elevated" style={styles.card}>
        <List.Item
          title="Темна тема"
          description="Перемикає світле та темне оформлення"
          right={() => <Switch value={isDark} onValueChange={toggleTheme} />}
        />
        <Divider />
        <List.Item
          title="Показувати вік рослин"
          description="Відображати додаткову інформацію на картках"
          right={() => (
            <Switch value={settings.showDetails} onValueChange={toggleDetails} />
          )}
        />
        <Divider />
        <List.Item
          title="Лише рослини, що потребують уваги"
          description="Приховує здорові рослини на першому екрані"
          right={() => (
            <Switch
              value={settings.showOnlyNeedsAttention}
              onValueChange={toggleAttentionFilter}
            />
          )}
        />
        <Divider />
        <Checkbox.Item
          label="Компактний вигляд карток на першому екрані"
          status={settings.compactCards ? "checked" : "unchecked"}
          onPress={toggleCompactCards}
        />
      </Card>

      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Персоналізація саду
          </Text>
          <TextInput
            mode="outlined"
            label="Ім'я садівника"
            placeholder="Наприклад, Олена"
            value={settings.gardenerName}
            onChangeText={(gardenerName) => updateSettings({ gardenerName })}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Девіз саду"
            placeholder="Короткий підпис для головного екрану"
            value={settings.gardenMotto}
            onChangeText={(gardenMotto) => updateSettings({ gardenMotto })}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  headerText: {
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
});
