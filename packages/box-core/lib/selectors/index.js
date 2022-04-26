"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectorRulesDisabled = exports.selectorRules = exports.chooseSelectorGlobalErrors = exports.chooseSelectorErrors = exports.chooseSelectorByNode = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _reselect = require("reselect");

var _get4 = _interopRequireDefault(require("lodash/get"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _findKey2 = _interopRequireDefault(require("lodash/findKey"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _join2 = _interopRequireDefault(require("lodash/join"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _mapKeys2 = _interopRequireDefault(require("lodash/mapKeys"));

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _jsonRules = _interopRequireWildcard(require("@stackhouseos/json-rules"));

var _flat = require("../flat");

var _utils = require("../utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getStateData = function getStateData(state) {
  return (0, _utils.isImmutable)(state) ? state.toJS() : state;
};

var select = function select(state, extraData, name) {
  var _get2, _get3;

  var cleanedPath = (0, _utils.cleanPath)(name);

  var _cleanedPath$split = cleanedPath.split('.'),
      _cleanedPath$split2 = (0, _toArray2["default"])(_cleanedPath$split),
      reducer = _cleanedPath$split2[0],
      rest = _cleanedPath$split2.slice(1);

  return (0, _utils.isImmutable)(state) ? (_get2 = (0, _get4["default"])(state.get(reducer), rest)) !== null && _get2 !== void 0 ? _get2 : (0, _get4["default"])(extraData, rest) : (_get3 = (0, _get4["default"])(state, cleanedPath)) !== null && _get3 !== void 0 ? _get3 : (0, _get4["default"])(extraData, cleanedPath);
};

var transformPrefix = function transformPrefix(key, prefix) {
  if ((0, _startsWith2["default"])(key, '^', 0)) {
    return key;
  }

  if ((0, _startsWith2["default"])(key, '#', 0)) {
    return (0, _utils.cleanPathHash)(key, prefix);
  }

  return "^".concat(key);
};

var chooseSelectorGlobalErrors = (0, _reselect.createSelector)(getStateData, function (state, extraData) {
  return extraData;
}, function (state, b, c, children) {
  return children;
}, function (state, b, c, d, prefix) {
  return prefix;
}, function (state, b, c, d, p, checkAll) {
  return checkAll;
}, function (data, extraData, children, prefix, checkAll) {
  if (Object.keys(children).length === 0) return {
    hasError: false
  };
  var validation = generateValidationsObject(Object.entries(children).filter(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return !!v;
  }).map(function (_ref3) {
    var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];

    return Object.assign({}, val, {
      id: transformPrefix(key, prefix)
    });
  }));

  var _checkRules = (0, _jsonRules["default"])(validation, Object.assign({}, data, extraData), false, {
    prefix: prefix,
    checkAll: checkAll
  }),
      _checkRules2 = (0, _slicedToArray2["default"])(_checkRules, 2),
      hasError = _checkRules2[0],
      results = _checkRules2[1];

  return {
    hasError: hasError,
    results: results
  };
});
exports.chooseSelectorGlobalErrors = chooseSelectorGlobalErrors;
var selectorRulesDisabled = (0, _reselect.createSelector)(getStateData, function (state, extraData) {
  return extraData;
}, function (a, b, rules) {
  return rules;
}, function (a, b, rules, children, prefix) {
  return prefix;
}, chooseSelectorGlobalErrors, function (a, b, rules, children, prefix, showAll, childId) {
  return childId;
}, function (state, extraData, rules, prefix, hasGloablError, childId) {
  var data = Object.assign({}, state, extraData, {
    hasError: hasGloablError.hasError,
    isValid: !hasGloablError.hasError,
    childId: childId
  });
  var r = (0, _isFunction2["default"])(rules) ? rules(data) : rules;
  if (!r) return false;
  var keys = (0, _jsonRules.getKeys)(r, {
    prefix: prefix
  });
  if (!keys) return false;
  var res = keys.reduce(function (acc, inc) {
    return Object.assign(acc, (0, _defineProperty2["default"])({}, inc, (0, _get4["default"])(data, inc)));
  }, {});

  var _checkRules3 = (0, _jsonRules["default"])(r, Object.assign({}, (0, _flat.unflatten)(res)), false, {
    prefix: prefix
  }),
      _checkRules4 = (0, _slicedToArray2["default"])(_checkRules3, 1),
      disabled = _checkRules4[0];

  return disabled;
});
exports.selectorRulesDisabled = selectorRulesDisabled;
var chooseSelectorByNode = (0, _reselect.createSelector)(select, function (data) {
  return data;
});
exports.chooseSelectorByNode = chooseSelectorByNode;

function mapKeysDeepLodash(obj, cb, isRecursive) {
  if (!obj && !isRecursive) {
    return {};
  }

  if (!isRecursive) {
    if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
      return {};
    }
  }

  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      return mapKeysDeepLodash(item, cb, true);
    });
  }

  if (!(0, _isPlainObject2["default"])(obj)) {
    return obj;
  }

  var result = (0, _mapKeys2["default"])(obj, cb);
  return (0, _mapValues2["default"])(result, function (value) {
    return mapKeysDeepLodash(value, cb, true);
  });
}

;

var generateValidationsObject = function generateValidationsObject(children) {
  return children.filter(function (e) {
    return e.id && (e.pattern || e.required || e.validate);
  }).map(function (inc) {
    return {
      and: [inc.validate && mapKeysDeepLodash(inc.validate, function (v, key) {
        return key === "self" ? inc.id : key;
      }), inc.pattern && (0, _defineProperty2["default"])({}, inc.id, {
        re: inc.pattern
      }), inc.required && (0, _defineProperty2["default"])({}, inc.id, {
        ex: true,
        name: 'required'
      })].filter(Boolean)
    };
  });
};

var chooseSelectorErrors = (0, _reselect.createSelector)(getStateData, function (state, extraData) {
  return extraData;
}, select, function (a, b, childId) {
  return childId;
}, function (a, b, c, child) {
  return child;
}, function (a, b, c, d, prefix) {
  return prefix;
}, function (state, extraData, childValue, childId, child, prefix) {
  var validation = generateValidationsObject([Object.assign({}, child, {
    id: transformPrefix(childId, prefix)
  })]);

  var _checkRules5 = (0, _jsonRules["default"])(validation, Object.assign({}, state, extraData, {
    self: childValue
  }), false, {
    prefix: prefix
  }),
      _checkRules6 = (0, _slicedToArray2["default"])(_checkRules5, 2),
      error = _checkRules6[0],
      results = _checkRules6[1];

  return error && (0, _join2["default"])(results.length === 0 ? ['error'] : results, '|#|');
});
exports.chooseSelectorErrors = chooseSelectorErrors;

var checkRule = function checkRule(state, prefix, rule) {
  var r = (0, _isFunction2["default"])(rule) ? rule(state) : rule;
  if (!r) return false;
  var keys = (0, _jsonRules.getKeys)(r, {
    prefix: prefix
  });
  if (!keys) return false;
  var res = keys.reduce(function (acc, inc) {
    return Object.assign(acc, (0, _defineProperty2["default"])({}, inc, (0, _get4["default"])(state, inc)));
  }, {});

  var _checkRules7 = (0, _jsonRules["default"])(r, (0, _flat.unflatten)(res), true, {
    prefix: prefix
  }),
      _checkRules8 = (0, _slicedToArray2["default"])(_checkRules7, 1),
      valid = _checkRules8[0];

  return valid;
};

var selectorRules = function selectorRules(keys, prefix) {
  return (0, _reselect.createSelector)(getStateData, function (state, extraData) {
    return extraData;
  }, function (state, extraData) {
    var data = Object.assign({}, state, extraData);

    if (Array.isArray(keys)) {
      var found = (0, _find2["default"])(keys, function (_ref7) {
        var rules = _ref7.rules;
        return checkRule(data, prefix, rules);
      });
      return found && found.value;
    }

    if ((0, _typeof2["default"])(keys) !== 'object') return keys;
    return (0, _findKey2["default"])(keys, function (rule) {
      return checkRule(data, prefix, rule);
    });
  });
};

exports.selectorRules = selectorRules;