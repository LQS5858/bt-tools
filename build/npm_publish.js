const exec = require('child_process').exec;


const cmd = 'npm run publish'

exec(cmd, err => {
    if (err) {
        console.log('发布失败', err);
        return
    }
    console.log('发布成功!');
})
