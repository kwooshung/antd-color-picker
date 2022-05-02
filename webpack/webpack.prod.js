const { merge } = require('webpack-merge');
const WebpackTerserPlugin = require('terser-webpack-plugin');
const WebpackCssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { absPath, common } = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new WebpackTerserPlugin({
                terserOptions: {
                    compress: {
                        warnings: true,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log'] // 移除console
                    }
                }
            }),
            new WebpackCssMinimizerPlugin()
        ]
    }
});