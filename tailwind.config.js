/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Prestige Royal Medical Blue (Primary)
        medical: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a7f7',
          500: '#0c8ce9',
          600: '#006ec4', // Primary Executive Blue
          700: '#02569d',
          800: '#064881',
          900: '#0a3d6c',
          950: '#062747', // Deep Midnight Royal Navy
        },
        // Bio-Emerald & Cyan Vitality Accents
        bio: {
          teal: '#0d9488',
          cyan: '#0284c7',
          emerald: '#059669',
          mint: '#10b981',
          light: '#f0fdfa'
        },
        // Subtle Women's Health / Heritage micro-accent
        fem: {
          rose: '#e11d48',
          soft: '#ffe4e6',
          deep: '#9f1239'
        },
        slate: {
          850: '#0f172a',
          900: '#0b1329',
          950: '#060c1c',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 20px 35px -4px rgba(2, 86, 157, 0.12), 0 8px 16px -2px rgba(15, 23, 42, 0.06)',
        'glow-blue': '0 0 35px -5px rgba(12, 140, 233, 0.35)',
        'glow-teal': '0 0 30px -5px rgba(13, 148, 136, 0.35)',
        'float': '0 20px 40px -15px rgba(6, 39, 71, 0.14)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'floating 5s ease-in-out infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
