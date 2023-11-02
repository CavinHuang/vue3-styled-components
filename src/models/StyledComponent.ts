import { defineComponent, h, inject, ref } from 'vue'

import css from '../constructors/css'
import { commonHtmlAttributes as attributesToAlwaysPassOn } from '../utils/commonHtmlAttributes'
import isVueComponent from '../utils/isVueComponent'
import normalizeProps from '../utils/normalizeProps'

export default (ComponentStyle: any) => {
  const createStyledComponent = (tagOrComponent: any, rules: any, propDefinitions: any) => {
    const componentStyle = new ComponentStyle(rules)
    const targetPropDefinitions = normalizeProps(tagOrComponent.props)
    const ownPropDefinitions = normalizeProps(propDefinitions)

    const targetPropDefinitionKeys = tagOrComponent.props
      ? Object.keys(
        targetPropDefinitions,
      )
      : attributesToAlwaysPassOn

    const combinedPropDefinition = tagOrComponent.props
      ? { ...ownPropDefinitions, ...targetPropDefinitions }
      : ownPropDefinitions

    return defineComponent({
      props: {
        as: [String, Object],
        modelValue: null,
        ...combinedPropDefinition,
      },

      emits: ['input', 'update:modelValue'],

      setup(props, { slots, attrs, emit }) {
        return () => {
          const injectTheme = inject('theme', ref({}))
          const theme = injectTheme ? injectTheme.value : {}
          const styleClass = componentStyle.generateAndInjectStyles({ theme, ...props, ...attrs })
          const classes = [styleClass]
          if (attrs.class)
            classes.push(attrs.class)

          const targetProps: Record<string, any> = {}

          if (targetPropDefinitionKeys.length) {
            for (const [key, value] of Object.entries(props)) {
              if (targetPropDefinitionKeys.includes(key))
                targetProps[key] = value
            }
          }

          return h(
            isVueComponent(tagOrComponent) ? tagOrComponent : props.as || tagOrComponent,
            {
              value: props.modelValue,
              ...attrs,
              ...targetProps,
              class: classes,
              onInput: (e: Event) => {
                emit('update:modelValue', (e.target as HTMLInputElement)?.value)
                emit('input', e)
              },
            },
            slots,
          )
        }
      },

      extend(cssRules: any, ...interpolations: any[]) {
        const extendedRules = css(cssRules, ...interpolations)
        return createStyledComponent(tagOrComponent, rules.concat(extendedRules), propDefinitions)
      },
      withComponent(newTarget: any) {
        return createStyledComponent(newTarget, rules, propDefinitions)
      },
    })
  }

  return createStyledComponent
}
