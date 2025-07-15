/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#21212D",
        secondary: "#2C2C38",
        text_gray: "#8a8f9e",
      },
    },
  },
  plugins: [],
};
