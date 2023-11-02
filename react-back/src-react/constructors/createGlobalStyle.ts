import { PropType,defineComponent,getCurrentInstance,inject,ref,watchEffect } from 'vue';
import { STATIC_EXECUTION_CONTEXT } from '../constants';
import GlobalStyle from '../models/GlobalStyle';
import { useStyleSheetContext } from '../models/StyleSheetManager';
import { DefaultTheme,ThemeContextKey } from '../models/ThemeProvider';
import StyleSheet from '../sheet';
import { ExecutionContext,ExecutionProps,Interpolation,KnownTarget,Stringifier,Styles } from '../types';
import { checkDynamicCreation } from '../utils/checkDynamicCreation';
import determineTheme from '../utils/determineTheme';
import generateComponentId from '../utils/generateComponentId';
import css from './css';

export default function createGlobalStyle<Props extends object>(
  strings: Styles<Props>,
  ...interpolations: Array<Interpolation<Props>>
) {
  const rules = css<Props>(strings,...interpolations);
  const styledComponentId = `sc-global-${generateComponentId(JSON.stringify(rules))}`;
  const globalStyle = new GlobalStyle<Props>(rules,styledComponentId);

  if (process.env.NODE_ENV !== 'production') {
    checkDynamicCreation(styledComponentId);
  }

  const GlobalStyleComponent = defineComponent({
    name: 'GlobalStyle',
    props: {
      as: String as PropType<KnownTarget>,
      forwardedAs: String as PropType<KnownTarget>,
      theme: Object as PropType<DefaultTheme>,
    },
    setup(props) {
      const ssc = useStyleSheetContext();
      const theme = inject(ThemeContextKey);
      const instanceRef = ref(ssc.styleSheet.allocateGSInstance(styledComponentId));

      const instance = instanceRef.current;


      const vueInstance = getCurrentInstance();
      const children = vueInstance?.vnode.children;

      if (process.env.NODE_ENV !== 'production' && children && children.length === 0) {
        console.warn(
          `The global style component ${styledComponentId} was given child JSX. createGlobalStyle does not render children.`
        );
      }

      if (
        process.env.NODE_ENV !== 'production' &&
        rules.some(rule => typeof rule === 'string' && rule.indexOf('@import') !== -1)
      ) {
        console.warn(
          `Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app.`
        );
      }

      if (ssc.styleSheet.server) {
        renderStyles(instance,props,ssc.styleSheet,theme,ssc.stylis);
      }

      if (!__SERVER__) {
        watchEffect(() => {
          if (!ssc.styleSheet.server) {
            renderStyles(instance,props,ssc.styleSheet,theme,ssc.stylis);
            return () => globalStyle.removeStyles(instance,ssc.styleSheet);
          }
        })
      }

      return null;
    }
  });

  function renderStyles(
    instance: number,
    props: ExecutionProps,
    styleSheet: StyleSheet,
    theme: DefaultTheme | undefined,
    stylis: Stringifier
  ) {
    if (globalStyle.isStatic) {
      globalStyle.renderStyles(
        instance,
        STATIC_EXECUTION_CONTEXT as unknown as ExecutionContext & Props,
        styleSheet,
        stylis
      );
    } else {
      const context = {
        ...props,
        theme: determineTheme(props,theme,GlobalStyleComponent.defaultProps),
      } as ExecutionContext & Props;

      globalStyle.renderStyles(instance,context,styleSheet,stylis);
    }
  }

  return GlobalStyleComponent;
}
