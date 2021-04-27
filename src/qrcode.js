import QrCode from 'qrcode'

/**
 * @description
 * <span style="color:red;font-weight:bold">基于qrcode二次开发,生成带logo的二维码</span>
 * |输入值|输出
 * |---|---
 * |二维码内容|二维码dom
 * |页面canvas对象|二维码dom
 * |logo图片dom|二维码dom
 * |配置options|二维码dom
 * @param {String|Object} content -生成canvas的内容
 * @param {Object} canvas -页面canvas对象
 * @param {dom} imgDom -logo图片dom
 * @param {Object} options -二维码配置
 * @return {Object} -生成二维码dom
 * @version 1.0.2
 */

class Qrcode {
    constructor(content, canvas, imgDom, options = {
        width: 200,
        height: 200,
        margin: 0
    }) {
        this.content = content
        this.canvas = canvas
        this.imgDom = imgDom
        this.options = options
    }
    //logo转canvas
    imgToggleCanvas = () => {
        const canvas = document.createElement('canvas');

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 40, 40);		//先画一个40*40的正方形，颜色#ffffff，此处因为logo图片四周没有留白
        ctx.drawImage(this.imgDom, 4, 4, 32, 32);		//将 32*32 的 logoImg 画到 canvas 上
        return canvas;
    }
    //生成logo的canvas与二维码合并
    mergeCanvas = (generateCanvas) => {		//生成的二维码 canvas	
        // const { qrcodeCanvas } = this.$refs;
        const logoCavans = this.imgToggleCanvas();		//第2步里面的转换后的canvas
        const canvas = document.createElement('canvas');
        canvas.width = generateCanvas.width;
        canvas.height = generateCanvas.height;
        canvas.getContext('2d').drawImage(generateCanvas, 0, 0);	//将 generateCanvas 画到 canvas 上，坐标 0，0
        canvas.getContext('2d').drawImage(logoCavans, 80, 80);	//将 logoCavans 画到 canvas 上，坐标 80，80
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.canvas.getContext('2d').drawImage(canvas, 0, 0);
    }
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


export default RicardoQrcode