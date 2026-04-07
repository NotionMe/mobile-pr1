import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "../src/context/AuthContext";
import { useAppSettings } from "../src/theme/AppSettingsContext";
import { getThemeColors } from "../src/theme/colors";

export default function SignInScreen() {
  const { isAuthenticated, login, isLoading, demoUsers } = useAuth();
  const { settings } = useAppSettings();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const colors = getThemeColors(settings.theme);

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  const handleLogin = async () => {
    const result = await login(email, password);

    if (!result.success) {
      setError(result.error ?? "Не вдалося виконати вхід.");
      return;
    }

    setError("");
    router.replace("/");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.hero}>
          <Text style={[styles.title, { color: colors.text }]}>My Garden</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Увійдіть, щоб переглядати рослини, додавати нові записи та керувати
            налаштуваннями свого саду.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Авторизація
          </Text>
          {error ? <Text style={[styles.errorText, { color: colors.dangerText }]}>{error}</Text> : null}
          <TextInput
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={[
              styles.input,
              {
                backgroundColor: colors.inputBg,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Email (eve.holt@reqres.in)"
            placeholderTextColor={colors.inputPlaceholder}
            keyboardType="email-address"
          />
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[
              styles.input,
              {
                backgroundColor: colors.inputBg,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Пароль (cityslicka)"
            placeholderTextColor={colors.inputPlaceholder}
          />
          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            style={[
              styles.loginButton,
              { backgroundColor: colors.accentStrong },
              isLoading && { opacity: 0.7 }
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>Увійти</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    gap: 18,
  },
  hero: {
    gap: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
  card: {
    borderRadius: 24,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  demoUser: {
    gap: 2,
    marginBottom: 14,
  },
  demoCard: {},
  helperText: {
    fontSize: 14,
    marginTop: 4,
  },
  loginButton: {
    alignItems: "center",
    borderRadius: 16,
    marginTop: 14,
    paddingVertical: 14,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  demoName: {
    fontSize: 18,
    fontWeight: "600",
  },
  demoMeta: {
    fontSize: 14,
  },
  demoLine: {
    fontSize: 15,
  },
});
