import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { m, useState, useReducer, useEffect } from '../dist/minite.module.js'

const dom = suite('createElement')
dom('should be a function', () => {
  assert.type(m, 'function')
})
dom.run()

const state = suite('useState')
state('should be a function', () => {
  assert.type(useState, 'function')
})
state.run()

const reducer = suite('useReducer')
reducer('should be a function', () => {
  assert.type(useReducer, 'function')
})
reducer.run()

const effect = suite('useEffect')
effect('should be a function', () => {
  assert.type(useEffect, 'function')
})
effect.run()