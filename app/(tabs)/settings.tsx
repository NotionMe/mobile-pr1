import React from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";
import { useAppSettings } from "../../src/theme/AppSettingsContext";
import { getThemeColors } from "../../src/theme/colors";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { usePlantsStore } from "../../src/stores/usePlantsStore";
import { useUserStore } from "../../src/stores/useUserStore";

export default function SettingsScreen() {
  const { settings, updateSettings } = useAppSettings();
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const isDark = settings.theme === "dark";
  const colors = getThemeColors(settings.theme);

  const sessionOnly = useSettingsStore((state) => state.sessionOnly);
  const setSettingsSessionOnly = useSettingsStore((state) => state.setSessionOnly);
  const setPlantsSessionOnly = usePlantsStore((state) => state.setSessionOnly);
  const setUserSessionOnly = useUserStore((state) => state.setSessionOnly);

  const toggleTheme = () => {
    updateSettings({ theme: isDark ? "light" : "dark" });
  };

  const toggleDetails = () => {
    updateSettings({ showDetails: !settings.showDetails });
  };

  const toggleAttentionFilter = () => {
    updateSettings({
      showOnlyNeedsAttention: !settings.showOnlyNeedsAttention,
    });
  };

  const toggleCompactCards = () => {
    updateSettings({ compactCards: !settings.compactCards });
  };

  const toggleSessionOnly = () => {
    const newValue = !sessionOnly;
    setSettingsSessionOnly(newValue);
    setPlantsSessionOnly(newValue);
    setUserSessionOnly(newValue);
  };

  const handleLogout = () => {
    logout();
    router.replace("/sign-in");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.headerText, { color: colors.text }]}>Налаштування</Text>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Поточний користувач</Text>
        <Text style={[styles.userName, { color: colors.text }]}>{currentUser?.fullName ?? "Невідомо"}</Text>
        <Text style={[styles.userMeta, { color: colors.textMuted }]}>Логін: {currentUser?.username ?? "-"}</Text>
        <Text style={[styles.userMeta, { color: colors.textMuted }]}>Роль: {currentUser?.role ?? "-"}</Text>
        <Pressable onPress={handleLogout} style={[styles.logoutButton, { backgroundColor: colors.dangerBg }]}>
          <Text style={[styles.logoutButtonText, { color: colors.dangerText }]}>Вийти з облікового запису</Text>
        </Pressable>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.settingRow}>
          <View style={styles.settingTextBox}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>Темна тема</Text>
            <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
              Перемикає світле та темне оформлення
            </Text>
          </View>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingTextBox}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>Показувати вік рослин</Text>
            <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
              Відображати додаткову інформацію на картках
            </Text>
          </View>
          <Switch value={settings.showDetails} onValueChange={toggleDetails} />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingTextBox}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>
              Лише рослини, що потребують уваги
            </Text>
            <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
              Приховує здорові рослини на першому екрані
            </Text>
          </View>
          <Switch
            value={settings.showOnlyNeedsAttention}
            onValueChange={toggleAttentionFilter}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingTextBox}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>Режим "тільки на сесію"</Text>
            <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
              Не зберігати дані на пристрій після закриття додатку
            </Text>
          </View>
          <Switch value={sessionOnly} onValueChange={toggleSessionOnly} />
        </View>

        <View style={styles.divider} />

        <Pressable onPress={toggleCompactCards} style={styles.checkboxRow}>
          <View
            style={[
              styles.checkbox,
              { borderColor: colors.textMuted },
              settings.compactCards && styles.checkboxChecked,
              settings.compactCards && { backgroundColor: colors.accentStrong, borderColor: colors.accentStrong },
            ]}
          >
            {settings.compactCards ? <Text style={styles.checkboxMark}>✓</Text> : null}
          </View>
          <Text style={[styles.checkboxLabel, { color: colors.text }]}>
            Компактний вигляд карток на першому екрані
          </Text>
        </Pressable>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Персоналізація саду</Text>
        <TextInput
          placeholder="Ім'я садівника, наприклад Олена"
          placeholderTextColor={colors.inputPlaceholder}
          value={settings.gardenerName}
          onChangeText={(gardenerName) => updateSettings({ gardenerName })}
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
        />
        <TextInput
          placeholder="Девіз саду"
          placeholderTextColor={colors.inputPlaceholder}
          value={settings.gardenMotto}
          onChangeText={(gardenMotto) => updateSettings({ gardenMotto })}
          multiline
          numberOfLines={3}
          style={[
            styles.input,
            styles.multilineInput,
            { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text },
          ]}
        />
      </View>
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
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    borderRadius: 24,
    marginBottom: 16,
    padding: 18,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  logoutButton: {
    alignItems: "center",
    borderRadius: 14,
    marginTop: 16,
    paddingVertical: 14,
  },
  logoutButtonText: {
    color: "#BA1A1A",
    fontWeight: "700",
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  userMeta: {
    fontSize: 15,
    marginBottom: 2,
  },
  settingRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  settingTextBox: {
    flex: 1,
    paddingRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  divider: {
    backgroundColor: "#E1E8DA",
    height: 1,
    marginVertical: 14,
  },
  checkboxRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  checkbox: {
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1.5,
    height: 24,
    justifyContent: "center",
    marginRight: 12,
    width: 24,
  },
  checkboxChecked: {
    backgroundColor: "#3A7D44",
    borderColor: "#3A7D44",
  },
  checkboxMark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  checkboxLabel: {
    color: "#20311F",
    flex: 1,
    fontSize: 15,
  },
  multilineInput: {
    minHeight: 96,
    textAlignVertical: "top",
  },
});
