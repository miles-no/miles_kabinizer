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
        miles: {
          primary: "#450D21", // Primary color
          // "primary-content": "", // Foreground content color to use on primary color
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
      },
      // "light",
      // "dark",
    ],
  },
} satisfies Config;
