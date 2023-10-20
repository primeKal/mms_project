/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), 1)`
    }
    return `rgb(var(${variableName}))`
  }
}
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        primary: '#43AA84',
      },
      textColor: {
        skin: {
          primary: withOpacity("--color-primary"),
          a11y: withOpacity("--color-a11y")
        }
      },
      backgroundColor: {
        skin: {
          primary: withOpacity("--primary-bg-color"),
          a11y: withOpacity("--secondary-bg-color"),
        },
       
      }
    },
  },
  plugins: [],
}

