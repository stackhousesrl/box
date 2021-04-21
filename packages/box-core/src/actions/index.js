export const actionUpdate = (reducer, selector, value) => ({
  type: `@box/${reducer}/update`,
  payload: {
    id: selector,
    value,
  }
})

export const actionResetData = (reducer, selector) => ({
  type: `@box/${reducer}/reset`,
  payload: { id: selector },
})
