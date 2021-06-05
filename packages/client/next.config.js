/* eslint-disable */

const CircularDependencyPlugin = require('circular-dependency-plugin')
const nodeExternals = require('webpack-node-externals')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const isProduction = process.env.NODE_ENV === 'production'

module.exports = withBundleAnalyzer({
    transpileModules: ['camelcase', 'dashify'],
    future: {
      webpack5: true
    },
    webpack: (config, options) => {
      const originalEntry = config.entry
      config.entry = async () => {
        return await originalEntry()
      }

      return config
    }
  }
)
