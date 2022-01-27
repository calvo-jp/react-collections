module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      IBMPlexSans: [
        "'IBM Plex Sans'",
        '-apple-system',
        'BlinkMacSystemFont',
        "'Segoe UI'",
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        "'Open Sans'",
        "'Helvetica Neue'",
        'sans-serif',
      ],
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
  variants: {
    extend: {},
  },
  plugins: [],
};
