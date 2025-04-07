/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "C:/Users/ayomi/Desktop/Project/DrKleen Cleaning Services/dist/drkleen.html",
    "C:/Users/ayomi/Desktop/Project/DrKleen Cleaning Services/dist/drkleen.js",
    "C:/Users/ayomi/Desktop/Project/DrKleen Cleaning Services/dist/test.html",
    "C:/Users/ayomi/Desktop/Project/DrKleen Cleaning Services/src/input.css",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        bree: ['"Bree Serif"', "serif"],
        public: ['"Public Sans"', "sans-serif"],
      },
      colors: {
        primary: "#f5ca4f",
        secondary: "#007bff",
        // Yellow gradient colors
        gradientStart: "#ffdd52",
        gradientMid: "#f5ca4f",
        gradientEnd: "#c29f3e",
        // White gradient colors
        whiteGradientStart: "#ffffff", // pure white
        whiteGradientMid: "#f3f4f6", // soft light gray
        whiteGradientEnd: "#ffffff",
      },

      backgroundImage: {
        "bubble-bg":
          "linear-gradient(to left, transparent, #fff 100%), url('https://i.ibb.co/hRBS6xzR/freepik-adjust-80776.png')",
      },

      // BUBBLE ANIMATION
      animation: {
        float: "float 8s infinite ease-in-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
