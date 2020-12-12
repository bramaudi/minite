import { remount } from './router.js'

export const state = {
  count: 0
}

export const increment = (app) => {
  state.count += 1
  remount(app)
}
