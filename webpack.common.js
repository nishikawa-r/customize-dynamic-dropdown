const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: {
    desktop: './src/desktop/index.tsx',
    config: './src/config/index.ts',
    dynamicDropdown: './src/common/dynamicDropdown.ts',
    'kintone-api': './src/common/kintone-api.ts',
    static: './src/common/static.ts',
    kucTable: './src/common/kucTable.tsx',
    index: './src/desktop/index.tsx',
    test: './src/desktop/test.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
    alias: {
      '@common': path.resolve(__dirname, 'src/common'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(sass|less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      }
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
