"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortWithOrder = exports.select = exports.isImmutable = exports.getPath = exports.forceArray = exports.containerChildren = exports.cleanPathHash = exports.cleanPath = void 0;

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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

var getPath = function getPath(prefix, prefixChildrenId, id, prefixFunc) {
  var _ref = prefixFunc ? prefixFunc(prefix, prefixChildrenId, id) : {
    prefix: prefix,
    prefixChildrenId: prefixChildrenId,
    id: id
  },
      prefixValue = _ref.prefix,
      prefixChildrenIdValue = _ref.prefixChildrenId,
      idValue = _ref.id;

  var res = [].concat((0, _toConsumableArray2["default"])((prefixValue || '').split('.')), (0, _toConsumableArray2["default"])((prefixChildrenIdValue || '').split('.')), (0, _toConsumableArray2["default"])((idValue || '').split('.'))).filter(Boolean);

  if ((idValue || '').indexOf('^') === 0) {
    return cleanPath(idValue);
  }

  if ((idValue || '').indexOf('#') === 0) {
    return cleanPathHash(idValue, prefixValue);
  }

  if ((prefixChildrenIdValue || '').indexOf('^') === 0) {
    return cleanPath(prefixChildrenIdValue);
  }

  if ((prefixChildrenIdValue || '').indexOf('#') === 0) {
    return cleanPathHash(prefixChildrenIdValue, prefixValue);
  }

  return res.join('.');
};

exports.getPath = getPath;

var containerChildren = function containerChildren(children) {
  if (!children) return null; // eslint-disable-next-line no-unused-vars

  return Object.entries(forceArray(children)).reduce(function (acc, _ref2) {
    var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
        key = _ref3[0],
        child = _ref3[1];

    var childChildren = containerChildren(child.children);

    var nextChild = _objectSpread(_objectSpread({}, (0, _omit2["default"])(child, 'container')), {}, {
      children: childChildren,
      type: child.type || _empty["default"]
    });

    if (child.container) {
      var isReactCmp = Object.prototype.hasOwnProperty.call(child.container, '$$typeof');
      var node = typeof child.container === 'string' ? {
        type: child.container
      } : isReactCmp ? {
        type: child.container
      } : child.container;
      return [].concat((0, _toConsumableArray2["default"])(acc), [_objectSpread(_objectSpread({}, node), {}, {
        children: [nextChild]
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(acc), [nextChild]);
  }, []);
};

exports.containerChildren = containerChildren;

var sortWithOrder = function sortWithOrder(object, order) {
  if (!object) return object;
  if (!order) return Object.values(object);
  return [].concat((0, _toConsumableArray2["default"])(Object.values(object).filter(function (_ref4) {
    var key = _ref4.key;
    return order[key] !== undefined;
  }).sort(function (a, b) {
    return order[a.key] > order[b.key] ? +1 : -1;
  })), (0, _toConsumableArray2["default"])(Object.values(object).filter(function (_ref5) {
    var key = _ref5.key;
    return order[key] === undefined;
  })));
};

exports.sortWithOrder = sortWithOrder;