<script setup lang="ts">
import { h } from 'vue'

import styled from '../../src'

import HelloWorld from './components/HelloWorld.vue'


function FnComp(props: {
  a: number,
  b: string
}, { slots }) {
  return h('div', slots.default(props.a))
}

const A = styled.div`
  font-size: 2.5em;
  color: ${props => props.color};
  &:hover {
    color: #42b883;
  }
`
</script>

<template>
  <div>
    <FnComp :a="1111" :b="222">
      <template #default="a">
        <div>{{a}}123</div>
      </template>
    </FnComp>
    <A color="#ff0"> aaaaa </A>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo">
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo">
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
