import { m, useEvent } from '../src/index'

/** @jsx m */
/** @jsxFrag 'x' */
const Counter = (props) => {
  const { count, setCount } = props
  
  return (
    <div>
      <h3>Counter</h3>
      <div>Count: {count}</div>
      <button onClick={() => useEvent.emit('pesan', 'Sukses')}>Pesan</button>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  )
}

export default Counter
