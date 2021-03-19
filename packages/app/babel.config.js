module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './components',
            '@constants': './constants',
            '@screens': './screens',
            '@hooks': './hooks',
            '@ui': './components/ui',
            '@type': './types',
            '@navigation': './navigation'
          }
        }
      ]
    ]
  }
}
