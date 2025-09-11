export const Colors = {
  // Primary colors
  primary: "#007AFF",
  primaryGlass: "rgba(0, 122, 255, 0.15)",
  primaryGlow: "rgba(0, 122, 255, 0.3)",

  // Glass colors
  glass: {
    primary: "rgba(0, 122, 255, 0.15)",
    secondary: "rgba(255, 255, 255, 0.1)",
    dark: "rgba(0, 0, 0, 0.2)",
    light: "rgba(255, 255, 255, 0.15)",
    overlay: "rgba(0, 0, 0, 0.05)",
  },

  // Background gradients
  background: {
    start: "#0F0F1E",
    middle: "rgb(3, 11, 18)",
    end: "#16213E",
    overlay: "rgba(0, 0, 0, 0.3)",
  },

  // Text colors
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.8)",
    tertiary: "rgba(255, 255, 255, 0.6)",
    accent: "#007AFF",
    muted: "rgba(255, 255, 255, 0.4)",
  },

  // Message bubble colors
  message: {
    own: {
      background: "rgba(0, 122, 255, 0.2)",
      border: "rgba(0, 122, 255, 0.3)",
      glow: "rgba(0, 122, 255, 0.1)",
    },
    other: {
      background: "rgba(255, 255, 255, 0.08)",
      border: "rgba(255, 255, 255, 0.15)",
      glow: "rgba(255, 255, 255, 0.05)",
    },
  },

  // Border colors
  border: {
    light: "rgba(255, 255, 255, 0.1)",
    medium: "rgba(255, 255, 255, 0.2)",
    primary: "rgba(0, 122, 255, 0.3)",
  },

  // Shadow colors
  shadow: {
    light: "rgba(0, 0, 0, 0.1)",
    medium: "rgba(0, 0, 0, 0.2)",
    dark: "rgba(0, 0, 0, 0.4)",
    glow: "rgba(0, 122, 255, 0.2)",
  },

  // Status colors
  status: {
    online: "#4CAF50",
    offline: "rgba(255, 255, 255, 0.3)",
    typing: "#FF9500",
  },
};

export const GlassStyles = {
  // Common glass effect styles
  glass: {
    backgroundColor: Colors.glass.secondary,
    borderWidth: 1,
    borderColor: Colors.border.light,
    backdropFilter: "blur(20px)",
  },

  primaryGlass: {
    backgroundColor: Colors.glass.primary,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    backdropFilter: "blur(20px)",
  },

  darkGlass: {
    backgroundColor: Colors.glass.dark,
    borderWidth: 1,
    borderColor: Colors.border.light,
    backdropFilter: "blur(15px)",
  },

  // Shadow styles
  shadow: {
    shadowColor: Colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  glowShadow: {
    shadowColor: Colors.shadow.glow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
};
