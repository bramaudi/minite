import { useReducer } from '../src/index'

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

console.log(useReducer);

// const store = useReducer(reducer)

export default 1
