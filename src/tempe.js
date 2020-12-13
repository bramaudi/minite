export class Tempe {
  
  routes = [];
  root = '/';
  el = null

  constructor(c = {}) {
    const el = c.el || '#app'
    this.el = document.querySelector(el)

    if (c.routes) {
      c.routes.map(({ path, component }) => {
        this.add(path, component)
      })
    }

    if (c.root) this.root = c.root

    this.listen()
  }

  /**
   * Mount component into the DOM
   * @param {string} child - CSS Selector
   */
  mount = (child) => {
    this.el.innerHTML = ''
    if (Array.isArray(child)) this.el.append(...child)
    else this.el.append(child)
  }

  getEl = () => {
    return this.app
  }

  /**
   * Remount given component
   * @param {} component
   */
  remount = (component) => {
    this.el.innerHTML = ''
    this.el.append(...component.apply())
  }

  m = (tagName, attrs, ...children) => {
    if (tagName === 'fragment') return children
  
    if (Array.isArray(attrs)) children = attrs
    else if (typeof attrs === 'string') children.push(attrs)
  
    // lowercase-ing object key, onClick -> onclick
    if (typeof attrs === 'object') {
      for (const key in attrs) {
        attrs[key.toLocaleLowerCase()] = attrs[key]
      }
    }
  
    // Mass assign attributes
    const elem = Object.assign(
      document.createElement(tagName),
      typeof attrs === 'object' ? attrs : {}
    )
  
    for (const child of children) {
      if (Array.isArray(child)) elem.append(...child)
      else elem.append(child)
    }
  
    return elem
  }

  add = (path, cb) => {
    path = path ? new RegExp(this.clearSlashes(path)) : ''
    this.routes.push({ path, cb });
    return this;
  }

  remove = path => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  }

  flush = () => {
    this.routes = [];
    return this;
  }

  clearSlashes = path =>
    path
      .toString()
      .replace(/\/$/, '')
      .replace(/^\//, '')

  getFragment = () => {
    let fragment = '';
    const match = window.location.href.match(/#!(.*)$/);
    fragment = match ? match[1] : ''
    return this.clearSlashes(fragment)
  }

  navigate = (path = '') => {
    window.location.href = `${window.location.href.replace(/#!(.*)$/, '')}#!${path}`;
    return this;
  }

  listen = () => {
    clearInterval(this.interval)
    this.interval = setInterval(this.interval, 50)
  }

  interval = () => {
    if (this.current === this.getFragment()) return
    this.current = this.getFragment()

    this.routes.some(route => {
      const match = this.current.match(route.path)
      if (match) {
        match.shift()
        const content = route.cb.apply()
        if (typeof content.then === 'function') {
          content.then(res => {
            this.mount(res.default.apply())
          })
        } else {
          this.mount(content)
        }
        return match;
      }
      return false
    })
  }

}

window.m = new Tempe().m

export default Tempe;
