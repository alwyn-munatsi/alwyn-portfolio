/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        figtree: ['Figtree', 'sans-serif'],
      },
      colors: {
        cyber: {
          bg:     '#060b14',
          navy:   '#0a1522',
          border: '#0f1e35',
          blue:   '#38bdf8',
          text:   '#c8d8f0',
          muted:  '#3a5a7a',
          dim:    '#1a3050',
        }
      },
    },
  },
  plugins: [],
}

