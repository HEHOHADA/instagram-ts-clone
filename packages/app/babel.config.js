module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
          alias: {
            'components': './components',
            'constants': './constants',
            'screens': './screens',
            'hooks': './hooks',
            'types': './types',
            'navigation': './navigation',
            'generated': './generated',
            'lib': './lib',
            'apollo': './apollo'
          }
        }
      ]
    ]
  }
}
