import hashStr from 'glamor/lib/hash'
import { compile, middleware, prefixer, serialize, stringify } from 'stylis'

import flatten from '../utils/flatten'

import styleSheet from './StyleSheet'

export default (nameGenerator: any) => {
  const inserted = {}

  class ComponentStyle {
    rules: any
    insertedRule: any
    constructor(rules: any) {
      this.rules = rules

      // stylis.set({ keyframe: false })
      if (!styleSheet.injected)
        styleSheet.inject()
      this.insertedRule = styleSheet.insert('')
    }

    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a ._hashName {}
     * Parses that with PostCSS then runs PostCSS-Nested on it
     * Returns the hash to be injected on render()
     * */
    generateAndInjectStyles(executionContext: any) {
      const flatCSS = flatten(this.rules, executionContext).join('')
        .replace(/^\s*\/\/.*$/gm, '') // replace JS comments
      const hash: any = hashStr(flatCSS)
      if (!(inserted as any)[hash]) {
        const selector = nameGenerator(hash)
        ;(inserted as any)[hash] = selector
        const css = serialize(compile(`.${selector}{${flatCSS}}`), middleware([prefixer, stringify])) // stylis(`.${selector}`, flatCSS)
        this.insertedRule.appendRule(css)
      }
      return (inserted as any)[hash]
    }
  }

  return ComponentStyle
}
