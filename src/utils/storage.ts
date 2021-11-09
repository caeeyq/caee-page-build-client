/**
 * localStorage 封装
 *
 * @author 俞杰
 * @email 158392613@qq.com
 */
import config from '@/config'

interface Storage {
  currentUser?: { token: string }
}

class StorageUtil {
  /**
   * 获取项目下配置的命名空间中的localStorage的内容
   *
   * @returns 项目下命名空间内的存储内容
   */
  static getStorage() {
    const storage = localStorage.getItem(config.localStorageNamespace)
    const serializeStorage = JSON.parse(storage || '{}') as Storage
    return serializeStorage
  }

  /**
   * 设置键值对到对应的命名空间下存储到 localStorage 中
   *
   * @param key 键
   * @param value 值
   */
  static setItem<K extends keyof Storage>(key: K, value: Storage[K]) {
    const storage = this.getStorage()
    const newStorage = { ...storage, ...{ [key]: value } }
    localStorage.setItem(
      config.localStorageNamespace,
      JSON.stringify(newStorage)
    )
  }

  /**
   * 通过传入的键，拿到 localStorage下相应的值
   *
   * @param key 键
   * @returns 对应键下的值
   */
  static getItem<K extends keyof Storage>(key: K): Storage[K] {
    const storage = this.getStorage()
    return storage[key]
  }

  /**
   * 通过传入的键，删除对应 localStorage下的值
   * @param key 键
   */
  static removeItem<K extends keyof Storage>(key: K) {
    const storage = this.getStorage()
    delete storage[key]
    localStorage.setItem(config.localStorageNamespace, JSON.stringify(storage))
  }

  /**
   * 清除localStorage下所有的内容
   */
  static clearAll() {
    localStorage.clear()
  }
}

export default StorageUtil
