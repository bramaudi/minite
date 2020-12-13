import { Router } from 'tempe'
import Home from './views/home'
// import Layout from '@/components/layout'
// import Home from './views/home'

const routes = [
  {
    path: '/counter',
    component: () => import('@/views/counter.jsx')
  },
  {
    path: '',
    component: Home
  }
]

new Router({
  el: '#app',
  routes
})