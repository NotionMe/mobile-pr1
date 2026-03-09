import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Menu, Surface, useTheme } from 'react-native-paper';

type Screen = 'garden' | 'settings' | 'addPlant';

interface NavigationButtonsProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentScreen,
  onScreenChange,
}) => {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const screenLabels = useMemo(
    () => [
      { value: 'garden' as Screen, label: 'Мій Сад', icon: 'flower-outline' },
      { value: 'settings' as Screen, label: 'Налаштування', icon: 'cog-outline' },
      { value: 'addPlant' as Screen, label: 'Додати рослину', icon: 'plus-circle-outline' },
    ],
    []
  );

  const activeScreen = screenLabels.find((screen) => screen.value === currentScreen);

  const handleSelect = (screen: Screen) => {
    setMenuVisible(false);
    onScreenChange(screen);
  };

  return (
    <Surface style={styles.navContainer} elevation={4}>
      <View style={styles.menuWrapper}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="contained-tonal"
              icon={activeScreen?.icon}
              onPress={() => setMenuVisible(true)}
              contentStyle={styles.buttonContent}
            >
              {activeScreen ? `Екран: ${activeScreen.label}` : 'Оберіть екран'}
            </Button>
          }
        >
          {screenLabels.map((screen) => (
            <Menu.Item
              key={screen.value}
              leadingIcon={screen.icon}
              trailingIcon={screen.value === currentScreen ? 'check' : undefined}
              onPress={() => handleSelect(screen.value)}
              title={screen.label}
            />
          ))}
        </Menu>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuWrapper: {
    alignItems: 'stretch',
  },
  buttonContent: {
    minHeight: 46,
  },
});
