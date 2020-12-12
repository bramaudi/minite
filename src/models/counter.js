import Store from '../state.js'

const Counter = {
  ...Store,
  state: {
    count: 0
  }
}

export default Counter
