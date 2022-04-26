const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 相对路径转绝对路径
const absPath = _path => path.resolve(__dirname, _path);

const common = {
    entry: absPath('../docs/index.js'),
    output: {
        path: absPath('../docs/build'),
        filename: '[name].bundle.js',
        publicPath: absPath('../docs'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css'
        }),
        new HtmlWebpackPlugin({
            path: absPath('../docs/index.html'),
            filename: 'index.html',
            title: '@KwooShung/Antd Color Picker'
        })
    ]
};

module.exports = {
    absPath,
    common
}