export const Tempe = {
  /**
   * Mount component into the DOM
   * @param {string} child - CSS Selector
   */
  mount ({ layout, component }) {
    document.body.textContent = ''
    component = component.apply()
    if (typeof component.then === 'function') {
      component.then(res => {
        const view = typeof res.default === 'function'
          ? res.default.apply()
          : res.default
        this.append(layout ? layout(view) : view)
      })
    } else {
      this.append(layout ? layout(component) : component)
    }
  },
  append (view) {
    view = Array.isArray(view) ? view : [view]
    document.body.append(...view)
  },

  /**
   * Remount given component
   * @param {} component
   */
  remount (component) {
    document.body.textContent = ''
    document.body.append(...component.apply())
  },

  /**
   * Setup router
   * @param {Object} c - Config
   */
  router (c) {
    new Router(c.routes)
    return c.routes
  },

  /**
   * Store for data reactivity
   * @param {any} state
   */
  store: (state) => ({
    state,
    component: null,
    mount (component) {
      this.component = component
      return this.component
    },
    set (val) {
      this.state = val
      Tempe.remount(this.component)
    }
  }),

  /**
   * DOM Create Element
   * @param {HTMLElementTagNameMap} tagName 
   * @param {Object} attrs 
   * @param  {...any} children 
   */
  m (tagName, attrs, ...children) {
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
}

export class Router {
  
  routes = []

  constructor(routes) {
    routes && routes.map(({ path, component, layout }) => {
      this.add(path, component, layout)
    })

    this.listen()
  }

  /**
   * Add route
   * @param {String} path 
   * @param {Function} cb 
   */
  add (path, component, layout = null) {
    path = path ? new RegExp(this.clearSlashes(path)) : ''
    this.routes.push({ path, component, layout });
    return this;
  }

  /**
   * Remove route
   * @param {String} path 
   */
  remove (path) {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  }

  /**
   * Flush routes
   */
  flush () {
    this.routes = [];
    return this;
  }

  clearSlashes (path) {
    return path
      .toString()
      .replace(/\/$/, '')
      .replace(/^\//, '')
  }

  getFragment = () => {
    let fragment = '';
    const match = window.location.href.match(/#!(.*)$/);
    fragment = match ? match[1] : ''
    return this.clearSlashes(fragment)
  }

  navigate (path = '') {
    window.location.href = `${window.location.href.replace(/#!(.*)$/, '')}#!${path}`;
    return this;
  }

  listen () {
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
        Tempe.mount(route)
        return match;
      }
      return false
    })
  }

}

window.m = Tempe.m

export default Tempe;
