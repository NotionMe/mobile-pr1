import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppSettings } from '../theme/AppSettingsContext';
import { getThemeColors } from '../theme/colors';

interface PlantCardProps {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  status: string;
  age: number;
  compact?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({
  name,
  type,
  imageUrl,
  status,
  age,
  compact = false,
  onPress,
  onDelete,
}) => {
  const { settings } = useAppSettings();
  const colors = getThemeColors(settings.theme);

  const getStatusColor = () => {
    switch (status) {
      case 'Здорова': return '#4CAF50';
      case 'Потребує води': return '#2196F3';
      case 'Хворіє': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <View
      style={[
        styles.card,
        compact && styles.cardCompact,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.row}>
        <Pressable onPress={onPress} style={styles.mainArea}>
          <View style={styles.contentRow}>
            <Image
              source={{ uri: imageUrl }}
              style={[styles.image, compact && styles.imageCompact]}
            />
            <View style={styles.infoContainer}>
              <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
              <Text style={[styles.type, { color: colors.textMuted }]}>
                {type}
              </Text>

              {settings.showDetails && (
                <Text style={[styles.metaText, { color: colors.textMuted }]}>
                  Вік: {age} дн.
                </Text>
              )}

              <View
                style={[styles.statusChip, { backgroundColor: getStatusColor() }]}
              >
                <Text style={styles.statusText}>{status}</Text>
              </View>
            </View>
          </View>
        </Pressable>

        <View style={styles.deleteArea}>
          <Pressable
            onPress={onDelete}
            style={[styles.deleteButton, { backgroundColor: colors.dangerBg }]}
          >
            <Text style={[styles.deleteButtonText, { color: colors.dangerText }]}>
              Видалити
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    elevation: 2,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  cardCompact: {
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
  },
  mainArea: {
    flex: 1,
  },
  contentRow: {
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  imageCompact: {
    width: 64,
    height: 64,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  type: {
    fontSize: 15,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 13,
  },
  statusChip: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteArea: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  deleteButton: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  deleteButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
