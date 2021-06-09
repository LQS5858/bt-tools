const fs = require('fs')

const path = require('path')
const funBasePath = './src/'
let obj = {}
try {
    const files = fs.readdirSync(path.resolve(__dirname, '../src'))
    const utilRegex = /utils/gi
    files.forEach(item => {
        if (utilRegex.test(item)) return
        const name = item.split('.')[0]
        obj[name] = `${funBasePath}${item}`
    })
    fs.writeFileSync(path.resolve(__dirname, '../utilsCommon.json'), JSON.stringify(obj))
    console.log('files>>>', files);
} catch (error) {
    console.log(`[读取文件夹失败]`, error);
}