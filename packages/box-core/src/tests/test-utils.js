// test-utils.jsx
import { createSlice } from '@reduxjs/toolkit'
import { set } from 'lodash'

export const userSlice = createSlice({
  name: 'app',
  initialState: {

  },
  reducers: {},
  extraReducers: {
    "@box/app/update": (state, action) =>
      set(state, action.payload.id, action.payload.value),
  },
})
