import { suite } from 'uvu';
import * as assert from 'uvu/assert'

import { render as renderMJS } from '../dist/minite.module.js'
const { render: renderCJS } = require('../dist/minite.js')

const cjs = suite('cjs')

cjs('should be a function', () => {
  assert.type(renderCJS, 'function')
})

cjs.run()

const mjs = suite('mjs')

mjs('should be a function', () => {
  assert.type(renderMJS, 'function')
})

mjs.run()