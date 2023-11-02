interface ITarget {
  methods: {
    generateAndInjectStyles: () => void
  }
}

export default function isStyledComponent(target: any): target is ITarget {
  return target
    && target.methods
    && typeof target.methods.generateAndInjectStyles === 'function'
}
