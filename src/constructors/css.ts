import flatten from '../utils/flatten'
import interleave from '../utils/interleave'

export default (rules, ...interpolations) => (
  flatten(interleave(rules, interpolations))
)
