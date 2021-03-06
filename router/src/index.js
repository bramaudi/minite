import { render } from '../../src/minite.js';

/**
 * Helper to trim start/end slash
 * @param {String} path 
 */
const clearSlashes = path =>
  path
    .replace(/\/$/, '')
    .replace(/^\//, '')

/**
 * Helper to get pathname from url
 */
const getFragment = () => {
  let fragment = '';
  const match = window.location.href.match(/#!(.*)$/)
  fragment = match ? match[1] : ''
  return clearSlashes(fragment)
}

class Router {
  
  __routes = []
  __preloader = null
  __parentNode = null
  __render = null
  
  /**
   * Router instance
   * @param {{ mount, preloader? }} config - Configuration
   */
  constructor (config) {
    if (!config.mount) throw Error('[Router] "mount" point is missing')
    // if (!config.render) throw Error('[Router] "render" func is missing')
    this.__parentNode = document.querySelector(config.mount)
    this.__render = render
    if (config.preloader) this.__preloader = config.preloader
    window.addEventListener('popstate', () => this.listen());
  }

  /**
   * Add route
   * @param {String} path - URL Path
   * @param {{ view: Function, state?: Object }} component - Routed component
   */
  add = (path, component) => {
    path = path === '/' ? '^\/?$' : new RegExp(clearSlashes(path) + '$')
    this.__routes.push({ path, component })    
  }

  /**
   * Render router component
   * @param {{ view: Function, state?: Object }} component - Routed component
   * @param {Array} params - URL Params
   */
  __mount = (component, params) => {
    // Extract from routed component
    const view = () => component(params)
    
    // Dynamic / async componoent
    if (typeof view().then === 'function') {
      
      // Render preloader if exists
      if (this.__preloader) {
        this.__render(this.__parentNode, this.__preloader)
      }
      
      view().then(resp => {
        this.__render(this.__parentNode, resp.default)
      })

    } else {

      this.__render(this.__parentNode, view)

    }
  }

  /**
   * Handle mount on route changes
   */
  listen = () => {
    const current = getFragment()
    this.__routes.some(({ path, component }) => {
      const match = current.match(path)
      if (match) {
        match.shift()
        this.__mount(component, match)
        return match;
      }
      return false
    })
  }
}

export default Router
