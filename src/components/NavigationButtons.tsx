import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Screen = 'garden' | 'settings';

interface NavigationButtonsProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  isDark: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentScreen,
  onScreenChange,
  isDark,
}) => {
  return (
    <View style={[styles.navContainer, isDark ? styles.navDark : styles.navLight]}>
      <TouchableOpacity
        style={[
          styles.navButton,
          currentScreen === 'garden' && styles.activeButton,
        ]}
        onPress={() => onScreenChange('garden')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.navText,
            isDark ? styles.textDark : styles.textLight,
            currentScreen === 'garden' && styles.activeText,
          ]}
        >
          Мій Сад
        </Text>
        {currentScreen === 'garden' && <View style={styles.indicator} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navButton,
          currentScreen === 'settings' && styles.activeButton,
        ]}
        onPress={() => onScreenChange('settings')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.navText,
            isDark ? styles.textDark : styles.textLight,
            currentScreen === 'settings' && styles.activeText,
          ]}
        >
          Налаштування
        </Text>
        {currentScreen === 'settings' && <View style={styles.indicator} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navLight: {
    backgroundColor: '#fff',
    borderTopColor: '#e0e0e0',
  },
  navDark: {
    backgroundColor: '#1E1E1E',
    borderTopColor: '#333',
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  navText: {
    fontSize: 16,
    fontWeight: '500',
  },
  textLight: {
    color: '#666',
  },
  textDark: {
    color: '#aaa',
  },
  activeText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginTop: 4,
  },
});
