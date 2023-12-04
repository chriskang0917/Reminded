/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
const colors = require("tailwindcss/colors");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: colors.white,
      black: colors.black,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      primary: "#32435F",
      secondary: "#8F8681",
      third: "#A67F78",
      thirdDark: "#70665f",
      fourth: "#E1DCD9",
      fourthDark: "#b4ada9",
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#32435F",
              foreground: "#ffffff",
            },
            secondary: { DEFAULT: "#8F8681", foreground: "#ffffff" },
          },
        },
      },
    }),
  ],
};
