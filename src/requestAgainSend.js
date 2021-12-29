/**
 * @description
 * <span style="color:red;font-weight:bold">当axios接口失败,获取配置重试次数，重新发送接口请求</span>
 * |输入|说明|输出
 * |---|---|---
 * |response|传入接口配置例如{retry:3,retryDelay:3000}|无

 * # Example
 * ```
 * import {RequestAgainSend} from 'bt-tools'
 * RequestAgainSend(response,axios)
 * ```
 * # 按需引入
 * ```
 * import RequestAgainSend from 'bt-tools/libs/RequestAgainSend.js'
 * RequestAgainSend(response,axios)
 * ```
 * @param {Object} error - axios响应错误拦截中error，再获取error中的error.config;例如{retry:3 //重试次数,retryDelay:3000 //延时多久重试}
 * @param {Object} axios - axios实例
 * @returns response
 * @version 2.2.8
 * @author Ricardo
 *
 */

function RequestAgainSend (response, axios) {

    const { config } = response || {}
    const { retry, retryDelay = 3000 } = config || {}
    console.log(`[RequestAgainSend-未重试前]:>>>`, retry, config?.__retryCount);
    if (!retry) return response
    // 重试计数
    config.__retryCount = config?.__retryCount || 0
    if (config?.__retryCount >= config?.retry) return response
    config.__retryCount += 1
    console.log(`[RequestAgainSend-准备重试]:>>>`, retry, config?.__retryCount);
    // 延时多久重发请求
    let backOff = new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            resolve()
            clearTimeout(id)
        }, retryDelay);
    })
    // 重新发起axios请求
    return backOff.then(() => {
        return axios(config)
    })
}

export default RequestAgainSend
