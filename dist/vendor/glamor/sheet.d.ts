export declare class StyleSheet {
    constructor({ speedy, maxLength, }?: {
        speedy?: boolean;
        maxLength?: number;
    });
    inject(): void;
    speedy(bool: any): void;
    _insert(rule: any): void;
    insert(rule: any): any;
    flush(): void;
    rules(): any;
}
