/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#0F172A', // Slate 900
        card: '#1E293B', // Slate 800
        text: '#F8FAFC', // Slate 50
        accent: '#38BDF8', // Sky 400
        success: '#22C55E', // Green 500
        warning: '#F59E0B', // Amber 500
        danger: '#EF4444', // Red 500
      }
    },
  },
  plugins: [],
}
