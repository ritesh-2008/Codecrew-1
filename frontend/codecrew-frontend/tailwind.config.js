/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f9fafb',
        foreground: '#1f2937',
        primary: '#2563eb',
        secondary: '#ec4899',
        accent: '#f59e0b',
      },
    },
  },
  plugins: [],
}
