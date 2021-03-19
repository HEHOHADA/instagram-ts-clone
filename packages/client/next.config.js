const withTranspileModules = require('next-transpile-modules')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const isProduction = process.env.NODE_ENV === 'production'

module.exports = withBundleAnalyzer(
  withTranspileModules({
    transpileModules: ['camelcase', 'dashify'],
    webpack: (config, options) => {
      const originalEntry = config.entry
      config.entry = async () => {
        return await originalEntry()
      }
      if(!isProduction) {
        config.plugins.push(
          new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true
          })
        )
      }

      return config
    }
  })
)
