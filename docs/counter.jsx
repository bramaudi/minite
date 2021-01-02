import { m } from '../src/index'
import store from './store'

/** @jsx m */
/** @jsxFrag 'x' */
const Counter = () => {
  return (
    <div>
      <h3>Counter</h3>
      <div>Count: {store.getState()}</div>
      <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  )
}

export default Counter
