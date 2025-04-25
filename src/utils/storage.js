// storage.js
const storage = {
  /**
   * 设置本地存储
   * @param {string} key 存储键名
   * @param {any} value 存储值
   */
  set(key, value) {
    try {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      localStorage.setItem(key, value)
    } catch (error) {
      console.error('localStorage set error:', error)
    }
  },

  /**
   * 获取本地存储
   * @param {string} key 要获取的键名
   * @returns {any} 存储的值
   */
  get(key) {
    const data = localStorage.getItem(key)
    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  },

  /**
   * 移除指定本地存储
   * @param {string} key 要移除的键名
   */
  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('localStorage remove error:', error)
    }
  },

  /**
   * 清空所有本地存储
   */
  clear() {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('localStorage clear error:', error)
    }
  }
}

export default storage
