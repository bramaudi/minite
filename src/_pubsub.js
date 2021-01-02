// NOT USED
export default class EventBus {

  __eventTarget

  constructor(description = '') {
    this.__eventTarget = document.appendChild(document.createComment(description))
  }

  /**
   * Add event
   * @param {String} type 
   * @param {(event: CustomEvent<DetailType>) => void} listener 
   * @param {Boolean} render
   */
  on(type, listener) {
    this.__eventTarget.addEventListener(type, listener)
  }

  /**
   * Add event once
   * @param {String} type 
   * @param {(event: CustomEvent<DetailType>) => void} listener 
   */
  once(type, listener) {
    this.__eventTarget.addEventListener(type, listener, { once: true })
  }

  /**
   * Remove event
   * @param {String} type 
   * @param {(event: CustomEvent<DetailType>) => void} listener 
   */
  off(type, listener) {
    this.__eventTarget.removeEventListener(type, listener)
  }

  /**
   * Emit/trigger event
   * @param {String} type 
   * @param {any} detail 
   */
  emit(type, detail = null) {
    return this.__eventTarget.dispatchEvent(
      new CustomEvent(type, { detail })
    )
  }
}