import { remount } from './router.js'

const Store = {
  state: 0,
  app: null,
  init (app) {
    this.app = app
  },
  set (val) {
    this.state = val
    remount(this.app)
  }
}

export default Store