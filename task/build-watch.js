let webpack = require('webpack');

// =========================================================================
// 設定ファイル
// =========================================================================
let webpackConfig = require('./webpack.dev.conf');

// =========================================================================
// 設定
// =========================================================================
webpackConfig['watch'] = true;


webpack(webpackConfig, (err, stats) => {
  if (err) throw err;

  process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');
});
