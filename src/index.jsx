import Tempe from 'tempe'
import Layout from '@/components/layout'
import Home from './views/home'

const routes = [
  {
    path: '/counter',
    component: () => import('@/views/counter.jsx'),
    layout: Layout
  },
  {
    path: '',
    component: () => Home,
    layout: Layout
  }
]

Tempe.router({ routes })