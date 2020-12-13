var handler = function () {
	return {
		get: function (obj, prop) {
			console.log('got it!');
			if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(obj[prop])) > -1) {
				return new Proxy(obj[prop], handler());
			}
			return obj[prop];
		},
		set: function (obj, prop, value) {
			console.log('set it');
			obj[prop] = value;
			return true;
		},
		deleteProperty: function (obj, prop) {
			console.log('delete it');
			delete obj[prop];
			return true;
		}
	};
};

export class Tempe {

  constructor (options) {
    this.el = document.querySelector(options.el)
    this.data = new Proxy(options.data || {}, handler())
    this.handler = options.handler
    this.view = options.view
  }

}

Tempe.prototype.render = function () {
  let view = this.view.apply({}, [this])
  this.el.textContent = ''
  this.el.append(...Array.isArray(view) ? view : [view])
}













export class Router {
  
  routes = []

  constructor(options) {
    options.routes && options.routes.map(({ path, component, layout }) => {
      this.add(path, component, layout)
    })
    this.el = options.el
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

  mount (component) {
    const { data, handler, view } = component
    const app = new Tempe({
      el: this.el,
      data,
      handler,
      view
    })  
    app.render()
  }

  interval = () => {
    if (this.current === this.getFragment()) return
    this.current = this.getFragment()

    this.routes.some(route => {
      const match = this.current.match(route.path)
      if (match) {
        match.shift()
        const component = route.component.apply()
        if (typeof component.then === 'function') {
          component.then(res => {
            this.mount(res.default.apply())
          })
        } else {
          this.mount(component)
        }
        return match;
      }
      return false
    })
  }

}

/**
 * DOM Create Element
 * @param {HTMLElementTagNameMap} tagName 
 * @param {Object} attrs 
 * @param  {...any} children 
 */
window.m = function (tagName, attrs, ...children) {
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

export default Tempe;
