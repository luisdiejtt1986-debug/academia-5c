/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#04152d',
          mid: '#0a2240',
          light: '#0f2f5a',
        }
      }
    },
  },
  plugins: [],
}
