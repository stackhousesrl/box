"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});var _exportNames={render:true};exports.render=render;var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _objectWithoutProperties2=_interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));var _set2=_interopRequireDefault(require("lodash/set"));var _react=_interopRequireDefault(require("react"));var _react2=require("@testing-library/react");Object.keys(_react2).forEach(function(key){if(key==="default"||key==="__esModule")return;if(Object.prototype.hasOwnProperty.call(_exportNames,key))return;if(key in exports&&exports[key]===_react2[key])return;Object.defineProperty(exports,key,{enumerable:true,get:function get(){return _react2[key]}})});var _toolkit=require("@reduxjs/toolkit");var _reactRedux=require("react-redux");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){(0,_defineProperty2["default"])(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}var userSlice=(0,_toolkit.createSlice)({name:"app",initialState:{},reducers:{},extraReducers:{"@box/app/update":function boxAppUpdate(state,action){return(0,_set2["default"])(state,action.payload.id,action.payload.value)}}});function render(ui){var _ref=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{},preloadedState=_ref.preloadedState,_ref$store=_ref.store,store=_ref$store===void 0?(0,_toolkit.configureStore)({reducer:{app:userSlice.reducer},preloadedState:preloadedState}):_ref$store,renderOptions=(0,_objectWithoutProperties2["default"])(_ref,["preloadedState","store"]);function Wrapper(_ref2){var children=_ref2.children;return _react["default"].createElement(_reactRedux.Provider,{store:store},children)}return(0,_react2.render)(ui,_objectSpread({wrapper:Wrapper},renderOptions))}