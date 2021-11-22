const path = require('path');
module.exports = {
  entry: './src/code.ts',
  mode : "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { test: /\.css$/, 
        use: ['style-loader', 
        { loader: 'css-loader' }]
      },
      { test: /\.(png|jpg|gif|webp|svg)$/,
       loader: 'url-loader'
       },
    ],
  },
  
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: 'code.js',
    path: path.resolve(__dirname, 'dist')
  },
};