module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'PT Sans'", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
