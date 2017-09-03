let webpack = require('webpack');

// =========================================================================
// 設定ファイル定義
// =========================================================================
let webpackConfig = require('./webpack.prod.conf');

// =========================================================================
// 設定
// =========================================================================
webpack(webpackConfig, (err, stats) => {
  if (err) throw err;

  process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
});
