import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { Plant } from "../../src/data/plants";
import { usePlants } from "../../src/context/PlantsContext";
import { useAppSettings } from "../../src/theme/AppSettingsContext";
import { getThemeColors } from "../../src/theme/colors";

const statusOptions: Plant["status"][] = ["Здорова", "Потребує води", "Хворіє"];

export default function AddPlantScreen() {
  const { addPlant } = usePlants();
  const { settings } = useAppSettings();
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("14");
  const [imageUrl, setImageUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Plant["status"]>("Здорова");
  const colors = getThemeColors(settings.theme);

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

    addPlant({
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
    router.push("/");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.headerText, { color: colors.text }]}>Додати нову рослину</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        Створіть елемент, який одразу з'явиться на першому екрані.
      </Text>

      <View style={[styles.formCard, { backgroundColor: colors.surface }]}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
            value={name}
            onChangeText={setName}
            placeholder="Назва, наприклад Лаванда"
            placeholderTextColor={colors.inputPlaceholder}
          />
          <Text style={[styles.helperText, { color: colors.textMuted }]}>
            Обов'язкове поле для створення нового елемента.
          </Text>

          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
            value={type}
            onChangeText={setType}
            placeholder="Тип: квітка, кущ, дерево"
            placeholderTextColor={colors.inputPlaceholder}
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholder="Вік у днях"
            placeholderTextColor={colors.inputPlaceholder}
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="Зображення (URL), необов'язково"
            placeholderTextColor={colors.inputPlaceholder}
            autoCapitalize="none"
          />

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Стан рослини</Text>
          <View style={styles.segmentedButtons}>
            {statusOptions.map((option) => {
              const isActive = option === status;

              return (
                <Pressable
                  key={option}
                  onPress={() => setStatus(option)}
                  style={[
                    styles.segmentButton,
                    { backgroundColor: colors.surfaceMuted },
                    isActive && styles.segmentButtonActive,
                    isActive && { backgroundColor: colors.accentStrong },
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentButtonText,
                      { color: colors.text },
                      isActive && styles.segmentButtonTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <TextInput
            style={[
              styles.input,
              styles.notesInput,
              { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text },
            ]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Короткий опис або план догляду"
            placeholderTextColor={colors.inputPlaceholder}
            multiline
            numberOfLines={4}
          />

          <Pressable onPress={handleSubmit} style={[styles.submitButton, { backgroundColor: colors.accentStrong }]}>
            <Text style={styles.submitButtonText}>Додати до саду</Text>
          </Pressable>
      </View>
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  formCard: {
    borderRadius: 20,
    padding: 18,
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 12,
  },
  segmentedButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  segmentButton: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  segmentButtonActive: {
    backgroundColor: "#3A7D44",
  },
  segmentButtonText: {
    fontWeight: "600",
  },
  segmentButtonTextActive: {
    color: "#FFFFFF",
  },
  notesInput: {
    marginBottom: 12,
    minHeight: 110,
    textAlignVertical: "top",
  },
  submitButton: {
    alignItems: "center",
    borderRadius: 16,
    marginTop: 12,
    paddingVertical: 14,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  bottomSpacer: {
    height: 12,
  },
  helperText: {
    marginBottom: 10,
  },
});
