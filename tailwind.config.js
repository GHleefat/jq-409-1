/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        rice: {
          50: "#FAF7F0",
          100: "#F5F0E6",
          200: "#EDE5D4",
          300: "#E2D6BC",
        },
        ink: {
          900: "#1A1A1A",
          800: "#2D2D2D",
          700: "#404040",
        },
        cinnabar: {
          500: "#C23A2B",
          600: "#A53022",
        },
      },
      fontFamily: {
        kai: ["'KaiTi'", "'Kaiti SC'", "'STKaiti'", "'BiauKai'", "serif"],
        song: ["'SimSun'", "'Songti SC'", "'STSong'", "'Noto Serif SC'", "serif"],
        fangsong: ["'FangSong'", "'FangSong_GB2312'", "'STFangsong'", "serif"],
      },
    },
  },
  plugins: [],
};
