import Tempe from './tempe.js'

const Store = (state) => ({
  state,
  component: null,
  init (component) {
    this.component = component
  },
  set (val) {
    this.state = val
    new Tempe().remount(this.component)
  }
})

export default Store