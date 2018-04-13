module.exports = {
  context: __dirname, // we just want to use $cwd
  entry: {
    actr: [
      './src/ActionCreator.js'
    ]
  },
  output: {
    path: __dirname + '/dist',
    // filename is the name of the output file that will be compiled by Webpack
    filename: '[name].js',
    publicPath: '/',
    library: 'ActR',
    libraryTarget: 'umd'
  },
  module: {
    // our loaders are our transpilers and interpreters such as Babel
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/, // we expect our node modules to already be transpiled
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0']
      }
    }]
  },
  resolve: {
    extensions: ['.js']
  }
};
