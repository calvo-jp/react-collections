module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.tsx',
    './src/layouts/**/*.tsx',
    './src/widgets/**/*.tsx',
  ],
  darkMode: 'media',
  theme: {
    extend: {},
    fontFamily: {
      sans: ["'Poppins'", 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
