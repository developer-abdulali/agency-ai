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
          100: "#eeedf1",
          200: "#d8d7e0",
          300: "#b4b3c6",
          400: "#8c8aa6",
          500: "#6e6c8b",
          600: "#595673",
          700: "#49475d",
          800: "#3e3d4f",
          900: "#373644",
          950: "#1c1b22",
        },
      },
    },
  },
  plugins: [],
};
