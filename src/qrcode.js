import QrCode from 'qrcode'

/**
 * @description
 * <span style="color:red;font-weight:bold">基于qrcode二次开发,生成带logo的二维码</span>
 * |输入值|默认值|输出
 * |---|---|---|
 * |二维码内容|--|二维码dom
 * |页面canvas对象|--|二维码dom
 * |logo图片dom||--|二维码dom
 * |配置options|{width: 200,height: 200, margin: 0}|二维码dom
 * |logo配置|{width:40,height:40}|二维码dom
 * @author Ricardo
 * @param {String|Object} content -生成canvas的内容
 * @param {Object} canvas -页面canvas对象
 * @param {dom} imgDom -logo图片dom
 * @param {Object} options -二维码配置,默认值{width: 200,height: 200,margin: 0}
 * @param {Object} logoOption -中间logo配置{width:40,height:40}
 * @return {Object} -生成二维码dom
 * @version 2.2.4
 */

class Qrcode {
    constructor(content, canvas, imgDom, options = {
        width: 200,
        height: 200,
        margin: 0
    }, logoOption = { width: 40, height: 40 }) {
        this.content = content
        this.canvas = canvas
        this.imgDom = imgDom
        this.options = options
        this.logoOption = logoOption
    }
    //logo转canvas
    imgToggleCanvas = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        const { width, height } = this.logoOption || {}
        ctx.fillRect(0, 0, width, height);		//先画一个40*40的正方形，颜色#ffffff，此处因为logo图片四周没有留白
        ctx.drawImage(this.imgDom, 0, 0, width, height);		//将 32*32 的 logoImg 画到 canvas 上
        return canvas;
    }
    getLogoComputeStyle (generateCanvas) {
        const { width, height } = generateCanvas || {}
        const { width: logoWidth, height: logoHeight } = this.logoOption || {}
        const x = width / 2 - logoWidth / 2
        const y = height / 2 - logoHeight / 2
        return {
            x,
            y
        }
    }
    //生成logo的canvas与二维码合并
    mergeCanvas = (generateCanvas) => {		//生成的二维码 canvas	
        const logoCavans = this.imgToggleCanvas();		//第2步里面的转换后的canvas
        const canvas = document.createElement('canvas');
        canvas.width = generateCanvas.width;
        canvas.height = generateCanvas.height;
        const { x, y } = this.getLogoComputeStyle(generateCanvas)
        canvas.getContext('2d').drawImage(generateCanvas, 0, 0);	//将 generateCanvas 画到 canvas 上，坐标 0，0
        canvas.getContext('2d').drawImage(logoCavans, x, y);	//将 logoCavans 画到 canvas 上，坐标 80，80
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.canvas.getContext('2d').drawImage(canvas, 0, 0);
    }
    /**
     * @description
     * <span style="color:red;font-weight:bold">生成二维码方法</span>
     * # Example
     * ```
     * import {Qrcode} from 'bt-tools'
     * new Qrcode(content, canvas, imgDom).ricardoQrcode().then(res=>{})
     * ```
     * # 按需引入
     * ```
     * import Qrcode  from 'bt-tools/libs/Qrcode.js'
     * new Qrcode(content, canvas, imgDom).ricardoQrcode().then(res=>{})
     * ```
     * @method
     * @version 2.2.4
     * @author Ricardo
     * @returns Promise
     */
    ricardoQrcode = () => {
        return new Promise((resolve, reject) => {
            QrCode.toCanvas(this.content, this.options).then(el => {
                this.mergeCanvas(el)
                resolve("二维码生成成功!")
            }).catch(e => {
                reject(`二维码生成失败,${e}`)
            })
        })
    }
}


export default Qrcode