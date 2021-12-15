const path = require('path')

module.exports = {
  entry: './src/init.js',
  target:'node',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: path.resolve(__dirname, 'public'),
  },
  resolve: {
    fallback: {
      util: require.resolve("util/")
    }
}
};