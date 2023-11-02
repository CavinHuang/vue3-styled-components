import isStyledComponent from './isStyledComponent'
import isTag from './isTag'
import isVueComponent from './isVueComponent'

export default function isValidElementType(target: any) {
  return isStyledComponent(target)
    || isVueComponent(target)
    || isTag(target)
}
