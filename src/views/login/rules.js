/**
 * @description: 密码验证规则
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码长度不能小于6位'))
    } else {
      callback()
    }
  }
}
