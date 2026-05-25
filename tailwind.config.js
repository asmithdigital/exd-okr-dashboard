/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0F1729',
          light: '#1a2540',
          lighter: '#243050',
        },
        gold: {
          DEFAULT: '#C4964A',
          light: '#D4A85A',
          dark: '#A07830',
        },
        amber: {
          dashboard: '#F59E0B',
        },
      },
    },
  },
  plugins: [],
}
