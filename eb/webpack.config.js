const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  devtool: 'source-map',
  entry: {
    app: './app.jsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, './src/img/'),
      components: path.resolve(__dirname, './src/components/'),
      pages: path.resolve(__dirname, './src/pages/'),
      js: path.resolve(__dirname, './src/'),
      utils: path.resolve(__dirname, './src/utils/'),
      styles: path.resolve(__dirname, './src/styles/')
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015'] },
        }],
      },
      {
        test: /\.(png|svg|jpe?g)$/,
        use: 'file-loader',
      },
    ],
  },
};
