/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#6366F1',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
