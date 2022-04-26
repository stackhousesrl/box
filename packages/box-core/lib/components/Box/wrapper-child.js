"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _get2 = _interopRequireDefault(require("lodash/get"));

var _selectors = require("../../selectors");

var _child = _interopRequireDefault(require("./child"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var WrapperChild = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(WrapperChild, _PureComponent);

  var _super = _createSuper(WrapperChild);

  function WrapperChild() {
    (0, _classCallCheck2["default"])(this, WrapperChild);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(WrapperChild, [{
    key: "render",
    value:
    /*    
    componentWillReceiveProps(nextProps) {
      for (const index in nextProps) {
        if (nextProps[index] !== this.props[index]) {
          console.log(index, this.props, this.props[index], '-->', nextProps[index]);
        }
      }
    } 
    */
    function render() {
      var _this$props = this.props,
          child = _this$props.child,
          disabled = _this$props.disabled;
      var ruleModeDisable = child.ruleModeDisable;
      if (disabled && !ruleModeDisable) return null;
      return /*#__PURE__*/_react["default"].createElement(_child["default"], this.props);
    }
  }]);
  return WrapperChild;
}(_react.PureComponent);

var makeMapStateToProps = function makeMapStateToProps(state, props) {
  var prefix = props.prefix,
      child = props.child,
      contextProps = props.contextProps,
      flatIds = props.flatIds,
      disableRules = props.disableRules,
      childId = props.childId;
  var rules = child.rules;
  return {
    disabled: !disableRules && rules && (0, _selectors.selectorRulesDisabled)(state, contextProps, rules, flatIds, prefix, false, childId),
    flatIds: undefined
  };
};

var _default = (0, _reactRedux.connect)(makeMapStateToProps, null, null, {
  forwardRef: true
})(WrapperChild);

exports["default"] = _default;