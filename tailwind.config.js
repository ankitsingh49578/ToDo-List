/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'below-1024': {'max': '1024px'},   // For screens 500px and below
        'above-1024': '1024px',   // For screens 1000px and above
      },
    },
  },
  plugins: [],
}

