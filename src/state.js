const Store = {
  state: null,
  component: null,
  init (component) {
    this.component = component
  },
  set (val) {
    this.state = val
    window.app.remount(this.component)
  }
}

export default Store