/**
 * Used for global store management
 * @param {Function} reducer 
 */
export const useReducer = (reducer) => {
  
  let state, listeners = []

  /**
   * Get state
   */
  const getState = () => state

  /**
   * Dispatch a object to store reducer
   * @param {object} action 
   */
  const dispatch = action => {
    statex = reducer(statex, action)
    // console.log(listeners);
    listeners.forEach(listener => listener())
  }

  /**
   * Inject function that called on every mutation
   * @param {Function} listener 
   */
  const subscribe = listener => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  // Initial dispatch
  dispatch({})

  return { getState, dispatch, subscribe }
  
}
