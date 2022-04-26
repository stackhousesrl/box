"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

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
Object.defineProperty(exports, "actionResetData", {
  enumerable: true,
  get: function get() {
    return _actions.actionResetData;
  }
});
Object.defineProperty(exports, "actionUpdate", {
  enumerable: true,
  get: function get() {
    return _actions.actionUpdate;
  }
});
Object.defineProperty(exports, "boxReducer", {
  enumerable: true,
  get: function get() {
    return _data["default"];
  }
});
Object.defineProperty(exports, "createBoxInstance", {
  enumerable: true,
  get: function get() {
    return _Box.createBoxInstance;
  }
});
exports["default"] = void 0;
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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = _Box["default"];
exports["default"] = _default;