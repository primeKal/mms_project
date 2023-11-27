/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#FF453D',
        'secondary': '#161C28',
        'menu-primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'menu-secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}

