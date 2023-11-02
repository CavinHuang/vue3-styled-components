interface ITarget {
    methods: {
        generateAndInjectStyles: () => void;
    };
}
export default function isStyledComponent(target: any): target is ITarget;
export {};
