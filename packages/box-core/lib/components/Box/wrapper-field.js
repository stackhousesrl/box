"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _field = _interopRequireDefault(require("./field"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var WrapperField = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(WrapperField, _PureComponent);

  var _super = _createSuper(WrapperField);

  function WrapperField() {
    (0, _classCallCheck2["default"])(this, WrapperField);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(WrapperField, [{
    key: "render",

    /*    
    componentWillReceiveProps(nextProps) {
      for (const index in nextProps) {
        if (nextProps[index] !== this.props[index]) {
          console.log(index, this.props, this.props[index], '-->', nextProps[index]);
        }
      }
    } 
    */
    value: function render() {
      var _this$props = this.props,
          field = _this$props.field,
          disabled = _this$props.disabled;
      var ruleModeDisable = field.ruleModeDisable;
      if (disabled && !ruleModeDisable) return null;
      return /*#__PURE__*/_react["default"].createElement(_field["default"], this.props);
    }
  }]);
  return WrapperField;
}(_react.PureComponent);

var makeMapStateToProps = function makeMapStateToProps(state, props) {
  var prefix = props.prefix,
      field = props.field,
      contextProps = props.contextProps,
      flatIds = props.flatIds,
      disableRules = props.disableRules;
  var rules = field.rules;
  return {
    disabled: !disableRules && rules && (0, _selectors.selectorRulesDisabled)(state, contextProps, rules, flatIds, prefix),
    flatIds: undefined
  };
};

var _default = (0, _reactRedux.connect)(makeMapStateToProps, null, null, {
  forwardRef: true
})(WrapperField);

exports["default"] = _default;