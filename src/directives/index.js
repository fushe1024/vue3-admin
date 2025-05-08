import print from 'vue3-print-nb'

// 打印全局指令
export default (app) => {
  // 使 v-print 在所有组件中都可用
  app.directive('print', print)
}
