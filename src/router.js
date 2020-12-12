export function m(tagName, attrs, ...children) {
  if (Array.isArray(attrs)) children = attrs
  else if (typeof attrs === 'string') children.push(attrs)
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

export function useState (state = {}) {
  console.log('useState', state);
  const dispatch = (func) => {
    // func.apply()
    console.log('Instance', func);
  }
  return { ...state, dispatch }
}

export const remount = (component) => {
  document.getElementById('app').innerHTML = null
  document.getElementById('app').appendChild(component.apply())
}

export class Router {
  
  routes = [];
  mode = 'hash';
  root = '/';

  constructor(routes = []) {
    routes.map(({ path, component }) => {
      this.add(path, component)
    })
    this.listen()
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
        const app = document.getElementById('app')
        app.innerHTML = null
        const content = route.cb.apply()
        if (typeof content.then === 'function') {
          content.then(res => {
            console.log(res.default.apply());
            app.appendChild(res.default.apply())
          })
        } else {
          app.appendChild(content)
        }
        return match;
      }
      return false
    })
  }

}

export default Router;
