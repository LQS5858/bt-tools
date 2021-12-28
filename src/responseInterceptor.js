import AxiosApiCache from './utils/axiosApiCache'


/**
 * @description
 * <span style="color:red;font-weight:bold">axios响应拦截,当接口返回成功对数据进行缓存</span>
 * # Example
 * ```
 * import {ResponseInterceptor} from 'bt-tools'
 * ResponseInterceptor(response)
 * ```
 * # 按需引入
 * ```
 * import ResponseInterceptor from 'bt-tools/libs/ResponseInterceptor.js'
 * ResponseInterceptor(response)
 * ```
 * @param {Object} response - axios响应后的对象
 * @return 无
 * @version 2.2.4
 * @author Ricardo
 */

function ResponseInterceptor (response) {
    AxiosApiCache.responseInterceptor(response)
}


export default ResponseInterceptor