/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#109B53',
        'secondary': '#161C28',
        'menu-primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'menu-secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['Menlo', 'monospace'],
    },
  },
  plugins: [],
}

