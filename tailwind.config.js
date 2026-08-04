/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#faf8ff',
          dim: '#d9d9e5',
          bright: '#faf8ff',
          container: {
            lowest: '#ffffff',
            low: '#f3f3fe',
            DEFAULT: '#ededf9',
            high: '#e7e7f3',
            highest: '#e1e2ed'
          },
          variant: '#e1e2ed'
        },
        'on-surface': {
          DEFAULT: '#191b23',
          variant: '#434655'
        },
        inverse: {
          surface: '#2e3039',
          'on-surface': '#f0f0fb',
          primary: '#b4c5ff'
        },
        outline: {
          DEFAULT: '#737686',
          variant: '#c3c6d7'
        },
        primary: {
          DEFAULT: '#132B4F',
          container: '#1d4277',
          content: '#ffffff',
          'fixed': '#dbe1ff',
          'fixed-dim': '#b4c5ff'
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#eeefff',
          'fixed': '#00174b',
          'fixed-variant': '#003ea8'
        },
        secondary: {
          DEFAULT: '#259B24',
          container: '#30bd2e',
          content: '#ffffff',
          'fixed': '#d3e4fe',
          'fixed-dim': '#b7c8e1'
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#54647a',
          'fixed': '#0b1c30',
          'fixed-variant': '#38485d'
        },
        tertiary: {
          DEFAULT: '#943700',
          container: '#bc4800',
          'fixed': '#ffdbcd',
          'fixed-dim': '#ffb596'
        },
        'on-tertiary': {
          DEFAULT: '#ffffff',
          container: '#ffede6',
          'fixed': '#360f00',
          'fixed-variant': '#7d2d00'
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6'
        },
        'on-error': {
          DEFAULT: '#ffffff',
          container: '#93000a'
        },
        background: '#faf8ff',
        'on-background': '#191b23',
        success: {
          DEFAULT: '#10B981', // Fallbacks for success/warning if needed, though not in yaml directly
          container: '#D1FAE5',
        },
        warning: {
          DEFAULT: '#F59E0B',
          container: '#FEF3C7',
        },
        border: '#c3c6d7' // outline-variant as default border
      },
      borderRadius: {
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
        'card': '0.5rem',
        'btn': '0.25rem',
        'input': '0.25rem'
      },
      spacing: {
        'gutter': '1.5rem',
        'stack-sm': '0.5rem',
        'stack-md': '1rem',
        'stack-lg': '2rem'
      },
      boxShadow: {
        'ambient': '0 4px 20px rgba(15, 23, 42, 0.03)',
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)', // flat-plus
      },
    },
  },
  plugins: [],
}
