import { render } from '../web_modules/preact.js'

class Router {
  
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
        const content = route.cb.apply()
        if (typeof content.then === 'function') {
          content.then(res => {
            render(res.default.apply(), document.getElementById('app'))
          })
        } else {
          render(content, document.getElementById('app'))
        }
        return match;
      }
      return false
    })
  }

}

export default Router;
