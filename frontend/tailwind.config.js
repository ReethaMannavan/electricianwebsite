/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",              // Vite entry point
    "./src/**/*.{js,jsx,ts,tsx}" // All React component files
  ],
  theme: {
    extend: { 
    
  fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        "warm-orange": "#E25C26",
        "bright-orange": "#CD3A00",
        "light-orange": "#F65616",
        "deep-blue": "#0056B3",
      },
},
  },
  plugins: [
  ],
}

