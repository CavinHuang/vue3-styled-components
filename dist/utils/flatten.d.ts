export type CSSObject = Record<string, Record<string, string> | string>;
export declare function objToCss(obj: CSSObject, prevKey?: string): string;
declare function flatten<T>(chunks: T[], executionContext?: any): any;
export default flatten;
