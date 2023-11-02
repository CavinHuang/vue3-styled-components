declare class StyleSheet {
    constructor();
    get injected(): any;
    inject(): void;
    flush(): void;
    insert(rule: any, opts?: {
        global: boolean;
    }): any;
    rules(): any;
}
declare const _default: StyleSheet;
export default _default;
