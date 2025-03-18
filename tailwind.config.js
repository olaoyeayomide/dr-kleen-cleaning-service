/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "C:/Users/ayomi/Desktop/Project/DrKleen Cleaning Services/dist/drkleen.html",
    "C:/Users/ayomi/Desktop/Project/DrKleen Cleaning Services/dist/drkleen.js",
    "C:/Users/ayomi/Desktop/Project/DrKleen Cleaning Services/dist/test.html",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        sm: ["2rem"],
        base: ["1.6rem", "2rem"],
      },
      colors: {
        primary: "#f5ca4f",
        secondary: "#007bff",
        gradientStart: "#ffdd52",
        gradientMid: "#f5ca4f",
        gradientEnd: "#c29f3e",
      },

      // ANIMATION
      // keyframes: {
      //   slideLeft: {
      //     "0%": { transform: "translateX(0)" },
      //     "100%": { transform: "translateX(-50%)" },
      //   },
      //   slideRight: {
      //     "0%": { transform: "translateX(0)" },
      //     "100%": { transform: "translateX(50%)" },
      //   },
      // },
      // animation: {
      //   slideLeft: "slideLeft 8s linear infinite alternate",
      //   slideRight: "slideRight 8s linear infinite alternate",
      // },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".magicpattern": {
          width: "100%",
          height: "100%",
          "background-size": "cover",
          "background-position": "center center",
          "background-repeat": "repeat",
          "background-image": "url('data:image/svg+xml;utf8,%3Csvg...')",
        },
      });
    }),
  ],
};
