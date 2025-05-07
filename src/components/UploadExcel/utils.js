import XLSX from 'xlsx'

/**
 * 获取表头
 * @param {*} sheet 表格
 */
export const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r

  for (C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    let hdr = 'UNKNOWN ' + C
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }

  return headers
}

/**
 * 判断是否是excel
 * @param {*} file 文件
 */
export const isExcel = (file) => {
  const reg = /\.(xlsx|xls|csv)$/i
  return reg.test(file.name)
}
