"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createBoxInstance: true,
  boxReducer: true,
  actionUpdate: true,
  actionResetData: true,
  selectorRules: true,
  selectorRulesDisabled: true
};
Object.defineProperty(exports, "createBoxInstance", {
  enumerable: true,
  get: function get() {
    return _Box.createBoxInstance;
  }
});
Object.defineProperty(exports, "boxReducer", {
  enumerable: true,
  get: function get() {
    return _data["default"];
  }
});
Object.defineProperty(exports, "actionUpdate", {
  enumerable: true,
  get: function get() {
    return _actions.actionUpdate;
  }
});
Object.defineProperty(exports, "actionResetData", {
  enumerable: true,
  get: function get() {
    return _actions.actionResetData;
  }
});
Object.defineProperty(exports, "selectorRules", {
  enumerable: true,
  get: function get() {
    return _selectors.selectorRules;
  }
});
Object.defineProperty(exports, "selectorRulesDisabled", {
  enumerable: true,
  get: function get() {
    return _selectors.selectorRulesDisabled;
  }
});
exports["default"] = void 0;

var _Box = _interopRequireWildcard(require("./components/Box"));

var _data = _interopRequireDefault(require("./reducer/data"));

var _actions = require("./actions");

var _selectors = require("./selectors");

var _context = require("./context");

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _context[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _flat = require("./flat");

Object.keys(_flat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _flat[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _flat[key];
    }
  });
});
var _default = _Box["default"];
exports["default"] = _default;