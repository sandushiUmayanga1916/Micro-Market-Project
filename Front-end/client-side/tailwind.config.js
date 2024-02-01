/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: [
        {
          'yellowColor' : '#FFB000',
          'greenColor': '#004225',
          'secondaryColor' : '#607274',
          'primaryBG' : '#F5F5DC',
        }
      ]
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
}

