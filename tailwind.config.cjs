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
    extend: {
      backgroundImage: {
        'todo-bg': "linear-gradient(172.7deg, #FFD370 5.12%, #FFD370 53.33%, #FFD370 53.44%, #FFFFFF 53.45%, #FFFFFF 94.32%)",
      }
    },
  },
  plugins: [],
}
