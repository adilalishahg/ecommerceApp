/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        bgPrimary: '#000000',
        customBlue: '#3498db',
        customGreen: '#2ecc71',
        customRed: '#e74c3c',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}

