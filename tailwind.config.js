/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "426px", // Add a custom screen size for 425px
      },
    },
  },
  plugins: [],
};
