import { m } from '../router.js'
import { state, increment } from '../counter.js'

const Counter = () => {
  return m('div', [
    m('h1', 'Counter'),
    m('div', `Count: ${state.count}`),
    m('button', {
      onclick: () => increment(Counter)
    }, 'Tombol')
  ])
}

export default Counter
