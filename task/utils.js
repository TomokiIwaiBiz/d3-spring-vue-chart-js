let path = require('path');

/**
 * プロジェクトルートディレクトリからの相対パスを絶対パスに解決します。
 *
 * @param dir 相対パス
 */
exports.resolvePath = dir => path.join(__dirname, '../', dir)
