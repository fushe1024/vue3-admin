import i18n from '@/i18n'
/**
 * @description: 密码验证规则
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('login.passwordRule2')))
    } else {
      callback()
    }
  }
}
