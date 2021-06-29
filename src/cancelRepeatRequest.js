import GenerateReqKey from './GenerateReqKey'


/**
 * @description
 * <span style="color:red;font-weight:bold">通过接口传入配置开关{cancelRequest:true}决定是否开启axios取消重复请求</span>
 * |输入|说明|输出
 * |---|---|---
 * |config|例如:{cancelRequest:true}|无
 * # Example
 *
 * ```
 * import {CancelRepeatRequest} from 'bt-tools'
 * CancelRepeatRequest.addPendingRequest(config)
 * ```
 * # 按需引入
 * ```
 * import CancelRepeatRequest from 'bt-tools/libs/CancelRepeatRequest.js'
 * CancelRepeatRequest.addPendingRequest(config)
 * ```
 * @param {Object} config - 该参数为axios的请求拦截的配置参数config,如{cancelRequest:true}
 * @return 无
 * @version 1.1.0
 * @author Ricardo
 */
let pendingRequest = new Map() //map保存键值对，任何值(对象或者原始值)都可以作为键

function addPendingRequest (config, axios) {
    const { cancelRequest } = config || {}
    console.log(`[接口是否配置取消请求]:>>>`, cancelRequest);
    if (cancelRequest) {
        const requestKey = GenerateReqKey(config)
        if (pendingRequest.has(requestKey)) {
            config.cancelToken = new axios.CancelToken(cancel => {
                console.log(`[请求已取消]:>>>`, config.url);
                cancel(`${config.url} 请求已取消`)
            })
        } else {
            config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
                pendingRequest.set(requestKey, cancel)
            })
        }
    }

}

/**
 * @description
 * <span style="color:red;font-weight:bold">axios响应正常移除pendingReques中键值对</span>
 * |输入|输出
 * |---|---
 * |response|无
 * # Example
 * ```
 * import {CancelRepeatRequest} from 'bt-tools'
 * CancelRepeatRequest.removePendingRequest(response)
 * ```
 * # 按需引入
 * ```
 * import CancelRepeatRequest  from 'bt-tools/libs/CancelRepeatRequest.js'
 * CancelRepeatRequest.removePendingRequest(response)
 * ```
 * @param {Object} response -axios响应拦截对象
 * @return 无
 * @version 1.1.0
 * @author Ricardo
 */

function removePendingRequest (response) {
    const { cancelRequest } = response?.config || {}
    console.log(`[响应成功打印重复请求取消配置]:<<<`, cancelRequest);
    if (cancelRequest) {
        const requestKey = GenerateReqKey(response?.config)
        if (pendingRequest.has(requestKey)) {
            const cancelToken = pendingRequest.get(requestKey)
            console.log(`[响应成功开始移除请求键]:<<<`, requestKey);
            cancelToken(requestKey)
            pendingRequest.delete(requestKey)
        }
    }
}

const obj = { removePendingRequest, addPendingRequest }

export default obj