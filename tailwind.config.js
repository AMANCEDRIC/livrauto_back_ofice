/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#f7f9fb', // Base layer
          container: {
            low: '#f0f4f7', // Primary blocks
            lowest: '#ffffff', // Interactive/Floating
            high: '#e3e9ed', // Deep/Recessed
          }
        },
        'on-surface': {
          DEFAULT: '#2c3437',
          variant: '#5f696d'
        },
        primary: {
          DEFAULT: '#1554d9',
          container: '#4d80ff', // Used for gradients
          'fixed-dim': '#0f3c9b' // Used for selection backgrounds
        },
        'on-primary': '#ffffff',
        secondary: {
          container: '#d3e4fe'
        },
        'on-secondary-container': '#103987',
        tertiary: {
          container: '#e8f3ee' // E.g., for statuses
        },
        'on-tertiary-container': '#1a563b',
        error: {
          DEFAULT: '#d91530',
          container: '#fde3e6'
        }
      },
      boxShadow: {
        'ambient': '0 1.5rem 2rem rgba(44, 52, 55, 0.06)',
      },
      borderOpacity: {
        '15': '0.15'
      }
    },
  },
  plugins: [],
}
