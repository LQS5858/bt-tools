

/**
 * @description
 * <span style="color:red;font-weight:bold">检查字符串是否为json字符串</span>
 * |输入|输出
 * |---|---
 * |str|Boolean
 * # Example
 * ```
 * import {CommonFuns} from 'bt-tools'
 * CommonFuns.isJsonStr(str)
 * ```
 * @param {String} str - 字符串
 * @return {Boolean}  true|false
 * @version 1.0.7
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
const obj = { isJsonStr }
export default obj

