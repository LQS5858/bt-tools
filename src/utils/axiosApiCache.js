import generateReqKey from '../generateReqKey'
/**
            * @description
            * <span style="color:red;font-weight:bold">根据axios接口传过来的配置开关，开启缓存则保存请求结果和调用cacel函数取消已缓存的接口</span>
            * |输入值|输出
            * |---|---
            * |该接口是否需要缓存数据|开启缓存
            * |接口数据缓存时效|过期清除
            * |是否开启缓存到localstroage|数据缓存到localstroage
            * @author Ricardo
            * @param {Boolean} cache - 接口传过来的配置参数
            * @param {Number|String} setExpireTime - 接口传过来的过期时间
            * @param {Boolean} storage - 覆盖localstorage的默认配置,是否开启浏览器本地缓存localstorage
            
            * @return null
            * @version 1.0.7
            */

class AxiosApiCache {
    constructor() {
        this.CACHES = {}
        this.initProxy()
        this.options = {
            storage: true,// 是否开启localstorage缓存
            storageKey: 'apiCache',
            storage_expire: 600000, //localstorage数据存储时间,刷新页面根据时间清除缓存
            expire: 1200000,//每个接口数据缓存时间20min，可通过接口传入配置修改
        }
        this.cache = window.localStorage.getItem(this.options.storageKey)
        if (this.cache) {
            let { storageExpire } = JSON.parse(this.cache)
            if (storageExpire && Date.now() - storageExpire < this.options?.storage_expire) return
        }
        console.log(`[初始化缓存]:>>>`);
        window.localStorage.setItem(this.options.storageKey, JSON.stringify({ data: {}, storageExpire: Date.now() }))
    }
    initProxy () {
        let _CACHE = {}
        const cacheHandler = {
            get: (target, key) => {
                let value = target?.[key]
                console.log(`[读取缓存]:>>>`, key, value);
                if (this.options?.storage && !value) {
                    value = this.getCacheItem(key)
                }
                return value
            },
            set: (target, key, value) => {
                target[key] = value
                console.log(`[加入缓存]:>>>`, key, value);
                if (this.options.storage) {
                    this.setCacheItem(key, value)
                }
                return true
            }
        }
        this.CACHES = new Proxy(_CACHE, cacheHandler)
    }
    getCacheItem (key) {
        let cache = window.localStorage.getItem(this.options?.storageKey)
        if (!cache) return
        const { data } = JSON.parse(cache)
        console.log(`[api取缓存key]:>>>`, key, data);
        return data?.[key] || null
    }
    setCacheItem (key, value) {
        let cache = window.localStorage.getItem(this.options?.storageKey)
        if (!cache) return
        let { data, storageExpire } = JSON.parse(cache)
        data[key] = value
        window.localStorage.setItem(this.options.storageKey, JSON.stringify({ data, storageExpire }))
        console.log(`[api数据已缓存]:>>>`, key, value);
    }
    requestInterceptor (config, axios) {

        let { cache, setExpireTime, storage, expire, storage_expire } = config || {}
        if (cache) {
            /**
             * 接口如果配置了storage是否开启浏览器缓存覆盖本地配置
             */
            this.options.storage = storage ? storage : this.options?.storage
            if (expire) {
                this.options = {
                    ...this.options,
                    expire
                }
            }
            if (storage_expire) {
                this.options = {
                    ...this.options,
                    storage_expire
                }
            }
            let data = this.CACHES?.[`${generateReqKey(config)}`]
            setExpireTime ? setExpireTime : (setExpireTime = this.options.expire)
            /**
             * 判断缓存数据是否存在，存在的话是否过期，没有过期就取消该次请求，返回缓存数据
             */
            console.log(`[接口存在缓存策略]:>>>`, data, setExpireTime, `${generateReqKey(config)}`);
            if (data && Date.now() - data?.expire < setExpireTime) {
                console.log(`[接口缓存未过期]:>>>`);
                config.cancelToken = new axios.cancelToken(cancel => {
                    cancel(data) //cancel函数传递给promise的catch
                })
            }
        }
    }
    responseInterceptor (response) {
        /**
         * 这个拦截添加到接口成功里面
         */
        const { config, data } = response || {}
        const { cache } = config || {}
        if (cache) {
            let _data = {
                expire: Date.now(),
                data
            }
            this.CACHES[`${generateReqKey(config)}`] = _data
        }
    }
}


export default new AxiosApiCache()