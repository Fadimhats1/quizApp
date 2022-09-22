/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: { boxShadow: {
      'solid1': '0px 8px 0px 0px rgb(190, 18, 60)',
      'solid2': '0px 8px 0px 0px rgb(180, 83, 9)',
      'solid3': '0px 8px 0px 0px rgb(29, 78, 216)',
      'solid4': '0px 8px 0px 0px rgb(4, 120, 87)',

    }},
  },
  plugins: [],
}
