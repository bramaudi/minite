export let __root, __view
import { createElement } from './element.js';

/**
 * Initial render / mount
 * @param {HTMLElement} root - Parent Node
 * @param {Function} view - return Node by createElement
 */
export const render = (root, view) => {
  __root = root
  __view = view

  renderer(root, view());
}

/**
 * Render function
 * @param {HTMLElement} root - Parent Node
 * @param {HTMLElement} view - Rendered given Component
 */
const renderer = (root, view) => {
  // Get props from element to be cached
  const cacheProps = e => ({
    id: e.id,
    selectionStart: e.selectionStart,
    selectionEnd: e.selectionEnd,
    selectionDirection: e.selectionDirection,
    scrollTop: e.scrollTop,
    scrollLeft: e.scrollLeft
  });

  const identifiedElements = [];
  const focusedId = document.activeElement.id || ''

  if (focusedId) {
    identifiedElements.push(
      cacheProps(document.getElementById(focusedId))
    )
  }
  
  // Clear element before append
  while (root.firstChild) root.removeChild(root.firstChild);
  // root.append(...Array.isArray(view) ? view : [view]);
  root.appendChild(createElement(view))

  identifiedElements.forEach(element => {
    const newElement = document.getElementById(element.id);
    if (newElement) {
      // Preserve input focus on re-render using id
      if(element.id === focusedId) newElement.focus();
      Object.assign(newElement, element);
    }
  });

  return true
};
