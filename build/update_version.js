const path = require('path')
const fs = require('fs')
const { version } = require('../package.json')
const files = fs.readdirSync(path.resolve(__dirname, '../src'))
console.log(files);

files.forEach(item => {
    const _regex = /\.js$/gi
    if (!_regex.test(item)) return
    let fileItem = fs.readFileSync(path.resolve(__dirname, `../src/${item}`), 'utf8')
    const regex = /@version\s*(.*)/
    fileItem = fileItem.replace(regex, `@version ${version}`)
    fs.writeFileSync(path.resolve(__dirname, `../src/${item}`), fileItem)
})