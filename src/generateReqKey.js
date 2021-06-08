import Qs from 'qs'
import CommonFuns from './commonFuns'
/**
 * @description
 * <span style="color:red;font-weight:bold">根据传入的参数生成缓存key</span>
 * |输入|输出
 * |---|---
 * |接口参数|key
 * @author Ricardo
 * @param {Object} config - axios接口参数对象 
 * @return {String} key - 缓存key
 * @version 1.0.7
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