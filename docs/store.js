import { useReducer } from '../src/index'

const reducer = (
  state = {
    text: '',
    todos: []
  },
  action
) => {

  switch (action.type) {
    case 'TEXT_INPUT':
      state.text = action.value
      return state
    case 'TODO_PUSH':
      state.todos.push(state.text)
      return state
    default:
      return state
  }

}

const store = useReducer(reducer)

export default store
