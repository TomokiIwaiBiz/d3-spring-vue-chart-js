//
// Webpack開発環境用設定ファイル
//
let _ = require('lodash');
let webpack = require('webpack');

let base = require('./webpack.base.conf');

module.exports = _.merge({}, {
  plugins: [
    // いろいろなところで不都合が生じるので設定を忘れないように注意
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'}})
  ]
}, base);
