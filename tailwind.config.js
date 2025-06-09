/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c92020',
        'primary-hover': '#a51b1b',
        secondary: '#b41c1c',
        dark: '#1f1f1f',
        'dark-light': '#2a2a2a',
        'dark-card': '#2f2f2f',
        'dark-border': '#3f3f3f',
        light: '#ffffff',
        'light-gray': '#a0a0a0',
      },
      // Utilities para scrollbar
      scrollbar: {
        'thin': {
          'scrollbar-width': 'thin',
        },
        'none': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
        }
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
}