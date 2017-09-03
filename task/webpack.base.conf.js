let _ = require('lodash');
let config = require('./config');

const babelLoader = {
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    presets: ['es2015', 'stage-1', 'stage-2'],
    plugins: ['transform-decorators-legacy', 'transform-class-properties', 'transform-runtime']
  }
};

module.exports = {
  /**
   * ブラウザライクな環境用にビルドすることを明示
   */
  target: 'web',
  /**
   * ビルドの基点ファイル設定
   */
  entry: {
    'd3': config.srcPath + '/d3.js'
  },
  /**
   * 出力先の設定
   */
  output: {
    path: config.distPath,
    filename: '[name].js',
    publicPath: '/js/'
  },
  /**
   * require構文で解決する条件の設定
   */
  resolve: {
    // 拡張子
    extensions: ['.js', '.json', '.vue'],
    // エイリアス
    alias: {
      '@': config.srcPath
    }
  },
  /**
   * ビルド時に適用するローダーの設定
   */
  module: {
    rules: [
      /**
       * ES2015をbabelで処理する(*.js)
       */
      _.merge({}, babelLoader, {
        test: /\.js$/
      }),
      /**
       * Vue単一コンポーネントファイル(*.vue)
       */
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // js言語ブロックをカスタムしたbabel-loaderで処理
          loaders: {js: babelLoader}
        }
      }
    ]
  }
};
