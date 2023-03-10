const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'dest'),
    filename: '[name].js',
  },
  // plugins: [
  //   new KintonePlugin({
  //     manifestJSONPath: './plugin/manifest.json',
  //     privateKeyPath: './private.ppk',
  //     pluginZipPath: './dist/plugin-prod.zip',
  //   }),
  // ],

  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       parallel: true,
  //       terserOptions: {
  //         compress: {
  //           drop_console: true,
  //         },
  //         format: {
  //           comments: false,
  //         },
  //       },
  //     }),
  //   ],
  // },
});
