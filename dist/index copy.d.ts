import type { DefineComponent } from 'vue';
import type * as CSS from 'csstype';
import css from './constructors/css';
import injectGlobal from './constructors/injectGlobal';
import keyframes from './constructors/keyframes';
import ThemeProvider from './providers/ThemeProvider';
import { type SupportedHTMLElements } from './utils/domElements';
export type AnyComponent<P extends object = any> = DefineComponent<P>;
export type KnownTarget = SupportedHTMLElements | AnyComponent;
export type WebTarget = string | KnownTarget;
declare function baseStyled<Target extends WebTarget>(tag: Target): (tagName: any, props?: {}) => (cssRules: any, ...interpolations: any[]) => any;
interface BaseObject {
}
export type StyledTarget = WebTarget;
export type CSSProperties = CSS.Properties<number | (string & {})>;
export type CSSObject<Props extends object = BaseObject> = StyledObject<Props>;
export type CSSPseudos = {
    [K in CSS.Pseudos]?: CSSObject;
};
export interface DefaultTheme {
    [key: string]: any;
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
    as?: KnownTarget | undefined;
    forwardedAs?: KnownTarget | undefined;
    theme?: DefaultTheme | undefined;
}
/**
 * ExecutionProps but with `theme` required.
 */
export interface ExecutionContext extends ExecutionProps {
    theme: DefaultTheme;
}
export interface Keyframes {
    id: string;
    name: string;
    rules: string;
}
export interface StyledComponentBrand {
    readonly _sc: symbol;
}
export type RuleSet<Props extends object = BaseObject> = Interpolation<Props>[];
export type Interpolation<Props extends object> = StyleFunction<Props> | StyledObject<Props> | TemplateStringsArray | string | number | false | undefined | null | Keyframes | StyledComponentBrand | RuleSet<Props> | Interpolation<Props>[];
export interface StyleFunction<Props extends object> {
    (executionContext: ExecutionContext & Props): Interpolation<Props>;
}
export type StyledObject<Props extends object = BaseObject> = CSSProperties & CSSPseudos & {
    [key: string]: StyledObject<Props> | string | number | StyleFunction<Props> | StyledObject<Props> | RuleSet<any> | undefined;
};
export type Styles<Props extends object> = TemplateStringsArray | StyledObject<Props> | StyleFunction<Props>;
type FastOmit<T extends object, U extends string | number | symbol> = {
    [K in keyof T as K extends U ? never : K]: T[K];
};
export type Substitute<A extends object, B extends object> = FastOmit<A, keyof B> & B;
export type NoInfer<T> = [T][T extends any ? 0 : never];
export interface Styled<OuterProps extends object, OuterStatics extends object = BaseObject> {
    <Props extends object = BaseObject, Statics extends object = BaseObject>(initialStyles: Styles<Substitute<OuterProps, NoInfer<Props>>>, ...interpolations: Interpolation<Substitute<OuterProps, NoInfer<Props>>>[]): DefineComponent<Substitute<OuterProps, Props>> & OuterStatics & Statics & BaseObject;
}
declare const styled: typeof baseStyled & {
    object: Styled<import("vue").ObjectHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    map: Styled<import("vue").MapHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    div: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    a: Styled<import("vue").AnchorHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    abbr: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    address: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    area: Styled<import("vue").AreaHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    article: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    aside: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    audio: Styled<import("vue").AudioHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    b: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    base: Styled<import("vue").BaseHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    bdi: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    bdo: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    blockquote: Styled<import("vue").BlockquoteHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    body: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    br: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    button: Styled<import("vue").ButtonHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    canvas: Styled<import("vue").CanvasHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    caption: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    cite: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    code: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    col: Styled<import("vue").ColHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    colgroup: Styled<import("vue").ColgroupHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    data: Styled<import("vue").DataHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    datalist: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    dd: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    del: Styled<import("vue").DelHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    details: Styled<import("vue").DetailsHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    dfn: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    dialog: Styled<import("vue").DialogHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    dl: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    dt: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    em: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    embed: Styled<import("vue").EmbedHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    fieldset: Styled<import("vue").FieldsetHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    figcaption: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    figure: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    footer: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    form: Styled<import("vue").FormHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    h1: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    h2: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    h3: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    h4: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    h5: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    h6: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    head: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    header: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    hgroup: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    hr: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    html: Styled<import("vue").HtmlHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    i: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    iframe: Styled<import("vue").IframeHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    img: Styled<import("vue").ImgHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    input: Styled<import("vue").InputHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    ins: Styled<import("vue").InsHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    kbd: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    label: Styled<import("vue").LabelHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    legend: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    li: Styled<import("vue").LiHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    link: Styled<import("vue").LinkHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    main: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    mark: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    menu: Styled<import("vue").MenuHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    meta: Styled<import("vue").MetaHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    meter: Styled<import("vue").MeterHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    nav: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    noscript: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    ol: Styled<import("vue").OlHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    optgroup: Styled<import("vue").OptgroupHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    option: Styled<import("vue").OptionHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    output: Styled<import("vue").OutputHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    p: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    picture: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    pre: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    progress: Styled<import("vue").ProgressHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    q: Styled<import("vue").QuoteHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    rp: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    rt: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    ruby: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    s: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    samp: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    script: Styled<import("vue").ScriptHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    section: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    select: Styled<import("vue").SelectHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    small: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    source: Styled<import("vue").SourceHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    span: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    strong: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    style: Styled<import("vue").StyleHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    sub: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    summary: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    sup: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    table: Styled<import("vue").TableHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    tbody: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    td: Styled<import("vue").TdHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    textarea: Styled<import("vue").TextareaHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    tfoot: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    th: Styled<import("vue").ThHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    thead: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    time: Styled<import("vue").TimeHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    title: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    tr: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    track: Styled<import("vue").TrackHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    u: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    ul: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    var: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    video: Styled<import("vue").VideoHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    wbr: Styled<import("vue").HTMLAttributes & import("vue").ReservedProps, BaseObject>;
    big: Styled<any, BaseObject>;
    keygen: Styled<import("vue").KeygenHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    menuitem: Styled<any, BaseObject>;
    param: Styled<import("vue").ParamHTMLAttributes & import("vue").ReservedProps, BaseObject>;
    circle: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    clipPath: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    defs: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    ellipse: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    g: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    image: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    line: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    linearGradient: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    mask: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    path: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    pattern: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    polygon: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    polyline: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    radialGradient: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    rect: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    stop: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    svg: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    text: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
    tspan: Styled<import("vue").SVGAttributes & import("vue").ReservedProps, BaseObject>;
};
export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };
