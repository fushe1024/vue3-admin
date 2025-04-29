import formula from '@/constant/formula.json'
import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import axios from 'axios'

// 把生成的样式写道入到style标签中
export const writeNewStyle = (newStyle) => {
  const style = document.createElement('style')
  style.innerText = newStyle
  document.head.appendChild(style)
}

export const generateNewStyle = async (primaryColor) => {
  // 1. 根据主色生成色值表
  const colors = generateColors(primaryColor)

  // 2. 获取当前 elemment-plus 的默认色值表，并且把需要进行替换的色值打上标记
  let cssText = await getOriginalStyle()

  // 3.遍历生成的色值表，在默认色值表中进行全局替换
  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })

  return cssText
}

// 根据主色生成色值表（第一步）
export const generateColors = (primary) => {
  if (!primary) return
  const colors = { primary }

  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })

  return colors
}

// 获取 element-plus 的默认色值表（第二步）
export const getOriginalStyle = async () => {
  // 从 element-plus 中获取默认色值表
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios.get(url)
  return getStyleTemplate(data)
}

// 返回 style 的 template
const getStyleTemplate = (data) => {
  // element-plus 默认色值表
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }

  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach((color) => {
    const value = colorMap[color]
    data = data.replace(new RegExp(color, 'ig'), value)
  })

  return data
}
