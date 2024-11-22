/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "C:/Users/ayomi/Desktop/Project/DrKleen Cleaning Services/drkleen.html",
    "C:/Users/ayomi/Desktop/Project/DrKleen Cleaning Services/drkleen.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        "permanent-marker": ['"Permanent Marker"', "cursive"],
      },
    },
  },
  plugins: [],
  // Configure file watcher to ignore system files
  watchOptions: {
    ignored: [
      "C:/DumpStack.log.tmp", // Add any system file you want to ignore
    ],
  },
};
