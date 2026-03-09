import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Card,
  Chip,
  IconButton,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import { useAppSettings } from '../theme/AppSettingsContext';

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
  const theme = useTheme();

  const getStatusColor = () => {
    switch (status) {
      case 'Здорова': return '#4CAF50';
      case 'Потребує води': return '#2196F3';
      case 'Хворіє': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <Card style={[styles.card, compact && styles.cardCompact]} mode="elevated">
      <View style={styles.row}>
        <TouchableRipple onPress={onPress} style={styles.mainArea} borderless={false}>
          <View style={styles.contentRow}>
            <Image source={{ uri: imageUrl }} style={[styles.image, compact && styles.imageCompact]} />
            <View style={styles.infoContainer}>
              <Text variant="titleMedium" style={styles.name}>
                {name}
              </Text>
              <Text variant="bodyMedium" style={[styles.type, { color: theme.colors.onSurfaceVariant }]}>
                {type}
              </Text>

              {settings.showDetails && (
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Вік: {age} дн.
                </Text>
              )}

              <Chip
                compact
                style={[styles.statusChip, { backgroundColor: getStatusColor() }]}
                textStyle={styles.statusText}
              >
                {status}
              </Chip>
            </View>
          </View>
        </TouchableRipple>

        <View style={styles.deleteArea}>
          <IconButton
            icon="trash-can-outline"
            iconColor={theme.colors.error}
            onPress={onDelete}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
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
    marginBottom: 4,
  },
  type: {
    marginBottom: 4,
  },
  statusChip: {
    alignSelf: 'flex-start',
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
    paddingRight: 4,
  },
});
