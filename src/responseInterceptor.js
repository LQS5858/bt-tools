import AxiosApiCache from './utils/axiosApiCache'


/**
 * @description
 * <span style="color:red;font-weight:bold">axios响应拦截,当接口返回成功对数据进行缓存</span>
 * # Example
 * ```
 * import {ResponseInterceptor} from 'bt-tools'
 * ResponseInterceptor(response)
 * ```
 * @param {Object} response - axios响应后的对象
 * @return 无
 * @version 1.1.0
 * @author Ricardo
 */

function ResponseInterceptor (response) {
    AxiosApiCache.responseInterceptor(response)
}


export default ResponseInterceptor