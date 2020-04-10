var path = require('path')
// 引入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var NODE_ENV = process.env.NODE_ENV
module.exports = {
  entry:
    NODE_ENV == 'development' ? './src/app.js' : './src/components/index.js',
  externals: {
    vue: 'vue',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'radvideo.js',
    library: 'radvideo',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    // 加载规则
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // 添加第一个规则：用于处理.css文件
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // 添加对less的支持
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      // 添加对图片功图标的支持
      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
            },
          },
        ],
      },
      // 添加babel的配置
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'babel-loader',
          // options里面的东西可以放到.babelrc文件中去
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  // 添加插件
  plugins: [
    new HtmlWebpackPlugin({
      // 添加配置
      template: 'index.html',
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // 对输出的 css 文件进行重命名
      filename: 'css/built.css',
    })
  ],
}
