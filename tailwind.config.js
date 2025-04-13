/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dist/**/*.{html,js,ts,tsx}",
    "./src/**/*.{html,js,ts,tsx,css}",
    "./node_modules/preline/dist/*.js",
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
        whiteGradientStart: "#ffffff",
        whiteGradientMid: "#f3f4f6",
        whiteGradientEnd: "#ffffff",
      },
      backgroundImage: {
        "bubble-bg":
          "linear-gradient(to left, transparent, #fff 100%), url('https://i.ibb.co/hRBS6xzR/freepik-adjust-80776.png')",
      },
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
  plugins: [require("preline/plugin")],
};
