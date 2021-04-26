import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
const path = require('path')

export default {
    input: 'index.js',
    output: {
        file: path.resolve(__dirname, './libs/bundle.js'),
        format: 'umd',
        name: 'bundle'
    },
    plugins: [
        uglify(),
        resolve()
    ]
}