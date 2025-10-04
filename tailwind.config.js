/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'opacity': 'opacity 0.25s ease-in-out',
        'appearFromRight': 'appearFromRight 300ms ease-in-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'popup': 'popup 0.25s ease-in-out',
      },
      keyframes: {
        opacity: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        appearFromRight: {
          '0%': { opacity: '0.3', transform: 'translate(15%, 0px);' },
          '100%': { opacity: '1', transform: 'translate(0);' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        popup: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light', 'dark'], // Default themes, can be expanded
  },
}

