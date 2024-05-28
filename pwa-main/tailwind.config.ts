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
          primary: "#450D21", // Burgunder
          secondary: "#A83224", // Miles rød
          accent: "#FF303B", // Korall
          neutral: "#004047", // Sjøgrønn
          "base-100": "#FFFFFF", // Hvit
          // "?": "#FBF0E5", // Krem
          info: "#00B5FF", // Blå
          success: "#00AA6D", // Grønn
          warning: "#A83224", // Miles rød
          error: "#450D21", // Burgunder
        },
      },
      // "light",
      // "dark",
    ],
  },
} satisfies Config;
