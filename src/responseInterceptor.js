import AxiosApiCache from './utils/axiosApiCache'


/**
 * @description
 * <span style="color:red;font-weight:bold">axios响应拦截,接口成功对数据进行缓存</span>
 * @param {Object} response - axios响应后的对象
 * @return 无
 * @version 1.0.7
 * @author Ricardo
 */

function ResponseInterceptor (response) {
    AxiosApiCache.responseInterceptor(response)
}


export default ResponseInterceptor