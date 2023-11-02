import { defineComponent, provide, ref, watch } from 'vue'

export default defineComponent({
  props: {
    theme: Object,
  },
  setup(props, { slots }) {
    const themeObj = ref(props.theme)
    watch(() => props.theme, (val) => {
      themeObj.value = val
    }, { deep: true, immediate: true })
    provide('theme', themeObj)
    return () => slots.default?.()
  },
})
