// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-green': '#2fa696',
      },
    },
  },
  variants: {
    extend: {
      fontSize: ['hover'], // enable hover variant for fontSize
    },
  },
  plugins: [],
}
