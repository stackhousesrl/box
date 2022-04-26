"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immer = _interopRequireDefault(require("immer"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _unset2 = _interopRequireDefault(require("lodash/unset"));

var reducer = function reducer(name) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var action = arguments.length > 2 ? arguments[2] : undefined;
  return (// eslint-disable-next-line consistent-return
    (0, _immer["default"])(state, function (draft) {
      switch (action.type) {
        case "@box/".concat(name, "/update"):
          (0, _set2["default"])(draft, action.payload.id, action.payload.value);
          break;

        case "@box/".concat(name, "/reset"):
          (0, _unset2["default"])(draft, action.payload.id);
          break;

        default:
          return draft;
      }
    })
  );
};

var _default = reducer;
exports["default"] = _default;