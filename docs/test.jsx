import { m, render } from '../src/index'
import store from './store'
// import Counter from './counter'

/** @jsx m */
/** @jsxFrag 'x' */
const Main = () => {
  const { text, todos } = store.getState()

  const handleInput = e => {
    store.dispatch({
      type: 'TEXT_INPUT',
      value: e.target.value
    })
  }

  const handlePush = e => {
    if (e.key === 'Enter') {
      store.dispatch({ type: 'TODO_PUSH' })
      store.dispatch({
        type: 'TEXT_INPUT',
        value: ''
      })
    }
  }

  return (
    <>
      <h1>minite.js</h1>
      <div>Text: "{text}"</div>
      <input
        id="inp"
        type="text"
        value={text}
        onInput={handleInput}
        onKeyUp={handlePush}
        />
      
      <div>
        {todos.map(todo => <div>{todo}</div>)}
      </div>
    </>
  )
}

render(document.getElementById('app'), Main)

store.subscribe(() => {
  render(document.getElementById('app'), Main)
})
