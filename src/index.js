export { createElement as m } from './element.js'
import mitt from 'mitt'

/**
 * EventBus for state setter
 */
const emitter = mitt()

/**
 * 
 * @param {HTMLElement} root - Parent element
 * @param {HTMLElement} view - Component created by "createElement" function
 * @param {object} initState - Initial state
 */
export const render = (root, view, initState = {}) => {
  
  // Initialize state
  let state = initState;

  // Clear all previous event
  emitter.all.clear()

  // Get props from element to be cached
  const cacheProps = e => ({
    id: e.id,
    selectionStart: e.selectionStart,
    selectionEnd: e.selectionEnd,
    selectionDirection: e.selectionDirection,
    scrollTop: e.scrollTop,
    scrollLeft: e.scrollLeft
  });

  /**
   * Render function
   * @param {HTMLElement} tree - Rendered given Component
   */
  const renderer = tree => {
    const focusedId = (document.activeElement || {id:''}).id;
    const identifiedElements = Array.prototype.map.call(document.querySelectorAll('[id]'), cacheProps);

    // Clear element before append
    while (root.firstChild) root.removeChild(root.firstChild);
    root.append(...Array.isArray(tree) ? tree : [tree]);

    identifiedElements.forEach(element => {
      const newElement = document.getElementById(element.id);
      if (newElement) {
        // Preserve input focus on re-render using id
        if(element.id === focusedId) newElement.focus();
        Object.assign(newElement, element);
      }
    });
  };

  // Listen state setter
  emitter.on('*', (type, e) => {
    state[type] = e
    renderer(view(state, emitter.emit))
  })
  
  renderer(view(state, emitter.emit));
}
