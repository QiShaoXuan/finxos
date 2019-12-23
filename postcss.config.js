var autoprefixer = require('autoprefixer')
module.exports = {
  plugins: [
    autoprefixer({
      cascade: true,
    }),
  ],
}

// module.exports = {
//   parser: 'sugarss',
//   plugins: {
//     'postcss-import': {},
//     'postcss-cssnext': {},
//     'cssnano': {}
//   }
// }
