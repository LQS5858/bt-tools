import Qs from 'qs'
import CommonFuns from './CommonFuns'
/**
 * @description
 * <span style="color:red;font-weight:bold">根据传入的对象生成缓存key</span>
 * |输入|说明|输出
 * |---|---|---
 * |Object|传入一个对象|key
 * 
 * # Example
 * ```
 * import {GenerateReqKey} from 'bt-tools'
 * GenerateReqKey({})
 * ```
 * # 按需引入
 * ```
 * import GenerateReqKey from 'bt-tools/libs/GenerateReqKey.js'
 * GenerateReqKey({})
 * ```
 * @author Ricardo
 * @param {Object} config - axios接口参数对象{} 
 * @return {String} key - 缓存key
 * @version 1.2.4
 */
function GenerateReqKey (config) {
    //响应的时候response.config中data是字符串，需要处理
    if (config?.data && CommonFuns.isJsonStr(config?.data)) {
        config.data = JSON.parse(config?.data)
    }
    const { method, url, params, data } = config || {}
    return [method, url, Qs.stringify(params), Qs.stringify(data)].join('_')
}


export default GenerateReqKey