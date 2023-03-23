/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'BladeRunner': 'BladeRunner',
        'BlackwoodCastle': 'BlackwoodCastle',
        'TrashHand': 'TrashHand'
      }
    },
  },
  plugins: [],
}
