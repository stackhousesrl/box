"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionResetData = exports.actionUpdate = void 0;

var actionUpdate = function actionUpdate(reducer, selector, value) {
  return {
    type: "@box/".concat(reducer, "/update"),
    payload: {
      id: selector,
      value: value
    }
  };
};

exports.actionUpdate = actionUpdate;

var actionResetData = function actionResetData(reducer, selector) {
  return {
    type: "@box/".concat(reducer, "/reset"),
    payload: {
      id: selector
    }
  };
};

exports.actionResetData = actionResetData;