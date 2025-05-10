import print from 'vue3-print-nb'
import permission from './permission'

export default (app) => {
  // v-print 指令 (打印指令)
  app.directive('print', print)

  // v-permission 指令 (权限指令)
  app.directive('permission', permission)
}
