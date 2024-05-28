import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      //  See global.css for the font-family definitions
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        milesLight: {
          primary: "#450D21", // Primary color
          "primary-content": "#FFFFFF", // Light content color
          secondary: "#FBF0E5", // Secondary color
          // "secondary-content": "", // Foreground content color to use on secondary color
          accent: "#FF303B", // Accent color
          "accent-content": "#FFFFFF", // Foreground content color to use on accent color
          neutral: "#000000", // Neutral color
          "neutral-content": "#FFFFFF", // Foreground content color to use on neutral color
          "base-100": "#FFFFFF", // Base color of page, used for blank backgrounds
          // "base-200": "", // Base color, a little darker
          // "base-300": "", // Base color, even more darker
          // "base-content": "", // Foreground content color to use on base color
          info: "#00B5FF", // Info color
          "info-content": "#000000", // Foreground content color to use on info color
          success: "#00AA6D", // Success color
          "success-content": "#000000", // Foreground content color to use on success color
          warning: "#FFBF00", // Warning color
          "warning-content": "#000000", // Foreground content color to use on warning color
          error: "#DB0000", // Error color
          "error-content": "#FFFFFF", // Foreground content color to use on error color
        },
        milesDark: {
          primary: "#FF4C61", // Light variant of primary color
          "primary-content": "#FFFFFF", // Foreground content color to use on primary color
          secondary: "#2a323c", // Darker secondary color
          "secondary-content": "#FFFFFF", // Foreground content color to use on secondary color
          accent: "#FF303B", // Keeping the accent color same as it contrasts well
          "accent-content": "#FFFFFF", // Dark content color for accent
          neutral: "#2a323c", // Light neutral color
          "neutral-content": "#FFFFFF", // Dark foreground content color for neutral
          "base-100": "#000000", // Base color of page, used for blank backgrounds
          // "base-200": "", // Base color, a little lighter
          // "base-300": "", // Base color, even more lighter
          // "base-content": "", // Foreground content color to use on base color
          info: "#007ACC", // Darker info color
          "info-content": "#FFFFFF", // Light content color for info
          success: "#006644", // Darker success color
          "success-content": "#FFFFFF", // Light content color for success
          warning: "#FFBF00", // Darker warning color
          "warning-content": "#000000", // Foreground content color to use on warning color
          error: "#FF1A1A", // Light error color
          "error-content": "#FFFFFF", // Dark content color for error
        },
      },
      "cyberpunk",
    ],
  },
} satisfies Config;
