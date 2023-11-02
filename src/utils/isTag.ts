import type { DomElements } from './domElements'
import domElements from './domElements'

export default function isTag(target: unknown): target is DomElements {
  if (typeof target === 'string')
    return domElements.includes(target as DomElements)
  return false
}
