import { __root, __view, render } from './render.js'

let __state = {},
    __cursor = 0

/**
 * State hook
 * @param {any} initialValue - Initial state value
 */
export function useState(initialValue) {

  let currentCursor = __cursor
  __cursor++

  const state = {}
  state[currentCursor] = __state[currentCursor] || initialValue

  const setState = (newVal) => {
    typeof newVal === 'function'
      ? __state[currentCursor] = newVal(state[currentCursor]) // Use prev state in setter
      : __state[currentCursor] = newVal
    
    state[currentCursor] = __state[currentCursor]

    __cursor = 0 // reset before render
    render(__root, __view())
  }
  
  return [state[currentCursor], setState]
}

/**
 * useEffect called on every component render
 * @param {Function} callback 
 */
export const useEffect = callback => callback()
