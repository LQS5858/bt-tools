import { saveAs } from 'file-saver'
/**
 * @description
 * <span style="color:red;font-weight:bold">浏览器下载文件</span>
 * |输入|说明|格式
 * |---|---|---
 * |type|指定下载文件类型|'img'or'canvas'
 * |file|该参数为文件类型|base64 or canvas的blob
 * |filename|该参数指定下载文件名|'bt.xx'
 * # Example
 * ```
 * import {DownloadFile} from 'bt-tools'
 * DownloadFile(type = 'img', file, filename = 'bt')
 * ```
 * # 按需引入
 * ```
 * import DownloadFile from 'bt-tools/libs/DownloadFile.js'
 * DownloadFile(type = 'img', file, filename = 'bt')
 * ```
 * @param {String} type - 'img'|'canvas';该参数指定下载文件类型，目前支持下载图片和canvas画布
 * @param {Blob} file - base64｜canvas的blob数据，该参数为文件类型，当type为img文件类型需要传入图片base64,当type为canvas类型时，需要传入canvas的blob数据 
 * @param {String} filename -下载后的文件名
 * @returns 无
 * @author Ricardo
 * @version 1.2.4
 */
function DownloadFile (type = 'img', file, filename = 'bt') {
    /**
     * 创建一个正则表达式, 用户获取(image/png), (png), (iVBORw0KGgoAAAANSUh....)
     * */
    if (!file) return
    const obj = {
        'img': () => {
            const regex = new RegExp('^data:([^/]+/([^;]+));base64')
            // b64Data = ['image/png', 'png', 'iVBORw0KGgoAAAANSUh....']
            const data = file.replace(regex, '$1,$2').split(',')
            const contentType = data?.[0]
            //解码
            const raw = window.atob(data?.[2])
            const rawLength = raw?.length
            filename = `${filename}.${data?.[1]}`
            //二进制数组
            let uInt8Array = new Uint8Array(rawLength)
            for (let i = 0; i < raw.length; i++) {
                uInt8Array[i] = raw.charCodeAt(i)
            }
            let blob = new Blob([uInt8Array], { type: contentType })
            saveAs(blob, filename)
        },
        'canvas': () => {
            saveAs(file, `${filename}.png`)
        }
    }
    return obj[type]()
}

export default DownloadFile