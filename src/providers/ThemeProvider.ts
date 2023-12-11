import { computed, defineComponent, provide, ref, toRefs, watch, watchEffect } from 'vue'

import { StyledThemeKey } from '../context'

export default defineComponent({
  name: 'StyledThemeProvider',
  props: {
    theme: Object,
  },
  setup(props, { slots }) {
    const { theme } = toRefs(props)
    provide(StyledThemeKey, theme)
    return () => slots.default?.()
  },
})
