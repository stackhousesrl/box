"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withBoxContext = exports.BoxContextProvider = exports.BoxContextConsumer = exports.BoxContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var context = (0, _react.createContext)({});
var BoxContextProvider = context.Provider;
exports.BoxContextProvider = BoxContextProvider;
var BoxContextConsumer = context.Consumer;
exports.BoxContextConsumer = BoxContextConsumer;

var withBoxContext = function withBoxContext(WrappedComponent) {
  var HoistedComponent = _react["default"].forwardRef(function (props, ref) {
    return /*#__PURE__*/_react["default"].createElement(BoxContextConsumer, null, function (boxContext) {
      return /*#__PURE__*/_react["default"].createElement(WrappedComponent, (0, _extends2["default"])({
        ref: ref
      }, props, {
        contextProps: boxContext
      }));
    });
  });

  return (0, _hoistNonReactStatics["default"])(HoistedComponent, WrappedComponent);
};

exports.withBoxContext = withBoxContext;
var BoxContext = context;
exports.BoxContext = BoxContext;