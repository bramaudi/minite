import { m, render } from '../src/index'
import store from './reducer'
import Counter from './counter'

/** @jsx m */
/** @jsxFrag 'x' */
const Main = () => {
  console.log(store);

  return (
    <>
      <h1>minite.js</h1>
      <div>Count: </div>
      <button onClick={() => setCount(1)}>+</button>
      {/* <Counter count={count} setCount={setCount} /> */}
    </>
  )
}

render(document.getElementById('app'), Main)