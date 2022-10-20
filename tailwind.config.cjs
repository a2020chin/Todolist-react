/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'Roboto': ['Roboto','Noto Sans TC']
    },
    container: {
      center: true, 
      padding: "12px"
    },
    extend: {},
  },
  plugins: [],
}
