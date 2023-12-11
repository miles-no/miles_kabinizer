/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
      },
      fontWeight: {
        bold: 600,
        text: 400,
      },
      colors: {
        title: "#354A71",
      },
    },
  },
  plugins: [],
};
