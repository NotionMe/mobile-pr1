import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PlantCard } from "../../src/components/PlantCard";
import { Plant } from "../../src/data/plants";
import { useAppSettings } from "../../src/theme/AppSettingsContext";
import { usePlants } from "../../src/context/PlantsContext";
import { getThemeColors } from "../../src/theme/colors";

export default function GardenScreen() {
  const { settings } = useAppSettings();
  const { plants, deletePlant } = usePlants();
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const colors = getThemeColors(settings.theme);

  const visiblePlants = useMemo(() => {
    if (!settings.showOnlyNeedsAttention) {
      return plants;
    }

    return plants.filter((plant) => plant.status !== "Здорова");
  }, [plants, settings.showOnlyNeedsAttention]);

  const handlePlantPress = (plant: Plant) => {
    setSelectedPlant(plant);
  };

  const handleDeletePress = (plant: Plant) => {
    Alert.alert(
      "Видалити рослину",
      `Ви дійсно хочете видалити ${plant.name}?`,
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          style: "destructive",
          onPress: () => {
            if (selectedPlant?.id === plant.id) {
              setSelectedPlant(null);
            }
            deletePlant(plant.id);
          },
        },
      ],
    );
  };

  const gardenerTitle = settings.gardenerName.trim()
    ? `Садівник: ${settings.gardenerName.trim()}`
    : "Ваші рослини під контролем";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={visiblePlants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlantCard
            {...item}
            compact={settings.compactCards}
            onPress={() => handlePlantPress(item)}
            onDelete={() => handleDeletePress(item)}
          />
        )}
        ListHeaderComponent={
          <View>
            <Text style={[styles.headerText, { color: colors.text }]}>Мій Сад</Text>

            <View style={[styles.banner, { backgroundColor: colors.accent }]}>
              <Text style={[styles.bannerTitle, { color: colors.text }]}>{gardenerTitle}</Text>
              {settings.gardenMotto.trim() ? (
                <Text style={[styles.bannerSubtitle, { color: colors.textMuted }]}>
                  {settings.gardenMotto.trim()}
                </Text>
              ) : null}
            </View>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={[styles.emptyCard, { backgroundColor: colors.surfaceMuted }]}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              Немає рослин для поточного фільтра. Додайте нову або змініть
              налаштування.
            </Text>
          </View>
        }
      />

      <Modal
        visible={selectedPlant !== null}
        animationType="fade"
        transparent
        onRequestClose={() => setSelectedPlant(null)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          {selectedPlant ? (
            <View style={[styles.modalCard, { backgroundColor: colors.surface }]}>
              <View style={styles.modalContent}>
                <Image
                  source={{ uri: selectedPlant.imageUrl }}
                  style={styles.modalImage}
                />
                <Text style={[styles.modalTitle, { color: colors.text }]}>{selectedPlant.name}</Text>
                <View style={styles.chipsRow}>
                  <View style={[styles.infoChip, { backgroundColor: colors.surfaceMuted }]}>
                    <Text style={[styles.infoChipText, { color: colors.text }]}>{selectedPlant.type}</Text>
                  </View>
                  <View style={[styles.infoChip, { backgroundColor: colors.surfaceMuted }]}>
                    <Text style={[styles.infoChipText, { color: colors.text }]}>{selectedPlant.age} дн.</Text>
                  </View>
                  <View
                    style={[
                      styles.infoChip,
                      { backgroundColor: statusColor(selectedPlant.status) },
                    ]}
                  >
                    <Text style={styles.statusChipText}>{selectedPlant.status}</Text>
                  </View>
                </View>
                <Text style={[styles.modalNotes, { color: colors.textMuted }]}>{selectedPlant.notes}</Text>
              </View>
              <View style={styles.modalActions}>
                <Pressable
                  onPress={() => setSelectedPlant(null)}
                  style={[styles.actionButton, styles.secondaryButton, { backgroundColor: colors.surfaceMuted }]}
                >
                  <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Закрити</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleDeletePress(selectedPlant)}
                  style={[styles.actionButton, styles.dangerButton, { backgroundColor: colors.dangerBg }]}
                >
                  <Text style={[styles.dangerButtonText, { color: colors.dangerText }]}>Видалити</Text>
                </Pressable>
              </View>
            </View>
          ) : null}
        </View>
      </Modal>
    </View>
  );
}

const statusColor = (status: Plant["status"]) => {
  switch (status) {
    case "Здорова":
      return "#4CAF50";
    case "Потребує води":
      return "#2196F3";
    case "Хворіє":
      return "#F44336";
    default:
      return "#757575";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  banner: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 20,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  bannerSubtitle: {
    marginTop: 6,
    opacity: 0.85,
  },
  emptyCard: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 20,
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    margin: 0,
    padding: 16,
  },
  modalCard: {
    borderRadius: 24,
  },
  modalContent: {
    gap: 14,
    padding: 18,
  },
  modalImage: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  infoChip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  infoChipText: {
    fontSize: 13,
    fontWeight: "600",
  },
  statusChipText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  modalNotes: {
    fontSize: 15,
    lineHeight: 21,
  },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    padding: 18,
    paddingTop: 0,
  },
  actionButton: {
    alignItems: "center",
    borderRadius: 14,
    flex: 1,
    paddingVertical: 12,
  },
  secondaryButton: {},
  secondaryButtonText: {
    color: "#20311F",
    fontWeight: "700",
  },
  dangerButton: {},
  dangerButtonText: {
    color: "#BA1A1A",
    fontWeight: "700",
  },
});
