const webpack = require("webpack");

/**
 * Extend the webpack config in create-foxglove-extension to disable code splitting. With default config, code splitting
 * into more than one bundle causes file load errors in Foxglove Studio.  It's unclear how best to set the path and
 * publicPath so that it works in both desktop and web deployment scenarios.
 *
 * NOTE: I haven't found the documentation on this method of extending the webpack config by using a config.ts file, but
 * it works. I discovered it from the source code of the webworker example in create-foxglove-extension repo.
 *
 * @see https://github.com/foxglove/create-foxglove-extension/blob/main/src/webpackConfigExtension.ts
 *
 * @param {import('webpack').Configuration} config
 */
module.exports = {
  // @ts-ignore
  webpack: (config) => {
    // NOTE: Setting the publicPath explicitly like this allowed extension to work in desktop mode, but not in web mode:
    // config.output = {
    //   publicPath: config.output.path + "/",
    //   ...config.output,
    // };

    // So instead:

    // Effectively disable code splitting by limiting max chunks to 1
    config.plugins = [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ];

    return config;
  },
};
