import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  HelperText,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Plant } from "../data/plants";
import { useAppSettings } from "../theme/AppSettingsContext";

interface AddPlantScreenProps {
  onAddPlant: (plant: Plant) => void;
  onPlantAdded: () => void;
}

const statusOptions: Plant["status"][] = ["Здорова", "Потребує води", "Хворіє"];

export const AddPlantScreen = ({
  onAddPlant,
  onPlantAdded,
}: AddPlantScreenProps) => {
  const { settings } = useAppSettings();
  const theme = useTheme();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("14");
  const [imageUrl, setImageUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Plant["status"]>("Здорова");

  const isDark = settings.theme === "dark";

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const trimmedType = type.trim();

    if (!trimmedName || !trimmedType) {
      Alert.alert("Не вистачає даних", "Вкажіть назву та тип рослини.");
      return;
    }

    const parsedAge = Number.parseInt(age, 10);
    const safeAge = Number.isNaN(parsedAge) || parsedAge <= 0 ? 1 : parsedAge;
    const safeNotes =
      notes.trim() ||
      "Нова рослина додана вручну. План догляду ще не заповнено.";
    const safeImageUrl =
      imageUrl.trim() ||
      `https://picsum.photos/seed/${encodeURIComponent(trimmedName.toLowerCase())}/200/200`;

    onAddPlant({
      id: `plant-${Date.now()}`,
      name: trimmedName,
      type: trimmedType,
      imageUrl: safeImageUrl,
      status,
      age: safeAge,
      notes: safeNotes,
    });

    setName("");
    setType("");
    setAge("14");
    setImageUrl("");
    setNotes("");
    setStatus("Здорова");
    onPlantAdded();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text variant="headlineMedium" style={styles.headerText}>
        Додати нову рослину
      </Text>
      <Text
        variant="bodyLarge"
        style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
      >
        Створіть елемент, який одразу з'явиться на першому екрані.
      </Text>

      <Card mode="elevated" style={styles.formCard}>
        <Card.Content>
        <TextInput
          mode="outlined"
          label="Назва"
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Наприклад, Лаванда"
        />
        <HelperText type="info">Обов'язкове поле для створення нового елемента.</HelperText>

        <TextInput
          mode="outlined"
          label="Тип"
          style={styles.input}
          value={type}
          onChangeText={setType}
          placeholder="Квітка, кущ, дерево"
        />

        <TextInput
          mode="outlined"
          label="Вік у днях"
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="14"
        />

        <TextInput
          mode="outlined"
          label="Зображення (URL)"
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="Необов'язково"
          autoCapitalize="none"
        />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Стан рослини
        </Text>
        <SegmentedButtons
          value={status}
          onValueChange={(value) => setStatus(value as Plant["status"])}
          buttons={statusOptions.map((option) => ({
            value: option,
            label: option,
          }))}
          style={styles.segmentedButtons}
        />

        <TextInput
          mode="outlined"
          label="Додаткова інформація"
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Короткий опис або план догляду"
          multiline
          numberOfLines={4}
        />

        <Button
          mode="contained"
          icon="plus"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Додати до саду
        </Button>
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
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  formCard: {
    borderRadius: 20,
  },
  input: {
    marginBottom: 8,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 12,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  notesInput: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 12,
  },
});
