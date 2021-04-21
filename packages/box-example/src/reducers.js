import { createSlice, combineReducers } from '@reduxjs/toolkit'
import _set from 'lodash/set';

export const global = createSlice({
  name: 'global',
  initialState: {

  },
  reducers: {
    setAccount: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    '@box/global/update': (state, action) => _set(state, action.payload.id, action.payload.value),
  },
});

export const news = createSlice({
  name: 'news',
  initialState: {

  },
  reducers: {
    setAccount: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    '@box/news/update': (state, action) => _set(state, action.payload.id, action.payload.value),
  },
});

export default combineReducers({
  global: global.reducer,
  news: news.reducer,
})
