console.log('process.env.NODE_ENV', process.env.NODE_ENV)

const { parsed: localEnv } = require('dotenv').config()

console.log('localEnv', localEnv)

module.exports = {
  publicRuntimeConfig: {
    ...localEnv,
  },
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.css/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader'],
      },
    )

    return config
  },
  webpackDevMiddleware: config => config,
}
