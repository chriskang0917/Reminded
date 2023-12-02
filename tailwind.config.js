/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#32435F",
      secondary: "#8F8681",
      third: "#A67F78",
      fourth: "#E1DCD9",
      white: "#ffffff",
      black: "#000000",
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
            secondary: "#8F8681",
          },
        },
      },
    }),
  ],
};
