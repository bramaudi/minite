import { useReducer, bruh } from '../src/index.js'

const reducer = (state = 0, action) => {

  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }

}

console.log('bruh', bruh);
// const store = useReducer(reducer)

// console.log('store', store);

export default 1
