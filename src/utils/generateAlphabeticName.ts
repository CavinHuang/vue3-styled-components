const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

/* Some high number, usually 9-digit base-10. Map it to base-😎 */
function generateAlphabeticName(code: number): string {
  const lastDigit = chars[code % chars.length]
  return code > chars.length
    ? `${generateAlphabeticName(Math.floor(code / chars.length))}${lastDigit}`
    : lastDigit
}

export default generateAlphabeticName
