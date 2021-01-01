import { m, render, useState } from '../src/index'

/** @jsx m */
/** @jsxFrag 'x' */
const Main = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>minite.js</h1>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* <Counter count={count} setCount={setCount} /> */}
    </>
  )
}

render(document.getElementById('app'), Main)