/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "miles-red-500": "#FF303B",
        "miles-red-900": "#6A1426",
        "miles-green": "#2ABF12",
        "calm-yellow": "#FBF0E5",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // "sunset",
      {
        miles: {
          primary: "#ff3038",
          secondary: "#6a1426",
          accent: "#fb7185",
          neutral: "#F1F2F5",
          "base-100": "#ffffff",
          info: "#41ffff",
          success: "#2ABF12",
          warning: "#fbbf24",
          error: "#e11d48",
        },
      },
    ],
  },
};
