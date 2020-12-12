import { m, Router } from './router.js'

const routes = [
  {
    path: '/counter',
    component: () => import('./views/counter.js')
  },
  {
    path: '',
    component: () => {
      const h1 = m('h1', { id: 'asas' }, 'Home')
      return h1
    }
  }
]

new Router(routes)
