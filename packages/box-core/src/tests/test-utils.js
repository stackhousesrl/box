// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { set } from 'lodash'

const userSlice = createSlice({
  name: 'app',
  initialState: {

  },
  reducers: {},
  extraReducers: {
    "@box/app/update": (state, action) =>
      set(state, action.payload.id, action.payload.value),
  },
})

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { app: userSlice.reducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }