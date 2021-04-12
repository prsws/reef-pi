export const ParseXAxisDate = (str) => {
  let parsedDate = str
  if (str !== '' && str !== undefined && typeof str === 'string') {
    const month = str.substr(0, 3)
    const day = str.substr(4, 2)
    const hour = str.substr(7, 5)
    const year = str.substring(str.length - 2, str.length)
    parsedDate = (day + month + year + '-' + hour)
  }
  return parsedDate
}
