const whiteList = ['/login', '/404', '/401']

// 是否需要缓存
export const isTags = (path) => {
  return !whiteList.includes(path)
}
