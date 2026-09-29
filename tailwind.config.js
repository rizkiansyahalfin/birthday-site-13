/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        wine: {
          950: '#2A0F20',
          900: '#3D1A2E',
          800: '#4A2238',
          700: '#5C2840',
          600: '#6E3049',
        },
        rose: {
          200: '#F4C2D7',
          300: '#EFAFC9',
          400: '#E899B8',
          500: '#DC7FA3',
        },
        cream: '#FBF3EE',
        blush: '#F6E2E8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        script: ['"Playfair Display"', 'serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
        ui: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px -15px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
}
