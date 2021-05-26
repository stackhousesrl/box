"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _react=_interopRequireWildcard(require("react"));var _reactRedux=require("react-redux");var _context=require("./context");var _default=function _default(makeMapStateToProps){return function(WrappedComponent){return(0,_react.memo)(function(wrapperProps){var context=(0,_react.useContext)(_context.BoxContext);var ConnectedComponent=(0,_react.useMemo)(function(){return context.dispatch?WrappedComponent:(0,_reactRedux.connect)(makeMapStateToProps,null,null,{forwardRef:true})(WrappedComponent)},[context.dispatch]);if(context.dispatch){var newProps=(0,_react.useMemo)(function(){return makeMapStateToProps(context,wrapperProps)},[context,wrapperProps]);return _react["default"].createElement(ConnectedComponent,(0,_extends2["default"])({},wrapperProps,newProps,{dispatch:context.dispatch}))}return _react["default"].createElement(ConnectedComponent,wrapperProps)})}};exports["default"]=_default;