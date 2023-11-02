import type { InjectionKey, PropType } from 'vue'
import { computed, defineComponent, inject } from 'vue'

import styledError from '../utils/error'
import isFunction from '../utils/isFunction'

/**
 * Override DefaultTheme to get accurate typings for your project.
 *
 * ```
 * // create styled-components.d.ts in your project source
 * // if it isn't being picked up, check tsconfig compilerOptions.types
 * import type { CSSProp } from "styled-components";
 * import Theme from './theme';
 *
 * type ThemeType = typeof Theme;
 *
 * declare module "styled-components" {
 *  export interface DefaultTheme extends ThemeType {}
 * }
 *
 * declare module "react" {
 *  interface DOMAttributes<T> {
 *    css?: CSSProp;
 *  }
 * }
 * ```
 */
export interface DefaultTheme {
  [key: string]: any
}

type ThemeFn = (outerTheme?: DefaultTheme | undefined) => DefaultTheme
type ThemeArgument = DefaultTheme | ThemeFn

interface Props {
  theme: ThemeArgument
}

export const ThemeContextKey = Symbol() as InjectionKey<
  DefaultTheme | undefined
>

export function themeContextProvider(them?: ThemeArgument) {
  return inject(ThemeContextKey, them)
}

// export const ThemeConsumer = ThemeContext.Consumer;

function mergeTheme(
  theme?: ThemeArgument,
  outerTheme?: DefaultTheme | undefined,
): DefaultTheme {
  if (!theme)
    throw styledError(14)

  if (isFunction(theme)) {
    const themeFn = theme as ThemeFn
    const mergedTheme = themeFn(outerTheme)

    if (
      process.env.NODE_ENV !== 'production'
      && (mergedTheme === null
        || Array.isArray(mergedTheme)
        || typeof mergedTheme !== 'object')
    )
      throw styledError(7)

    return mergedTheme
  }

  if (Array.isArray(theme) || typeof theme !== 'object')
    throw styledError(8)

  return outerTheme ? { ...outerTheme, ...theme } : theme
}

/**
 * Returns the current theme (as provided by the closest ancestor `ThemeProvider`.)
 *
 * If no `ThemeProvider` is found, the function will error. If you need access to the theme in an
 * uncertain composition scenario, `React.useContext(ThemeContext)` will not emit an error if there
 * is no `ThemeProvider` ancestor.
 */
export function useTheme(): DefaultTheme {
  const theme = inject(ThemeContextKey, undefined)

  if (!theme)
    throw styledError(18)

  return theme
}

/**
 * Provide a theme to an entire react component tree via context
 */
const ThemeProvider = defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Props>,
    },
  },
  setup(props, { slots }) {
    const themeContext = computed(() => mergeTheme(props.theme))

    if (!slots.default)
      return null

    themeContextProvider(themeContext.value)

    return () => slots.default?.()
  },
})

export default ThemeProvider

export { ThemeProvider }
