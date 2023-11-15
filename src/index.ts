import type { DefineComponent } from 'vue'
import type * as CSS from 'csstype'

import css from './constructors/css'
import injectGlobal from './constructors/injectGlobal'
import keyframes from './constructors/keyframes'
import _styled from './constructors/styled'
import _componentStyle from './models/ComponentStyle'
import _styledComponent from './models/StyledComponent'
import StyledThemeProvider from './providers/ThemeProvider'
import { type SupportedHTMLElements } from './utils/domElements'
import generateAlphabeticName from './utils/generateAlphabeticName'

export type AnyComponent<P extends object = any> = DefineComponent<P>

export type KnownTarget = SupportedHTMLElements | AnyComponent

export type WebTarget =
  | string // allow custom elements, etc.
  | KnownTarget

interface BaseObject {}
export type StyledTarget = WebTarget
// eslint-disable-next-line @typescript-eslint/ban-types
export type CSSProperties = CSS.Properties<number | (string & {})>
export type CSSObject<Props extends object = BaseObject> = StyledObject<Props>
export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject }

export interface DefaultTheme {
  [key: string]: any
}
export interface ExecutionProps {
  /**
   * Dynamically adjust the rendered component or HTML tag, e.g.
   * ```
   * const StyledButton = styled.button``
   *
   * <StyledButton as="a" href="/foo">
   *   I'm an anchor now
   * </StyledButton>
   * ```
   */
  as?: KnownTarget | undefined
  forwardedAs?: KnownTarget | undefined
  theme?: DefaultTheme | undefined
}

/**
 * ExecutionProps but with `theme` required.
 */
export interface ExecutionContext extends ExecutionProps {
  theme: DefaultTheme
}
export interface Keyframes {
  id: string
  name: string
  rules: string
}
export interface StyledComponentBrand { readonly _sc: symbol }
export type RuleSet<Props extends object = BaseObject> = Interpolation<Props>[]

export type Interpolation<Props extends object> =
  | StyleFunction<Props>
  | StyledObject<Props>
  | TemplateStringsArray
  | string
  | number
  | false
  | undefined
  | null
  | Keyframes
  | StyledComponentBrand
  | RuleSet<Props>
  | Interpolation<Props>[]

export interface StyleFunction<Props extends object> {
  (executionContext: ExecutionContext & Props): Interpolation<Props>
}
export type StyledObject<Props extends object = BaseObject> = CSSProperties &
CSSPseudos & {
  [key: string]:
  | StyledObject<Props>
  | string
  | number
  | StyleFunction<Props>
  | StyledObject<Props>
  | RuleSet<any>
  | undefined
}

export type Styles<Props extends object> =
  | TemplateStringsArray
  | StyledObject<Props>
  | StyleFunction<Props>

type FastOmit<T extends object, U extends string | number | symbol> = {
  [K in keyof T as K extends U ? never : K]: T[K];
}
export type Substitute<A extends object, B extends object> = FastOmit<A, keyof B> & B

// Prevents TypeScript from inferring generic argument
export type NoInfer<T> = [T][T extends any ? 0 : never]

export interface Styled<OuterProps extends object, OuterStatics extends object = BaseObject,
> {
  <Props extends object = BaseObject, Statics extends object = BaseObject>(
    initialStyles: Styles<Substitute<OuterProps, NoInfer<Props>>>,
    ...interpolations: Interpolation<Substitute<OuterProps, NoInfer<Props>>>[]
  ): DefineComponent<Substitute<OuterProps, Props>> &
  OuterStatics &
  Statics & BaseObject
}
const baseStyled = _styled(
  _styledComponent(_componentStyle(generateAlphabeticName)),
)
type StyledStype = typeof baseStyled & {
  [E in SupportedHTMLElements]: Styled<JSX.IntrinsicElements[E]>;
}

const styled = baseStyled as StyledStype

export default styled

export { css, injectGlobal, keyframes, StyledThemeProvider }
