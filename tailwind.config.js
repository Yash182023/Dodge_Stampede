// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Optional: if you want to support manual dark mode switching later
  theme: {
    extend: {
      // Define our custom colors here
      colors: {
        'saffron': '#F4C430',
        'indian-green': '#138808',
      },
      // Define our custom gradient for the footer
      backgroundImage: {
        'gradient-indian': 'linear-gradient(to right, #F4C430, #FFFFFF, #138808)',
      },
      // Define the font variable we set up in layout.js
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};