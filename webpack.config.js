 require("webpack");


module.exports = {
  
  entry: './src/index.js',
  output: { path: __dirname, filename: 'bundle.js' },
  debug: true,
  devtool: "source-map", //Original Code
  //devtool: "cheap-source-map",  //transformed code
  devServer : {address: "localhost",port: 3000},
  
  

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query : {
          presets: ['es2015','react',"stage-0"]
         
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
}