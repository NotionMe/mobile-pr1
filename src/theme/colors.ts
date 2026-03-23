import { Theme } from "./AppSettingsContext";

export function getThemeColors(theme: Theme) {
  return theme === "dark"
    ? {
        background: "#101510",
        surface: "#1A231A",
        surfaceMuted: "#263126",
        border: "#355233",
        text: "#ECF7E8",
        textMuted: "#C7D5C0",
        accent: "#2B3A2B",
        accentStrong: "#6A994E",
        dangerBg: "#4D2222",
        dangerText: "#FFB4AB",
        inputBg: "#223022",
        inputPlaceholder: "#90A490",
        overlay: "rgba(0, 0, 0, 0.62)",
      }
    : {
        background: "#F3F6EE",
        surface: "#FFFFFF",
        surfaceMuted: "#E8F0E1",
        border: "#D7E3D0",
        text: "#20311F",
        textMuted: "#52604D",
        accent: "#DCECCF",
        accentStrong: "#3A7D44",
        dangerBg: "#FDE7E7",
        dangerText: "#BA1A1A",
        inputBg: "#EEF4E8",
        inputPlaceholder: "#7A866F",
        overlay: "rgba(16, 21, 16, 0.45)",
      };
}
