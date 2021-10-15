module.exports = {
  api: {
    bodyParser: false,
  },
  env: {
    api: process.env.PORT + 'api/',
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    //   mySecret: 'secret',
    //   secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    apiUrl: 'api',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/public',
  },
  // webpack(config, options) {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/^pg-native$/));
    config.node = {
      ...(config.node || {}),
      net: 'empty',
      tls: 'empty',
      dns: 'empty',
      fs: 'empty',
    };

    config.plugins.push(
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
      })
    )
    return config;
  },
};
