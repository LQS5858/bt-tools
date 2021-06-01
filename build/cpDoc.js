const exec = require('child_process').exec
const { version } = require('../package.json')
const cmd = `cp-cli ./docs/bt-tools/${version} ./dist`

exec(cmd, err => {
    if (err) {
        console.log(`[cpDoc]:拷贝文件失败${err}`);
        return
    }
    console.log(`[cpDoc]:拷贝文件成功`);
})