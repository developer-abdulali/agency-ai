/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: "480px",
      },
      colors: {
        primary: {
          50: "#effaff",
          100: "#dff4ff",
          200: "#b8ebff",
          300: "#78ddff",
          400: "#3fcfff",
          500: "#06b5f1",
          600: "#0092ce",
          700: "#0075a7",
          800: "#02628a",
          900: "#085172",
          950: "#06334b",
        },
        secondary: {
          50: "#f6f6f9",
          100: "#ededf1",
          200: "#d7d8e0",
          300: "#b4b6c5",
          400: "#8b8da5",
          500: "#6c6e8b",
          600: "#575972",
          700: "#47485d",
          800: "#3d3e4f",
          900: "#363744",
          950: "#101014",
        },
      },
    },
  },
  plugins: [],
};
