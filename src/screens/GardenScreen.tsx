import React, { useMemo, useState } from "react";
import { Alert, FlatList, Image, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  FAB,
  Modal,
  Portal,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { PlantCard } from "../components/PlantCard";
import { Plant } from "../data/plants";
import { useAppSettings } from "../theme/AppSettingsContext";

interface GardenScreenProps {
  plants: Plant[];
  onDeletePlant: (plantId: string) => void;
  onNavigateToAdd: () => void;
}

export const GardenScreen = ({
  plants,
  onDeletePlant,
  onNavigateToAdd,
}: GardenScreenProps) => {
  const { settings } = useAppSettings();
  const theme = useTheme();
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

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
            onDeletePlant(plant.id);
          },
        },
      ],
    );
  };

  const isDark = settings.theme === "dark";
  const gardenerTitle = settings.gardenerName.trim()
    ? `Садівник: ${settings.gardenerName.trim()}`
    : "Ваші рослини під контролем";

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
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
            <Text variant="headlineMedium" style={styles.headerText}>
              Мій Сад
            </Text>

            <Surface
              style={[
                styles.banner,
                { backgroundColor: theme.colors.secondaryContainer },
              ]}
              elevation={1}
            >
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.onSecondaryContainer }}
              >
                {gardenerTitle}
              </Text>
              {settings.gardenMotto.trim() ? (
                <Text
                  variant="bodyMedium"
                  style={[
                    styles.bannerSubtitle,
                    { color: theme.colors.onSecondaryContainer },
                  ]}
                >
                  {settings.gardenMotto.trim()}
                </Text>
              ) : null}
            </Surface>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Surface
            style={[
              styles.emptyCard,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
            elevation={0}
          >
            <Text variant="bodyLarge" style={{ textAlign: "center" }}>
              Немає рослин для поточного фільтра. Додайте нову або змініть
              налаштування.
            </Text>
          </Surface>
        }
      />

      <Portal>
        <Modal
          visible={selectedPlant !== null}
          onDismiss={() => setSelectedPlant(null)}
          contentContainerStyle={styles.modalOverlay}
        >
          {selectedPlant ? (
            <Card mode="elevated">
              <Card.Content style={styles.modalContent}>
                <Image
                  source={{ uri: selectedPlant.imageUrl }}
                  style={styles.modalImage}
                />
                <Text variant="headlineSmall" style={styles.modalTitle}>
                  {selectedPlant.name}
                </Text>
                <View style={styles.chipsRow}>
                  <Chip icon="shape-outline">{selectedPlant.type}</Chip>
                  <Chip icon="calendar-outline">{selectedPlant.age} дн.</Chip>
                  <Chip
                    style={{
                      backgroundColor: statusColor(selectedPlant.status),
                    }}
                    textStyle={styles.statusChipText}
                  >
                    {selectedPlant.status}
                  </Chip>
                </View>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {selectedPlant.notes}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => setSelectedPlant(null)}>Закрити</Button>
                <Button
                  mode="contained-tonal"
                  textColor={theme.colors.error}
                  onPress={() => handleDeletePress(selectedPlant)}
                >
                  Видалити
                </Button>
              </Card.Actions>
            </Card>
          ) : null}
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        label="Додати"
        style={styles.fab}
        onPress={onNavigateToAdd}
      />
    </View>
  );
};

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
    textAlign: "center",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 96,
  },
  banner: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 20,
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
  modalOverlay: {
    margin: 16,
  },
  modalContent: {
    gap: 14,
  },
  modalImage: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    marginBottom: 8,
  },
  modalTitle: {
    marginBottom: 4,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  statusChipText: {
    color: "#fff",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
