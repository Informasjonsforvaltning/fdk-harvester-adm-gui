import merge from 'webpack-merge';

import baseConfig from './base.config';

export default merge(baseConfig, {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: '[name].[contenthash].js'
  },
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      maxSize: 40000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: module =>
            `vendor.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`
        }
      }
    }
  }
});
