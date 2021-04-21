"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createBoxInstance = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moize = _interopRequireDefault(require("moize"));

var _reactRedux = require("react-redux");

var _utils = require("../../utils");

var _empty = _interopRequireDefault(require("../empty"));

var _actions = require("../../actions");

var _context = require("../../context");

var _wrapperField = _interopRequireDefault(require("./wrapper-field"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Controls = {};

var createBoxInstance = function createBoxInstance() {
  var _class, _temp;

  return (0, _reactRedux.connect)()((0, _context.withBoxContext)((_temp = _class = /*#__PURE__*/function (_PureComponent) {
    (0, _inherits2["default"])(Box, _PureComponent);

    var _super = _createSuper(Box);

    function Box(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, Box);
      _this = _super.call(this);
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getFlatIds", function () {
        return _this.state.flatIds;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChange", function (id, value, field) {
        var dispatch = _this.props.dispatch;
        var onChange = field.onChange,
            validate = field.validate;

        var _id$split = id.split('.'),
            _id$split2 = (0, _toArray2["default"])(_id$split),
            reducer = _id$split2[0],
            selector = _id$split2.slice(1);

        dispatch((0, _actions.actionUpdate)((0, _utils.cleanPath)(reducer), selector.join('.'), value, validate));

        if (onChange) {
          _this.eventOnChange({
            onChange: onChange,
            id: id,
            value: value,
            field: field,
            reducer: reducer
          });
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "eventOnChange", function (_ref) {
        var onChange = _ref.onChange,
            id = _ref.id,
            value = _ref.value,
            field = _ref.field,
            reducer = _ref.reducer;
        var dispatch = _this.props.dispatch;
        var baseData = Object.assign({}, {
          id: id,
          value: value,
          field: field,
          reducer: reducer
        }, _this.commonProps);
        if (typeof onChange === 'string') dispatch({
          type: onChange,
          payload: baseData
        });else dispatch(onChange(baseData));
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderField", function (field, index, prefix) {
        var destroyValue = _this.props.destroyValue;
        var type = field.type,
            id = field.id,
            fields = field.fields,
            sort = field.sort,
            prefixFieldsId = field.prefix;

        var Control = _this.getControlMemoized(type);

        if (!Control) {
          console.warn('Missing', type);
          return null;
        }

        var getId = typeof id === 'string' && id;
        var fieldId = (0, _utils.getPath)(prefix, prefixFieldsId, getId);

        var _fieldId$split = fieldId.split('.'),
            _fieldId$split2 = (0, _toArray2["default"])(_fieldId$split),
            reducer = _fieldId$split2[0],
            selector = _fieldId$split2.slice(1);

        return /*#__PURE__*/_react["default"].createElement(_wrapperField["default"], (0, _extends2["default"])({}, _this.commonProps, {
          key: "".concat(fieldId, "-").concat(index),
          id: id,
          defaultDestroyValue: destroyValue,
          prefix: prefix,
          field: field,
          fieldId: fieldId,
          flatIds: _this.state.flatIds,
          setFlatId: _this.setFlatIdsMemoized(fieldId),
          reducer: reducer,
          selector: selector.join('.'),
          Control: Control,
          fieldType: typeof type === 'string' ? type : 'Class',
          onChange: _this.onChange
        }), fields && _this.renderFields(fields, sort, fieldId));
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderFields", function (fields, sort, prefix) {
        return (0, _utils.sortWithOrder)(fields, sort).map(function (field, index) {
          return _this.renderField(field, index, prefix);
        });
      });
      var DefaultControl = props.DefaultControl,
          defaultType = props.defaultType;

      var _fields = (0, _utils.containerFields)(props.fields);

      _this.state = {
        flatIds: {},
        fields: _fields
      };

      var fn = function fn(id) {
        return function (field, cb) {
          if (id && field === undefined) {
            _this.setState(function (state) {
              return {
                flatIds: Object.assign({}, state.flatIds, (0, _defineProperty2["default"])({}, id, undefined))
              };
            }, cb);

            return;
          }

          var _ref2 = field || {},
              pattern = _ref2.pattern,
              required = _ref2.required,
              validate = _ref2.validate;

          if (id && (pattern || required || validate)) {
            _this.setState(function (state) {
              return {
                flatIds: Object.assign({}, state.flatIds, (0, _defineProperty2["default"])({}, id, {
                  pattern: pattern,
                  required: required,
                  validate: validate
                }))
              };
            }, cb);

            return;
          }

          cb();
        };
      };

      var finalFallbackControl = DefaultControl || _empty["default"];

      var fnControl = function fnControl(type) {
        return typeof type === 'string' ? Box.getControl(type) || Box.getControl(defaultType) || finalFallbackControl : type || finalFallbackControl;
      };

      _this.setFlatIdsMemoized = (0, _moize["default"])(fn); // usato per la validazione

      _this.getControlMemoized = (0, _moize["default"])(fnControl);
      return _this;
    }

    (0, _createClass2["default"])(Box, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.fields !== this.props.fields) {
          var fields = (0, _utils.containerFields)(this.props.fields);
          this.setState({
            fields: fields
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            sort = _this$props.sort,
            prefix = _this$props.prefix;
        var fields = this.state.fields;
        return this.renderFields(fields, sort, (0, _utils.getPath)(prefix));
      }
    }, {
      key: "commonProps",
      get: function get() {
        var _this$props2 = this.props,
            DefaultControl = _this$props2.DefaultControl,
            defaultType = _this$props2.defaultType,
            fields = _this$props2.fields,
            sort = _this$props2.sort,
            staticContext = _this$props2.staticContext,
            commonProps = (0, _objectWithoutProperties2["default"])(_this$props2, ["DefaultControl", "defaultType", "fields", "sort", "staticContext"]);
        return commonProps;
      }
    }], [{
      key: "getControl",
      value: function getControl(type) {
        return Box.Controls[type];
      }
    }, {
      key: "extendControls",
      value: function extendControls(controls) {
        Box.Controls = Object.assign({}, Box.Controls, controls);
        return Box;
      }
    }, {
      key: "setControls",
      value: function setControls(controls) {
        Box.Controls = controls;
        return Box;
      }
    }, {
      key: "setControl",
      value: function setControl(type, Control) {
        Box.Controls = Object.assign({}, Box.Controls, (0, _defineProperty2["default"])({}, type, Control));
        return Box;
      }
    }]);
    return Box;
  }(_react.PureComponent), (0, _defineProperty2["default"])(_class, "defaultProps", {
    fields: []
  }), (0, _defineProperty2["default"])(_class, "propTypes", {
    /* Initial form value */
    prefix: _propTypes["default"].string,
    destroyValue: _propTypes["default"].bool,
    ruleModeDisable: _propTypes["default"].bool,
    dispatch: _propTypes["default"].func.isRequired,

    /* Fields {key: index } sort */
    sort: _propTypes["default"].array,

    /* Form fields */
    fields: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]).isRequired,

    /* Function called when form value changes */
    onChange: _propTypes["default"].func
  }), (0, _defineProperty2["default"])(_class, "Controls", Controls), _temp)));
};

exports.createBoxInstance = createBoxInstance;

var _default = createBoxInstance();

exports["default"] = _default;