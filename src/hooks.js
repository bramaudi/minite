/**
 * State hook
 * @param {any} initialValue - Initial state value
 */
export function useState(instance, initialValue) {

  let { cursor } = instance
  const { state: __state, render, root, view } = instance

  let currentCursor = cursor
  cursor++

  const state = {}
  state[currentCursor] = __state[currentCursor] || initialValue

  const setState = (newVal) => {
    typeof newVal === 'function'
      ? __state[currentCursor] = newVal(state[currentCursor]) // Use prev state in setter
      : __state[currentCursor] = newVal
    
    state[currentCursor] = __state[currentCursor]
    render(root, view())
  }
  
  return [state[currentCursor], setState]
}

/**
 * useEffect called on every component render
 * @param {Function} callback 
 */
export const useEffect = callback => callback()
