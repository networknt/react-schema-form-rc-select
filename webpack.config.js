var webpack = require('webpack');
module.exports = {
  entry: './src/index',
  output: {
    filename: 'dist/react-schema-form-rc-select.min.js',
    library: 'ReactSchemaFormRcSelect',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react'
    }
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel"},
      {test: /\.css?$/, exclude: /node_modules/, loader: 'style!css'},
    ]
  }
};
