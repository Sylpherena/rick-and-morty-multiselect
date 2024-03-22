/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        destructive: 'hsl(var(--destructive) / <alpha-value>)',
        muted: 'hsl(var(--muted))',
        accent: 'hsl(var(--accent))'
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)'
      },
      animation: {
        progress: 'progress 1s infinite linear'
      },
      keyframes: {
        progress: {
          '0%': { transform: ' translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' }
        }
      },
      transformOrigin: {
        'left-right': '0% 50%'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
