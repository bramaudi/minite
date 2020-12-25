# ⏳ minite.js

Tiny Javascript library (only ~1kB gzipped) for create state-based UI component with simple *reactivity* mechanism with as simple as possible API, let you start in a *minite*.

## Installtaion

### Node JS

```js
import { m, render } from 'minite'
// const { m, render } = require('minite')
```

### CDN

HTML:
```html
<script src="https://unpkg.com/minite@0.1.16/dist/minite.umd.js"></script>
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
import minite from 'minite'
const { m, render } = minite

// Define initial state
const state = { count: 0 }

// Given parameter are used under the render function
const App = (state, setState) => {
  const { count } = state
  // Tag name 'x' -> fragment, to skip element wrapping
  return m('x', [
    m('p', 'Count: ${count}'),
    m('button', { onClick: () => setState('count', count + 1) }, '+1'),
    m('button', { onClick: () => setState('count', count - 1) }, '-1'),
  ])
}

const root = document.getElementById('app')
render(root, App, state)
```

## TODO

- [ ] Writing documentation
- [ ] Adding more example

### Credit

- [real-dom](https://github.com/danculley/real-dom) - simple dom engine
- [mitt](https://github.com/developit/mitt) - tiny event pubsub