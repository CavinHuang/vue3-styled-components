const _uppercasePattern = /([A-Z])/g
const msPattern = /^ms-/

function hyphenate(string: string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase()
}

function hyphenateStyleName(string: string) {
  return hyphenate(string).replace(msPattern, '-ms-')
}

export {
  hyphenate,
  hyphenateStyleName,
}
