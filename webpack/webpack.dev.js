const { merge } = require('webpack-merge');
const { absPath, common } = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    target: 'web',
    devtool: 'inline-source-map',
    devServer: {
        //contentBase: absPath('../docs'),
        host: '127.0.0.1',
        port: 8000,
        hot: true,
        open: true
    }
});