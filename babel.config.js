module.exports = {
  compact: false,
  env: {
    development: {
      sourceMaps: true,
      retainLines: true
    }
  },
  presets: [
    '@vue/app'
  ],
  plugins: [
    // 支持es2020链操作符 ?. ??
    '@babel/plugin-proposal-optional-chaining'
  ]
}
