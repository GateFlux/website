/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enterprise primary - Deep authoritative purple
        primary: {
          DEFAULT: '#1c153e',
          50: '#f8f7fc',
          100: '#f0eff8',
          200: '#e2e0f1',
          300: '#ccc8e5',
          400: '#a9a2d1',
          500: '#8579ba',
          600: '#6b5fa0',
          700: '#574d84',
          800: '#2a2154',
          900: '#1c153e',
          950: '#0f0b24',
        },
        // Action accent - Precision orange/gold
        accent: {
          DEFAULT: '#d78310',
          50: '#fef8e6',
          100: '#fdedc0',
          200: '#fbdb86',
          300: '#f9c44a',
          400: '#eda71e',
          500: '#d78310',
          600: '#b5690c',
          700: '#8f500b',
          800: '#6b3a0a',
          900: '#4a2908',
          950: '#2d1805',
        },
        // Neutral grays for enterprise feel
        neutral: {
          50: '#f8f9fc',
          100: '#f1f3f7',
          200: '#e5e7ed',
          300: '#d1d5de',
          400: '#9ca3b3',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.06), 0 10px 20px -2px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.03)',
        'soft-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        'enterprise': '0 4px 20px -4px rgba(28, 21, 62, 0.12)',
        'enterprise-lg': '0 8px 30px -6px rgba(28, 21, 62, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(180deg, #1c153e 0%, #1c153e 100%)',
        'section-dark': 'linear-gradient(180deg, #1c153e 0%, #1c153e 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
