export const colors = {
  dark: {
    bg: "#0f172a",
    bgAlt: "#1e293b",
    bgHover: "#334155",
    text: "#e2e8f0",
    textMuted: "#94a3b8",
    accent: "#2dd4bf",
    accentHover: "#5eead4",
    border: "#1e293b"
  },
  light: {
    bg: "#f8fafc",
    bgAlt: "#f1f5f9",
    bgHover: "#e2e8f0",
    text: "#0f172a",
    textMuted: "#475569",
    accent: "#0d9488",
    accentHover: "#0f766e",
    border: "#e2e8f0"
  }
} as const;

export type ThemeMode = keyof typeof colors;
