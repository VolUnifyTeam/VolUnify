/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        // Optional: You might want to add these if they're not already in your config
        'gray-800': '#1f2937',
        'gray-700': '#374151',
        'gray-600': '#4b5563',
        'blue-300': '#93c5fd',
        'blue-600': '#2563eb',
        'red-400': '#f87171',
        'red-900': '#7f1d1d',
        'green-400': '#4ade80',
      },
    },
  },
  plugins: [],
};