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
        // Logo-based Modern Theme (Purple, Cyan, Silver)
        'primary-magenta': '#8305A5',
        'primary-purple': '#7B4AA9',
        'primary-cyan': '#F17405',
        'primary-silver': '#C0C0C0',

        // Main brand colors
        'coffee-dark': '#7B4AA9',      // Purple as main dark color
        'coffee-medium': '#9B65C7',     // Lighter purple
        'gold': '#8305A5',              // Magenta as accent
        'bronze': '#F17405',            // Cyan as secondary accent
        'cream-bg': '#F5F3FF',          // Light purple tint
        'cream-accent': '#E9E5FF',      // Lighter purple tint
        'text-main': '#3E2564',         // Dark purple for text
        'text-muted': '#6B5B95',        // Muted purple

        // Hover states
        'primary-magenta-hover': '#6a0485',
        'primary-purple-hover': '#663B8F',
        'primary-cyan-hover': '#d96504',

        // Active states
        'primary-magenta-active': '#8A2F7F',
        'primary-purple-active': '#5A3678',
        'primary-cyan-active': '#5AB0D8',

        // Legacy support (backwards compatibility)
        'primary-pink': '#8305A5',
        'primary-blue': '#F17405',
        'neutral-gray': '#DBDBDB',
        'primary-pink-hover': '#6a0485',
        'primary-blue-hover': '#d96504',
        'primary-pink-active': '#8A2F7F',
        'primary-blue-active': '#5AB0D8',
        primary: '#8305A5',
        purple: '#8305A5',
        orange: '#F17405',
        'background-light': '#FFFFFF',
        'surface-light': '#f8f8f8',
        'border-color': '#e0e0e0',
      },
      boxShadow: {
        'golden': '0 4px 20px -2px rgba(131, 5, 165, 0.2)',
        'purple-glow': '0 4px 20px -2px rgba(123, 74, 169, 0.3)',
        'cyan-glow': '0 4px 20px -2px rgba(241, 116, 5, 0.3)',
        'pink-sm': '0 2px 8px rgba(131, 5, 165, 0.12)',
        'pink-md': '0 4px 16px rgba(131, 5, 165, 0.18)',
        'pink-lg': '0 8px 32px rgba(131, 5, 165, 0.24)',
        'pink-xl': '0 16px 48px rgba(131, 5, 165, 0.30)',
      },
      fontFamily: {
        main: ['Tajawal', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
        sans: ['Tajawal', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
