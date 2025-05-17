/**
 * 数据转换方法
 * @param {*} data 数据
 */
export const transformData = (mapData) => {
  const res = []
  // 遍历所有城市数据
  mapData.data.forEach((item) => {
    // 根据城市获取对应坐标
    const Coordinate = mapData.geoCoordMap[item.name]

    // 如果有坐标，就将坐标和value放到数组中
    if (Coordinate) {
      res.push({
        name: item.name,
        value: Coordinate.concat(item.value)
      })
    }
    // { name: '上海', value: [121.473701, 31.230393, 12] }
  })

  return res
}

/**
 * 获取 TOP 5 的数据
 * @param {*} data 数据
 */
export const getTop5Data = (data) => {
  // 对数据进行排序，按照 value 从大到小排序
  const sortedData = data.sort((a, b) => b.value[2] - a.value[2])

  // 取前 5 条数据
  const top5Data = sortedData.slice(0, 5)

  return top5Data
}
