const Home = () => {
  return {
    data: {
      count: 0
    },
    handler: {
      increment (app) {
        app.data.count += 1
        app.render()
      },
      decrement (app) {
        app.data.count -= 1
        app.render()
      }
    },
    view: (app) => (
      <>
        <a href="/#!/">&laquo; Home</a>
        <h1>Counter</h1>
        <p>Count: {app.data.count}</p>
        <button onClick={() => app.handler.increment(app)}>+</button>
        <button onClick={() => app.handler.decrement(app)}>-</button>
      </>
    )
  }
}

export default Home
