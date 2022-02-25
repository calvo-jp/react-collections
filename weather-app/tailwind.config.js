module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    fontFamily: {
      sans: ["'Montserrat'", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
