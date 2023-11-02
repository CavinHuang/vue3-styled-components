import css from './constructors/css'
import injectGlobal from './constructors/injectGlobal'
import keyframes from './constructors/keyframes'
import _styled from './constructors/styled'
import _componentStyle from './models/ComponentStyle'
import _styledComponent from './models/StyledComponent'
import ThemeProvider from './providers/ThemeProvider'
import generateAlphabeticName from './utils/generateAlphabeticName'

const styled = _styled(
  _styledComponent(_componentStyle(generateAlphabeticName)),
)

export default styled

export { css, injectGlobal, keyframes, ThemeProvider }
