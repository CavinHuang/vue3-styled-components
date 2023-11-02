import createStyledComponent from '../models/StyledComponent'
import type { WebTarget } from '../types'
import type { SupportedHTMLElements } from '../utils/domElements'
import domElements from '../utils/domElements'

import type { Styled } from './constructWithOptions'
import constructWithOptions from './constructWithOptions'

function baseStyled<Target extends WebTarget>(tag: Target) {
  return constructWithOptions<'web', Target>(createStyledComponent, tag)
}

const styled = baseStyled as typeof baseStyled & {
  [E in SupportedHTMLElements]: Styled<'web', E, JSX.IntrinsicElements[E]>;
}

// Shorthands for all valid HTML Elements
domElements.forEach((domElement) => {
  // @ts-expect-error some react typing bs
  styled[domElement] = baseStyled<typeof domElement>(domElement)
})

export default styled
