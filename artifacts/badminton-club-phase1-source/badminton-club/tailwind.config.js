/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#dde6ff',
          200: '#baceff',
          300: '#87abff',
          500: '#3b6bc7',
          600: '#2d5aa0',
          700: '#1e3a8a',
          800: '#1a3070',
          900: '#0f2444',
          DEFAULT: '#1a3a6b',
        },
        accent: {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          DEFAULT: '#0891b2',
        },
      },
      fontFamily: {
        sans: [
          'Inter', 'PingFang SC', 'Hiragino Sans GB',
          'Microsoft YaHei', 'ui-sans-serif', 'system-ui', 'sans-serif',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
