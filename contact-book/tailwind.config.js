module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'Montserrat'", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
