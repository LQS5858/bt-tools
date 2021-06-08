import AxiosApiCache from './utils/axiosApiCache'


/**
 * @description
 * 
 * <span style="color:red;font-weight:bold">axios请求拦截是否缓存接口数据策略</span>
 * |输入|输出
 * |---|---
 * |config-{cache:true,setExpireTime:ms,storage:true}|无
 * @author Ricardo
 * @param {Object} config - axios传入参数配置对象,包含三个属性；例如{cache:布尔是否开启缓存,setExpireTime:时间戳-数据时效长,storage:布尔-是否缓存到localstorage}
   @reutrn 无
   @version 1.0.7
*/

function RequestInterceptor (config, axios) {
    AxiosApiCache.requestInterceptor(config, axios)
}

export default RequestInterceptor