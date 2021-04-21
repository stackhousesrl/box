import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './reducers'

export default (preloadedState = {}) => {

  const middleware = [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false
    }),
  ]

  const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState,
    devTools: true
  })


  return { store }
}
