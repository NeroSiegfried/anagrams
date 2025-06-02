// postcss.config.js

module.exports = {
  plugins: {
    // Allow @import rules in your CSS
    "postcss-import": {},

    // Tailwind v4’s PostCSS plugin
    "@tailwindcss/postcss": {},

    // Autoprefixer for vendor prefixes
    autoprefixer: {},
  },
};
