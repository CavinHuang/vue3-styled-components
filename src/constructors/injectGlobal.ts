import GlobalStyle from '../models/GlobalStyle'

import css from './css'

function injectGlobal(strings, ...interpolations) {
  const globalStyle = new GlobalStyle(css(strings, ...interpolations))
  globalStyle.generateAndInject()
}

export default injectGlobal
