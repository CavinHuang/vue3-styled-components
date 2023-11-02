import { compile, middleware, prefixer, serialize, stringify } from 'stylis'

import flatten from '../utils/flatten'

import styleSheet from './StyleSheet'

export default class ComponentStyle {
  rules: any
  selector: undefined
  constructor(rules: any, selector: any) {
    this.rules = rules
    this.selector = selector
  }

  generateAndInject() {
    if (!styleSheet.injected)
      styleSheet.inject()
    const flatCSS = flatten(this.rules).join('')
    const cssString = this.selector ? `${this.selector} { ${flatCSS} }` : flatCSS
    const css = serialize(compile(cssString), middleware([prefixer, stringify])) // ('', cssString, false, false)
    styleSheet.insert(css, { global: true })
  }
}
