/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('tw-bootstrap-grid-optimizer')
  ],
  daisyui: {
    themes: ["retro", "coffee", "luxury"],
  },
}

