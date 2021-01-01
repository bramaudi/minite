export function useState (initialState) {
  let _val = initialState

  function state() {
    return _val
  }

  function setState(newVal) {
    _val = newVal
  }

  return [state, setState]
}