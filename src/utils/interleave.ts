export default (
  strings: string[],
  interpolations: string[],
) => (
  interpolations.reduce((array, interp, i) => (
    array.concat(interp, strings[i + 1])
  ), [strings[0]])
)
