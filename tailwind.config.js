/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#c59a35',
        gold: '#c59a35',
        charcoal: '#1c1c1c',
        'background-light': '#2a2a2a',
        'background-dark': '#1c1c1c',
        'surface-dark': '#252525',
        'text-main': '#FFFFFF',
        'text-muted': '#b0b0b0',
      },
      fontFamily: {
        main: ['Handicrafts', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
