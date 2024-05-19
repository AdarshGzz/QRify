/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': `
          radial-gradient(100% 100% at 100% 100%, #0000 46%,#905fb0 47% 53%,#0000 54%) 12px 12px,
          radial-gradient(100% 100% at 0 0, #0000 46%,#905fb0 47% 53%,#0000 54%) 12px 12px,
          radial-gradient(100% 100%, #0000 22%, #905fb0 23% 29%, #0000 30% 34%, #905fb0 35% 41%, #0000 42%)
          #fb7d98`
      },
      backgroundSize: {
        '24': '24px 24px'
      }
    },
  },
  plugins: [],
};
