import Decimal from 'decimal.js'
/**
 * @description
 * <span style="color:red;font-weight:bold">传入一个字符串判断该字符串是否为json字符串</span>
 * |输入|输出
 * |---|---
 * |str|Boolean
 * # Example
 * ```
 * import {CommonFuns} from 'bt-tools'
 * CommonFuns.isJsonStr(str)
 * ```
 * # 按需引入
 * ```
 * import CommonFuns from 'bt-tools/libs/CommonFuns.js'
 * CommonFuns.isJsonStr(str)
 * ```
 * @param {String} str - 字符串
 * @return {Boolean}  true|false
 * @version 3.0.0
 * @author Ricardo
 */
function isJsonStr (str) {
    if (typeof str === 'string') {
        try {
            let obj = JSON.parse(str)
            if (typeof obj === 'object' && obj) {
                return true
            }
            return false
        } catch (error) {
            return false
        }
    }
}

/**
 * @description
 * <span style="color:red;font-weight:bold">加法工具函数</span>
 * |输入|说明|输出
 * |---|---|---
 * |x1|第一个加数|两数和
 * |x2|第二个加数|两数和
 * |precision|精度|两数和
 * |round|是否四舍五入(0:四舍五入；1:向下舍入)|两数和
 * # Example
 * ```
 * import {CommonFuns} from 'bt-tools'
 * CommonFuns.plus(x1,x2)
 * ```
 * # 按需引入
 * ```
 *  import CommonFuns from 'bt-tools/libs/commonFuns.js'
 * CommonFuns.plus(x1,x2)
 * ```
 * @param {Number} num1 -第一个加数
 * @param {Number} num2 -第二个加数
 * @returns Number|String
 * @version 3.0.0
 * @author Ricardo
 */
function plus (num1, num2) {
    let result = new Decimal(num1).add(num2).toNumber();
    return result;
}
/**
 * @description
 * <span style="color:red;font-weight:bold">减法工具函数</span>
 * |输入|说明|输出
 * |---|---|---
 * |x1|第一个减数|两数差
 * |x2|第二个减数|两数差
 * |precision|精度|两数差
 * |round|是否四舍五入(0:四舍五入；1:向下舍入)|两数差
 * # Example
 * ```
 * import {CommonFuns} from 'bt-tools'
 * CommonFuns.minus(x1,x2)
 * ```
 * # 按需引入
 * ```
 *  import CommonFuns from 'bt-tools/libs/commonFuns.js'
 * CommonFuns.minus(x1,x2)
 * ```
 * @param {Number} x1 -第一个减数
 * @param {Number} x2 -第二个减数
 * @param {Number} precision -保留小数精度
 * @param {Number} round -是否四舍五入;0:四舍五入,1:向下舍入
 * @returns Number
 * @version 3.0.0
 * @author Ricardo
 */
function minus (num1, num2) {
    let result = new Decimal(num1).sub(num2).toNumber();
    return result;
}
/**
 * @description
 * <span style="color:red;font-weight:bold">乘法工具函数</span>
 * |输入|说明|输出
 * |---|---|---
 * |x1|第一个乘数|两数乘
 * |x2|第二个乘数|两数乘
 * |precision|精度|两数乘
 * |round|是否四舍五入(0:四舍五入；1:向下舍入)|两数乘
 * # Example
 * ```
 * import {CommonFuns} from 'bt-tools'
 * CommonFuns.times(x1,x2)
 * ```
 * # 按需引入
 * ```
 *  import CommonFuns from 'bt-tools/libs/commonFuns.js'
 * CommonFuns.times(x1,x2)
 * ```
 * @param {Number} num1 -第一个乘数
 * @param {Number} num2 -第二个乘数
 * @returns Number|String
 * @version 3.0.0
 * @author Ricardo
 */
function times (num1, num2) {
    let result = new Decimal(num1).mul(num2).toNumber();
    return result;
}
/**
 * @description
 * <span style="color:red;font-weight:bold">除法工具函数</span>
 * |输入|说明|输出
 * |---|---|---
 * |x1|第一个除数|两数除
 * |x2|第二个除数|两数除
 * |precision|精度|两数除
 * |round|是否四舍五入(0:四舍五入；1:向下舍入)|两数除
 * # Example
 * ```
 * import {CommonFuns} from 'bt-tools'
 * CommonFuns.div(x1,x2)
 * ```
 * # 按需引入
 * ```
 *  import CommonFuns from 'bt-tools/libs/commonFuns.js'
 * CommonFuns.div(x1,x2)
 * ```
 * @param {Number} num1 -第一个除数
 * @param {Number} num2 -第二个除数
 * @returns Number|String
 * @version 3.0.0
 * @author Ricardo
 */
function div (num1, num2) {
    let result = new Decimal(num1).div(num2).toNumber();
    return result;
}
const obj = { isJsonStr, plus, minus, times, div }
export default obj

