export const ParseXAxisDate = (str) => {
  const dateSplit = str.split('-')
  const month = dateSplit[0]
  const day = dateSplit[1]
  const year = str.substring(str.length - 2, str.lenth)
  const hour = dateSplit[2].substring(0, 5)
  const parsedDate = (day + month + year + '-' + hour)
  return parsedDate
}
