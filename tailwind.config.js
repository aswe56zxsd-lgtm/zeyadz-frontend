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
        primary: '#8305a5',
        purple: '#8305a5',
        orange: '#f17405',
        'background-light': '#FFFFFF',
        'surface-light': '#f8f8f8',
        'text-main': '#333333',
        'text-muted': '#666666',
        'border-color': '#e0e0e0',
      },
      fontFamily: {
        main: ['TheYearofHandicrafts', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
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
