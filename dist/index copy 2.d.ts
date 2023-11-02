import css from './constructors/css';
import injectGlobal from './constructors/injectGlobal';
import keyframes from './constructors/keyframes';
import ThemeProvider from './providers/ThemeProvider';
declare const styled: (tagName: any, props?: {}) => (cssRules: any, ...interpolations: any[]) => any;
export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };
