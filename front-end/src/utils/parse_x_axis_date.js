import i18next from 'i18next'

export const ParseXAxisDate = (str) => {
  let parsedDate = str
  if (str !== '' && str !== undefined && typeof str === 'string') {
    const strMonth = str.substr(0, 1).toLowerCase() + str.substr(1, 2) // for translation
    const month = i18next.t(strMonth)
    const day = str.substr(4, 2)
    const hour = str.substr(7, 5)
    const year = str.substring(str.length - 2, str.length)
    parsedDate = (day + month + year + '-' + hour)
  }
  return parsedDate
}