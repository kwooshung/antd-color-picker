/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const WebpackHtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMiniCssExtractPlugin = require('mini-css-extract-plugin');

// 相对路径转绝对路径
const absPath = _path => path.resolve(__dirname, _path);

const common = {
    entry: absPath('../docs/index.tsx'),
    output: {
        path: absPath('../docs/build'),
        filename: '[name].bundle.js',
        // publicPath: absPath('../docs'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    WebpackMiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    WebpackMiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new WebpackMiniCssExtractPlugin({
            filename: '[name].[hash:8].css'
        }),
        new WebpackHtmlWebpackPlugin({
            template: absPath('../docs/index.html'),
            filename: 'index.html',
            title: '@KwooShung/Antd Color Picker',
            version: ['1.0.0']
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': absPath('../src'),
            '@docs': absPath('../docs'),
            '@com': absPath('../src/components'),
            '@scripts': absPath('../src/assets/scripts/'),
            '@utils': absPath('../src/assets/scripts/utils/')
        }
    }
};

module.exports = {
    absPath,
    common
};