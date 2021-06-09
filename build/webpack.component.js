const path = require('path')
const Uglifyjs = require('uglifyjs-webpack-plugin')
let { name } = require('../package.json')
const uppercamelcase = require('uppercamelcase')
const entry = require('../utilsCommon.json')
const isDebugger = process.env.NODE_ENV === 'debugger' ? true : false

name = uppercamelcase(name)

const config = {
    mode: 'production',
    entry,
    output: {
        path: path.resolve(__dirname, '../libs'),
        filename: '[name].js',
        library: name,
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [path.resolve(__dirname, '../node_modules')]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new Uglifyjs({
                uglifyOptions: {
                    drop_console: !isDebugger,
                    drop_debugger: !isDebugger
                }
            })
        ]
    }
}


module.exports = config

