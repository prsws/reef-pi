export const OneDecimalParse = (value) => {
  if (Number.isNaN(value)) {
    return 'NaN'
  } else {
    return parseFloat(value).toFixed(1)
  }
}
