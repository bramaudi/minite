import Tempe from './tempe.js'

const routes = [
  {
    path: '/counter',
    component: () => import('./views/counter.jsx')
  },
  {
    path: '',
    component: () => {
      return (
        <h1>Home</h1>
      )
    }
  }
]

window.app = new Tempe({
  el: '#app',
  routes
})