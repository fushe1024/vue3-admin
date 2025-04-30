import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import formula from '@/constant/formula.json'
import axios from 'axios'

// 缓存变量
let originalStyleCache = null
const STYLE_ID = '__ELEMENT_PLUS_CUSTOM_STYLE__'
const COLOR_REPLACE_REGEXP_CACHE = new Map()

// 辅助函数：转义正则特殊字符
const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * 写入新样式到 style（自动替换旧样式）
 */
export const writeNewStyle = (elNewStyle) => {
  let style = document.getElementById(STYLE_ID)
  if (!style) {
    style = document.createElement('style')
    style.id = STYLE_ID
    document.head.appendChild(style)
  }
  style.textContent = elNewStyle
}

/**
 * 生成最新样式表（带缓存和批量替换优化）
 */
export const generateNewStyle = async (primaryColor) => {
  try {
    const colors = generateColors(primaryColor)
    const cssText = await getOriginalStyle()
    const regex = createGlobalReplaceRegex(colors)

    return cssText.replace(
      regex,
      (_, prefix, variable) => prefix + colors[variable]
    )
  } catch (error) {
    console.error('生成样式失败:', error)
    return ''
  }
}

/**
 * 创建全局替换正则（带缓存）
 */
function createGlobalReplaceRegex(colors) {
  const cacheKey = Object.keys(colors).join(',')

  if (!COLOR_REPLACE_REGEXP_CACHE.has(cacheKey)) {
    const pattern = Object.keys(colors).map(escapeRegExp).join('|')
    COLOR_REPLACE_REGEXP_CACHE.set(
      cacheKey,
      new RegExp(`(:|\\\\s+)(${pattern})`, 'g')
    )
  }

  return COLOR_REPLACE_REGEXP_CACHE.get(cacheKey)
}

/**
 * 生成颜色映射表（带错误处理）
 */
export const generateColors = (primary) => {
  if (!primary || !isValidColor(primary)) return {}

  const colors = { primary }
  Object.keys(formula).forEach((key) => {
    try {
      const value = formula[key].replace(/primary/g, primary)
      colors[key] = `#${rgbHex(color.convert(value))}`
    } catch (error) {
      console.warn(`颜色生成失败 [${key}]:`, error)
      colors[key] = '#000000'
    }
  })
  return colors
}

/**
 * 获取带缓存的原始样式
 */
const getOriginalStyle = async () => {
  if (originalStyleCache) return originalStyleCache

  try {
    const version = require('element-plus/package.json').version
    const { data } = await axios.get(
      `https://unpkg.com/element-plus@${version}/dist/index.css`,
      { timeout: 5000 }
    )
    originalStyleCache = processStyleTemplate(data)
    return originalStyleCache
  } catch (error) {
    console.error('获取原始样式失败:', error)
    throw error
  }
}

/**
 * 样式模板处理（优化正则性能）
 */
const processStyleTemplate = (cssText) => {
  const colorReplacements = [
    ['#3a8ee6', 'shade-1'],
    ['#409eff', 'primary'],
    ['#53a8ff', 'light-1'],
    ['#66b1ff', 'light-2'],
    ['#79bbff', 'light-3'],
    ['#8cc5ff', 'light-4'],
    ['#a0cfff', 'light-5'],
    ['#b3d8ff', 'light-6'],
    ['#c6e2ff', 'light-7'],
    ['#d9ecff', 'light-8'],
    ['#ecf5ff', 'light-9']
  ]

  return colorReplacements.reduce((result, [color, variable]) => {
    return result.replace(new RegExp(escapeRegExp(color), 'ig'), variable)
  }, cssText)
}

/**
 * 简单颜色格式校验
 */
function isValidColor(color) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color)
}
