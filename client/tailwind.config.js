module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
      fontWeight: {
        extralight: 100,
        light: 200,
        semilight: 300,
        normal: 400,
        semibold: 500,
        bold: 600,
        extrabold: 700,
      },
    },
  },
  plugins: [],
  darkMode: 'media',
};
