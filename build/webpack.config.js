
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const pkg = require('../package.json')
const uppercamelcase = require('uppercamelcase')
const name = uppercamelcase(pkg.name)

module.exports = {
    entry: {
        btTools: path.resolve(__dirname, '../index.js'),
        'btTools.min': path.resolve(__dirname, '../index.js')  //min.js为压缩文件
    },
    output: {
        path: path.resolve(__dirname, '../libs'),
        filename: '[name].js',
        library: name,
        libraryTarget: "umd",
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: [path.resolve(__dirname, '../node_modules')] }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJSPlugin({
                include: /\.min\.js$/
            })
        ]
    },
    mode: 'production'
}