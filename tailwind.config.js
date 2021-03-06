module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: process.env.NODE_ENV !== "production" ? [{ pattern: /.*/ }] : [],
};
