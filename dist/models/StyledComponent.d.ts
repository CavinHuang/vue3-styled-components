declare const _default: (ComponentStyle: any) => (tagOrComponent: any, rules: any, propDefinitions: any) => import("vue").DefineComponent<{
    as: (ObjectConstructor | StringConstructor)[];
    modelValue: any;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("input" | "update:modelValue")[], "input" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    as: (ObjectConstructor | StringConstructor)[];
    modelValue: any;
}>> & {
    onInput?: (...args: any[]) => any;
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    modelValue: any;
}, {}>;
export default _default;
