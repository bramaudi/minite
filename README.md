# ⏳ minite.js

A tiny Javascript library (around ~1kB gzipped) for create state-based UI component with simple *reactivity* power rendered on [real-dom](https://github.com/danculley/real-dom) using React-like API, let you learn & start just in a *minite*.

## Installtaion

### Node JS

```js
import { m, render } from 'minite'
// const { m, render } = require('minite')
```

### CDN

HTML:
```html
<script src="https://unpkg.com/minite@0.1.21/dist/minite.umd.js"></script>
```

JavaScript:
```js
// "minite" instance available globally
const { m, render } = minite
```

## Quick Start

HTML:
```html
<div id="app"></div>
```

JavaScript:
```js
import { m, render, useState } from 'minite'

const App = () => {
  const [count, setCount] = useState(0)

  // Tag name 'x' -> fragment, return childrens
  return m('x', [
    m('p', 'Count: ${count}'),
    m('button', { onClick: () => setCount(count + 1) }, '+1'),
    m('button', { onClick: () => setCount(count - 1) }, '-1'),
  ])
}

const root = document.getElementById('app')
render(root, App)
```

## TODO

- [ ] Writing documentation
- [ ] Adding more example
