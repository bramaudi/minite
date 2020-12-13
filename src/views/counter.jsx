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

  return (
    <>
      <h1>Counter</h1>
      <div>Count: {store.state.count}</div>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => decrement()}>-1</button>
    </>
  )
}

export default Counter
