import { formatTime } from '@/utils/format'
/**
 * 将数据转换为二维数组
 *
 */
export const formatJsonData = (headers, rows) => {
  return rows.map((row) => {
    return Object.keys(headers).map((key) => {
      // 角色处理
      if (headers[key] === 'role') {
        const roles = row[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      // 时间处理
      if (headers[key] === 'openTime') {
        return formatTime(row[headers[key]], 'YYYY/MM')
      }
      return row[headers[key]]
    })
  })
}
