"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortWithOrder = exports.containerFields = exports.getPath = exports.select = exports.cleanPathHash = exports.cleanPath = exports.forceArray = exports.isImmutable = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _empty = _interopRequireDefault(require("../components/empty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var isImmutable = function isImmutable(obj) {
  return obj && (0, _isFunction2["default"])(obj.asImmutable) && (0, _isFunction2["default"])(obj.get);
};

exports.isImmutable = isImmutable;

var forceArray = function forceArray(items) {
  return Array.isArray(items) ? items : [items];
};

exports.forceArray = forceArray;

var cleanPath = function cleanPath(name) {
  var _char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '^';

  return (0, _trimStart2["default"])(name, _char);
};

exports.cleanPath = cleanPath;

var cleanPathHash = function cleanPathHash(name) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var _prefix$split = prefix.split('.'),
      _prefix$split2 = (0, _slicedToArray2["default"])(_prefix$split, 1),
      reducer = _prefix$split2[0];

  return reducer ? "^".concat(reducer, ".").concat((0, _trimStart2["default"])(name, '#')) : (0, _trimStart2["default"])(name, '#');
};

exports.cleanPathHash = cleanPathHash;

var select = function select() {
  return function (state, name) {
    var _name$split = name.split('.'),
        _name$split2 = (0, _toArray2["default"])(_name$split),
        reducer = _name$split2[0],
        rest = _name$split2.slice(1);

    return isImmutable(state) ? (0, _get2["default"])(state.get(reducer), rest) : (0, _get2["default"])(state, name);
  };
};

exports.select = select;

var getPath = function getPath(prefix, prefixFieldsId, id) {
  var res = [].concat((0, _toConsumableArray2["default"])((prefix || '').split('.')), (0, _toConsumableArray2["default"])((prefixFieldsId || '').split('.')), (0, _toConsumableArray2["default"])((id || '').split('.'))).filter(Boolean);

  if ((id || '').indexOf('^') === 0) {
    return cleanPath(id);
  }

  if ((id || '').indexOf('#') === 0) {
    return cleanPathHash(id, prefix);
  }

  if ((prefixFieldsId || '').indexOf('^') === 0) {
    return cleanPath(prefixFieldsId);
  }

  if ((prefixFieldsId || '').indexOf('#') === 0) {
    return cleanPathHash(prefixFieldsId, prefix);
  }

  return res.join('.');
};

exports.getPath = getPath;

var containerFields = function containerFields(fields) {
  if (!fields) return null; // eslint-disable-next-line no-unused-vars

  return Object.entries(forceArray(fields)).reduce(function (acc, _ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        key = _ref2[0],
        field = _ref2[1];

    var childFields = containerFields(field.fields);

    var nextField = _objectSpread(_objectSpread({}, (0, _omit2["default"])(field, 'container')), {}, {
      fields: childFields,
      type: field.type || _empty["default"]
    });

    if (field.container) {
      var isReactCmp = Object.prototype.hasOwnProperty.call(field.container, '$$typeof');
      var node = typeof field.container === 'string' ? {
        type: field.container
      } : isReactCmp ? {
        type: field.container
      } : field.container;
      return [].concat((0, _toConsumableArray2["default"])(acc), [_objectSpread(_objectSpread({}, node), {}, {
        fields: [nextField]
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(acc), [nextField]);
  }, []);
};

exports.containerFields = containerFields;

var sortWithOrder = function sortWithOrder(object, order) {
  if (!object) return object;
  if (!order) return Object.values(object);
  return [].concat((0, _toConsumableArray2["default"])(Object.values(object).filter(function (_ref3) {
    var key = _ref3.key;
    return order[key] !== undefined;
  }).sort(function (a, b) {
    return order[a.key] > order[b.key] ? +1 : -1;
  })), (0, _toConsumableArray2["default"])(Object.values(object).filter(function (_ref4) {
    var key = _ref4.key;
    return order[key] === undefined;
  })));
};

exports.sortWithOrder = sortWithOrder;