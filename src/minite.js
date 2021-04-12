import htm from './lib/htm.js'

const randStr = Math.random().toString(36).substring(7);

function objectToStyleString(styles) {
  return Object.keys(styles)
    .map(prop => {
      // convert camelCase to kebab-case
      const newProp = prop.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
      return `${newProp}: ${styles[prop]}`
    })
    .join(';')
}

export const m = (tag, attrs, ...children) => {
  
  // For re-usable / nested jsx component
  if (typeof tag === 'function') return tag(attrs, children)
  
  if (attrs) {
    // Add random id attribute to input & textarea
    // to preserve focus while re-rendering
    if (tag === 'input' || tag === 'textarea') {
      if (!attrs.hasOwnProperty('id')) {
        attrs.id = 'input_' + randStr
      }
    }
  }

  // Apply object style to style attribute
  if (attrs && attrs.hasOwnProperty('style')) {
    attrs.style = objectToStyleString(attrs.style)
  }

  return {
    tag,
    attrs,
    children
  }
}

export function Fragment(props, children) {
	return {
    tag: 'x',
    attrs: props,
    children
  }
}

export const html = htm.bind(m)
export { useState } from './hooks.js'
export { useReducer } from './reducer.js'
export { render } from './render.js'