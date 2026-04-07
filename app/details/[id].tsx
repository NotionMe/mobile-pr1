import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import * as Calendar from "expo-calendar";
import * as ImagePicker from "expo-image-picker";
import { usePlants } from "../../src/context/PlantsContext";
import { useAppSettings } from "../../src/theme/AppSettingsContext";
import { getThemeColors } from "../../src/theme/colors";

export default function PlantDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { plants } = usePlants();
  const { settings } = useAppSettings();
  const colors = getThemeColors(settings.theme);

  const plant = plants.find((p) => p.id === id);
  const [localImage, setLocalImage] = useState<string | null>(null);

  if (!plant) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Рослину не знайдено</Text>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={{ color: colors.accentStrong }}>Повернутися</Text>
        </Pressable>
      </View>
    );
  }

  const addToCalendar = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Помилка", "Немає дозволу на доступ до календаря");
      return;
    }

    try {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCalendar = calendars.find((c) => c.isPrimary) || calendars[0];

      if (!defaultCalendar) {
        Alert.alert("Помилка", "Не знайдено жодного календаря");
        return;
      }

      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1); // Tomorrow
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later

      await Calendar.createEventAsync(defaultCalendar.id, {
        title: `Оглянути рослину: ${plant.name}`,
        notes: `Перевірити стан: ${plant.status}. Додатково: ${plant.notes}`,
        startDate,
        endDate,
        timeZone: "GMT",
      });

      Alert.alert("Успіх", "Нагадування додано до календаря!");
    } catch (error) {
      console.error(error);
      Alert.alert("Помилка", "Не вдалося додати подію до календаря");
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Помилка", "Немає дозволу на доступ до галереї");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLocalImage(result.assets[0].uri);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Здорова": return "#4CAF50";
      case "Потребує води": return "#2196F3";
      case "Хворіє": return "#F44336";
      default: return "#757575";
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: plant.name, headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.text }} />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
        <Image
          source={{ uri: localImage || plant.imageUrl }}
          style={styles.image}
        />
        
        <Pressable onPress={pickImage} style={[styles.actionButton, { backgroundColor: colors.surfaceMuted }]}>
          <Text style={[styles.buttonText, { color: colors.text }]}>Змінити фото (Галерея)</Text>
        </Pressable>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>{plant.name}</Text>
          
          <View style={styles.chipsRow}>
            <View style={[styles.infoChip, { backgroundColor: colors.surfaceMuted }]}>
              <Text style={[styles.infoChipText, { color: colors.text }]}>{plant.type}</Text>
            </View>
            <View style={[styles.infoChip, { backgroundColor: colors.surfaceMuted }]}>
              <Text style={[styles.infoChipText, { color: colors.text }]}>{plant.age} дн.</Text>
            </View>
            <View style={[styles.infoChip, { backgroundColor: statusColor(plant.status) }]}>
              <Text style={styles.statusChipText}>{plant.status}</Text>
            </View>
          </View>
          
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Опис та догляд</Text>
          <Text style={[styles.notes, { color: colors.textMuted }]}>{plant.notes}</Text>
        </View>

        <Pressable onPress={addToCalendar} style={[styles.primaryButton, { backgroundColor: colors.accentStrong }]}>
          <Text style={styles.primaryButtonText}>Нагадати про догляд (Календар)</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    marginBottom: 16,
  },
  backButton: {
    padding: 12,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 20,
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  card: {
    borderRadius: 20,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  infoChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  infoChipText: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusChipText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  notes: {
    fontSize: 16,
    lineHeight: 24,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
