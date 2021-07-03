import { storageOptions } from './config/storage'

/**
 * @description
 * <span style="color:red;font-weight:bold">封装localstorage过期时间控制</span>
 * @version 1.2.2
 * @author Ricardo
 */
class StorageCache {
    constructor() {
        this.options = storageOptions
    }
    /**
     * @description 
     * <span style="color:red;font-weight:bold">存缓存值</span>
     * |输入|说明|输出
     * |---|---|---
     * |key|缓存键|无
     * |data|缓存值|无
     * |expire|数据过期时间,不传默认使用配置文件的过期时间,传入0永久不过期|无
     * # Example
     * ```
     * import {StorageCache} from 'bt-tools'
     * StorageCache.set('test','测试')
     * ```
     * # 按需引入
     * ```
     * import StorageCache from 'bt-tools/StorageCache.js'
     * StorageCache.set('test','测试')
     * ```
     * @method
     * @param {String} key -缓存键
     * @param {String} data -需要存入storage的值 
     * @param {Number} expire -数据过期时间,不传默认使用配置文件的过期时间,传入0永久不过期
     * @returns 无
     * @version 1.2.2
     * @author Ricardo
     */
    set (key, data, expire) {
        if (expire) {
            // 覆盖配置的过期时间
            this.options = {
                ...this.options,
                expire
            }
        }

        let value = {
            data,
            expire: Date.now()
        }
        if (String(expire) === '0') {
            delete value.expire
        }
        try {
            localStorage.setItem(key, JSON.stringify(value))
            console.info(`[存storage]-[key]-[value]>>>:`, key, value);
        } catch (error) {
            console.info(`[存storage]:失败`);
        }
    }
    /**
     * @description
     * <span style="color:red;font-weight:bold">获取缓存值</span>
     * |输入|说明|输出
     * |---|---|---
     * |key|缓存key|data
     * # Example
     * ```
     * npm install bt-tools
     * import {StorageCache} from 'bt-tools'
     * StorageCache.get(key)
     * ```
     * # 按需引入
     * ```
     * import StorageCache from 'bt-tools/StorageCache.js'
     * StorageCache.get(key)
     * ```
     * @method
     * @param {String} key  -缓存键
     * @returns {Object} {data:xx,expire:xx} -缓存数据
     * @version 1.2.2
     * @author Ricardo
     */
    get (key) {
        let storage = localStorage.getItem(key)
        if (!storage) return
        storage = JSON.parse(storage)
        let { expire } = storage || {}
        if (expire) {
            if (expire + this.options.expire < Date.now()) {
                console.info(`[数据已过期]>>`)
                this.clear(key)
                return
            }
        }
        return storage
    }
    /**
     * @description
     * <span style="color:red;font-weight:bold">清除缓存</span>
     * |输入|说明|输出
     * |---|---|---
     * |key|传入缓存key|清除缓存
     * # Example
     * ```
     * import {StorageCache} from 'bt-tools'
     * StorageCache.clear(key)
     * ```
     * # 按需引入
     * ```
     * import StorageCache from 'bt-tools/StorageCache.js'
     * StorageCache.clear(key)
     * ```
     * @param {String} key  -传入缓存key
     * 
     * @returns  无
     * @version 1.2.2
     * @author Ricardo
     */
    clear (key) {
        if (!key) return
        try {
            localStorage.removeItem(key)
            console.info(`[移除storage]`);
        } catch (error) {
            console.info(`[移除error]>>`, error);
        }
    }
}

export default new StorageCache()