/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      gridTemplateRows: {
        'custom': '155px 126px 176px 24px', // Custom row heights,
        'custom2':'225px 45px 28px 35px 86px 120px 48px 111px 63px 35px 87px 140px 96px 25px 93px 20px 72px 25px 75px 65px 95px 65px 125px 125px 155px 35px',
        'custom2sm': 'auto',
        'custom2md': 'repeat(4, auto)',
        'custom2lg': 'repeat(6, auto)',
        'custom3': '405px, 40px, 74px, 292px, 78px, 148px, 179px, 119px, 221px, 64px, 160px, 195px, 51px, 48px, 152px, 205px, 160px, 81px, 164px, 273px, 133px, 264px, 50px, 73px, 373px, 96px'
      },
      gridTemplateColumns: {
        'custom': '40px 220px 250px', // Custom column widths
        'custom2':'20px 150px 23px 11px 20px 89px 83px 18px 18px 34px 103px 25px 35px 75px 10px 125px 37px',
        'custom22xl': '1fr 2fr 1fr 1fr 1fr 2fr 1fr 1fr 1fr 2fr 1fr 1fr 1fr 2fr 1fr 2fr 1fr',
        'custom2sm': 'repeat(2, minmax(0, 1fr))',
        'custom2md': 'repeat(3, minmax(0, 1fr))',
        'custom2lg': 'repeat(6, minmax(0, 1fr))',
        'custom3': '305px, 390px, 335px'
      },
      keyframes: {
        dots: {
          '0%, 20%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        }
      },
      animation: {
        'dot1': 'dots 1.4s infinite ease-in-out',
        'dot2': 'dots 1.4s infinite ease-in-out 0.2s',
        'dot3': 'dots 1.4s infinite ease-in-out 0.4s',
      }
    },
  },
  plugins: [],
};
