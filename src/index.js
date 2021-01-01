import { createElement } from './element.js'
export { useReducer } from './reducer.js'
export const m = createElement

// Global scope
let
  __root,
  __view,
  __state = {},
  __cursor = 0

/**
 * Initial render / mount
 * @param {HTMLElement} root - Parent element
 * @param {HTMLElement} view - Component created by "createElement" function
 */
export const render = (root, view) => {
  __root = root
  __view = view

  renderer(root, view());
}

/**
 * Render function
 * @param {HTMLElement} view - Rendered given Component
 */
const renderer = (root, view) => {
  // Reset cursor after re-render
  __cursor = 0

  // Get props from element to be cached
  const cacheProps = e => ({
    id: e.id,
    selectionStart: e.selectionStart,
    selectionEnd: e.selectionEnd,
    selectionDirection: e.selectionDirection,
    scrollTop: e.scrollTop,
    scrollLeft: e.scrollLeft
  });

  const focusedId = (document.activeElement || {id:''}).id;
  const identifiedElements = Array.prototype.map.call(document.querySelectorAll('[id]'), cacheProps);

  // Clear element before append
  while (root.firstChild) root.removeChild(root.firstChild);
  root.append(...Array.isArray(view) ? view : [view]);

  identifiedElements.forEach(element => {
    const newElement = document.getElementById(element.id);
    if (newElement) {
      // Preserve input focus on re-render using id
      if(element.id === focusedId) newElement.focus();
      Object.assign(newElement, element);
    }
  });
};

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
    renderer(__root, __view())
  }
  
  return [state[currentCursor], setState]
}

/**
 * useEffect called on every component render
 * @param {Function} callback 
 */
export const useEffect = callback => callback()
