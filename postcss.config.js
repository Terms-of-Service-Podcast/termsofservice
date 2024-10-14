module.exports = {
  plugins: [
      require('autoprefixer')({
          grid: true,
          overrideBrowserslist: ['defaults']
      }),
      require('cssnano')({
          preset: 'default'
      })
  ]
};