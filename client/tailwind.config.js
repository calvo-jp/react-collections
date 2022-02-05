const fontFamily = {
  sans: [
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
};

const fontWeight = {
  extralight: 100,
  light: 200,
  semilight: 300,
  normal: 400,
  semibold: 500,
  bold: 600,
  extrabold: 700,
};

/** header height */
const header = 50;

/** navbar width */
const navbar = 265;

const tailwindConfig = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily,
    fontWeight,
    extend: { height: { header }, width: { navbar }, flexBasis: { navbar } },
  },
  plugins: [],
};

module.exports = tailwindConfig;
