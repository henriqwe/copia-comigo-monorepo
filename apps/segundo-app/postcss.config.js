// apps/primeiro-app/postcss.config.js
const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
    'postcss-import': {},
  },
};

// module.exports = {
//   plugins: [
//     require('postcss-import'),
//     require('tailwindcss'),
//     require('autoprefixer'),
//   ]
// }
