"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectorRules = exports.chooseSelectorErrors = exports.chooseSelectorByNode = exports.selectorRulesDisabled = exports.chooseSelectorGlobalErrors = void 0;

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

var _jsonRules = _interopRequireWildcard(require("@stackhouseos/json-rules"));

var _flat = require("../flat");

var _utils = require("../utils");

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

  return (0, _utils.isImmutable)(state) ? (_get2 = (0, _get4["default"])(state.get(reducer), rest)) !== null && _get2 !== void 0 ? _get2 : (0, _get4["default"])(extraData.get(reducer), rest) : (_get3 = (0, _get4["default"])(state, cleanedPath)) !== null && _get3 !== void 0 ? _get3 : (0, _get4["default"])(extraData, cleanedPath);
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
}, function (state, b, c, fields) {
  return fields;
}, function (state, b, c, d, prefix) {
  return prefix;
}, function (data, extraData, fields, prefix) {
  if (Object.keys(fields).length === 0) return false;
  var validation = generateValidationsObject(Object.entries(fields).filter(function (_ref) {
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
    prefix: prefix
  }),
      _checkRules2 = (0, _slicedToArray2["default"])(_checkRules, 1),
      error = _checkRules2[0];

  return error;
});
exports.chooseSelectorGlobalErrors = chooseSelectorGlobalErrors;
var selectorRulesDisabled = (0, _reselect.createSelector)(getStateData, function (state, extraData) {
  return extraData;
}, function (a, b, rules) {
  return rules;
}, function (a, b, rules, fields, prefix) {
  return prefix;
}, chooseSelectorGlobalErrors, function (state, extraData, rules, prefix, hasError) {
  var data = Object.assign({}, state, extraData, {
    hasError: hasError,
    isValid: !hasError
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

var generateValidationsObject = function generateValidationsObject(fields) {
  return fields.filter(function (e) {
    return e.id && (e.pattern || e.required || e.validate);
  }).map(function (inc) {
    return {
      and: [inc.validate, inc.pattern && (0, _defineProperty2["default"])({}, inc.id, {
        re: inc.pattern
      }), inc.required && (0, _defineProperty2["default"])({}, inc.id, {
        ex: true,
        name: 'required'
      })].filter(Boolean)
    };
  });
}; // (state, contextProps, fieldId, field, prefix)


var chooseSelectorErrors = (0, _reselect.createSelector)(getStateData, function (state, extraData) {
  return extraData;
}, select, function (a, b, fieldId) {
  return fieldId;
}, function (a, b, c, field) {
  return field;
}, function (a, b, c, d, prefix) {
  return prefix;
}, function (state, extraData, fieldValue, fieldId, field, prefix) {
  var validation = generateValidationsObject([Object.assign({}, field, {
    id: transformPrefix(fieldId, prefix)
  })]);

  var _checkRules5 = (0, _jsonRules["default"])(validation, Object.assign({}, state, extraData, {
    self: fieldValue
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