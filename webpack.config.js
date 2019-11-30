module.exports = {
  entry: ['react-hot-loader/patch', './src/index'],
  output: {
    filename: 'react-schema-form-rc-select.min.js',
    path: __dirname + '/dist',
    library: 'ReactSchemaFormRcSelect',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  externals: {
    'react': {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      amd: 'react-dom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    }
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: [{
        loader: 'babel-loader'
      }]},
    ]
  }
};
