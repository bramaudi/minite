import { m } from '../router.js'
import store from '../models/counter.js'

const Counter = () => {
  
  store.init(Counter)
  
  const increment = () => {
    store.set({
      count: store.state.count += 1
    })
  }

  const decrement = () => {
    store.set({
      count: store.state.count -= 1
    })
  }

  return m('div', [
    m('h1', 'Counter'),
    m('div', `Count: ${store.state.count}`),
    m('button', {
      onclick: () => increment()
    }, '+1'),
    m('button', {
      onclick: () => decrement()
    }, '-1')
  ])
}

export default Counter
