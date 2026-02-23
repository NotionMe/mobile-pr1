import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAppSettings } from '../theme/AppSettingsContext';

interface PlantCardProps {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  status: string;
  age: number;
  onPress?: () => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({
  name,
  type,
  imageUrl,
  status,
  age,
  onPress,
}) => {
  const { settings } = useAppSettings();
  const isDark = settings.theme === 'dark';

  const getStatusColor = () => {
    switch (status) {
      case 'Здорова': return '#4CAF50';
      case 'Потребує води': return '#2196F3';
      case 'Хворіє': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.card,
        isDark ? styles.cardDark : styles.cardLight
      ]}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.name, isDark ? styles.textDark : styles.textLight]}>{name}</Text>
        <Text style={[styles.type, isDark ? styles.textDark : styles.textLight]}>{type}</Text>

        {settings.showDetails && (
          <Text style={[styles.age, isDark ? styles.textDark : styles.textLight]}>Вік: {age} дн.</Text>
        )}

        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardLight: {
    backgroundColor: '#fff',
  },
  cardDark: {
    backgroundColor: '#2a2a2a',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.8,
  },
  age: {
    fontSize: 12,
    marginBottom: 8,
    fontStyle: 'italic',
    opacity: 0.6,
  },
  textLight: {
    color: '#333',
  },
  textDark: {
    color: '#eee',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
