"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSlice = void 0;

var _set2 = _interopRequireDefault(require("lodash/set"));

var _toolkit = require("@reduxjs/toolkit");

// test-utils.jsx
var userSlice = (0, _toolkit.createSlice)({
  name: 'app',
  initialState: {},
  reducers: {},
  extraReducers: {
    "@box/app/update": function boxAppUpdate(state, action) {
      return (0, _set2["default"])(state, action.payload.id, action.payload.value);
    }
  }
});
exports.userSlice = userSlice;