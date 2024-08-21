/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skyblue: '#87CEEB', // Adiciona a cor Sky Blue
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'], // Adiciona a fonte Ubuntu
      },
    },
  },
  plugins: [],
}

