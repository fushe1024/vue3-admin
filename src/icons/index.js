import SvgIcon from '@/components/SvgIcon/index.vue'

const svgRequireContext = require.context('./svg', false, /\.svg$/)

svgRequireContext.keys().forEach((fileName) => svgRequireContext(fileName))

export default (app) => {
  app.component('svg-icon', SvgIcon)
}
