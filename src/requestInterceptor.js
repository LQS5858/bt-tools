import AxiosApiCache from './utils/axiosApiCache'


/**
 * @description
 * <span style="color:red;font-weight:bold">通过传入axios接口配置参数{cache:true}是否开启对api数据缓存</span>
 * |输入|说明|输出
 * |---|---|---
 * |axios接口传入配置config|{cache:true //是否开启接口数据缓存,setExpireTime:时间戳 //缓存时效长,storage:true //覆盖storage的配置；是否开启存储到localstorage,storage_expire:时间戳 //覆盖storage的配置；localstorage数据时效长,expire:时间戳 //覆盖storage的配置；缓存接口数据时效长}|无
 
 * # Example
 * 
 * ```
 * import {RequestInterceptor}  from 'bt-tools'
 * RequestInterceptor(config,axios)
 * ```
 * # 按需引入
 * ```
 * import RequestInterceptor from 'bt-tools/libs/RequestInterceptor.js'
 * RequestInterceptor(config,axios)
 * ```
 * @author Ricardo
 * @param {Object} config - axios传入参数配置对象；例如{cache:true //是否开启接口数据缓存,setExpireTime:时间戳 //缓存时效长,storage:true //覆盖storage的配置；是否开启存储到localstorage,storage_expire:时间戳 //覆盖storage的配置；localstorage数据时效长,expire:时间戳 //覆盖storage的配置；缓存接口数据时效长}
 * @reutrn 无
 * @version 1.1.0
*/

function RequestInterceptor (config, axios) {
  AxiosApiCache.requestInterceptor(config, axios)
}

export default RequestInterceptor