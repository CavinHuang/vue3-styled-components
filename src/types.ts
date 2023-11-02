import type { DefineComponent } from 'vue'

import type { SupportedHTMLElements } from './utils/domElements'

export type AnyComponent<P extends object = any> = DefineComponent<P>

export type KnownTarget = SupportedHTMLElements | AnyComponent

export type WebTarget =
  | string // allow custom elements, etc.
  | KnownTarget
