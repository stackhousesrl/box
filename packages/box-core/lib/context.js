"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxContext = exports.BoxContextConsumer = exports.BoxContextProvider = exports.withBoxContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var context = (0, _react.createContext)({});
var BoxContextProvider = context.Provider;
exports.BoxContextProvider = BoxContextProvider;
var BoxContextConsumer = context.Consumer;
exports.BoxContextConsumer = BoxContextConsumer;

var withBoxContext = function withBoxContext(WrappedComponent) {
  return (0, _hoistNonReactStatics["default"])(function (props) {
    return /*#__PURE__*/_react["default"].createElement(BoxContextConsumer, null, function (boxContext) {
      return /*#__PURE__*/_react["default"].createElement(WrappedComponent, (0, _extends2["default"])({}, props, {
        contextProps: boxContext
      }));
    });
  }, WrappedComponent);
};

exports.withBoxContext = withBoxContext;
var BoxContext = context;
exports.BoxContext = BoxContext;