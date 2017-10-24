module.exports = {
  context: __dirname, // we just want to use $cwd
  // entry is the file that renders our React app.
  entry: {
    actn: [
      './src/ActionCreator.js'
    ]
  },
  output: {
    path: __dirname + '/dist',
    // filename is the name of the output file that will be compiled by Webpack
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    // our loaders are our transpilers and interpreters such as Babel
    loaders: [{
      test: /\.js$/, // we tell babel to look for js and jsx files
      exclude: /node_modules/, // we expect our node modules to already be transpiled
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0'] // we need to use this preset so that Babel doesn't choke on JSX syntax
      }
    }, {
      test: /\.s?css$/,
      loaders: ['style', 'css', 'sass']
    }]
  },
  resolve: {
    extensions: ['.js']
  }
};
