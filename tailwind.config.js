/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-green': '#0d4f3c',
        'luxury-gold': '#d4af37',
      },
    },
  },
  plugins: [],
}

