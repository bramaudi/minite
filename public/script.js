import { html, render, Fragment } from '../src/minite.js'
import router from '../router/src/index.js'

const Home = () => html`
  <${Fragment}>
    <div>Home</div> <br/>
    <a href="#!/about">About</a>
  </${Fragment}>
`
const Preload = () => html`<h1>Loading</h1>`

const r = new router({
  mount: '#app',
  preloader: Preload
})

r.add('/', Home)
r.add('/about', () => import('./about.js'))
r.add('', () => html`<h1>404</h1>`)
r.listen()