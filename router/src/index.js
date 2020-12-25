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
   * 
   * @param {Object>} config - { mount, render, preloader? }
   */
  constructor (config) {
    if (!config.mount) throw Error('[Router] "mount" point is missing')
    if (!config.render) throw Error('[Router] "render" func is missing')
    this.__parentNode = document.querySelector(config.mount)
    this.__render = config.render
    if (config.preloader) this.__preloader = config.preloader
    window.addEventListener('popstate', () => this.listen());
  }

  add = (path, component) => {
    path = path === '/' ? '^\/?$' : new RegExp(clearSlashes(path) + '$')
    this.__routes.push({ path, component })    
  }

  __mount = (view, props) => {
    if (typeof view().then === 'function') {
      if (this.__preloader) {
        this.__render(this.__parentNode, this.__preloader)
      }
      view().then(i => {
        this.__render(this.__parentNode, i.default, props)
      })
    } else {
      this.__render(this.__parentNode, view, props)
    }
  }

  listen = () => {
    const current = getFragment()
    this.__routes.some(({ path, component }) => {
      const match = current.match(path)
      if (match) {
        match.shift()
        // console.log(component().apply({}, match));
        this.__mount(component, match)
        return match;
      }
      return false
    })
  }
}

export default Router
