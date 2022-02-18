module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ["'IBM Plex Sans'", 'sans-serif'],
      heading: ["'Open Sans Condensed'", 'sans-serif'],
    },
    fontWeight: {
      extralight: 100,
      light: 200,
      semilight: 300,
      normal: 400,
      semibold: 500,
      bold: 600,
      extrabold: 700,
      'heading-thin': 300,
      'heading-thick': 700,
    },
    extend: {
      spacing: {
        header: 50,
        navbar: 265,
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
