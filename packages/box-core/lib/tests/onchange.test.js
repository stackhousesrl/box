"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("jsdom-global/register");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _index = _interopRequireDefault(require("../index"));

var _enzyme = require("enzyme");

var _redux = require("redux");

var _testUtils = require("./test-utils");

var Text = function Text(_ref) {
  var text = _ref.text,
      value = _ref.value;
  return /*#__PURE__*/_react["default"].createElement("h1", null, text || value);
};

var Input = function Input(_ref2) {
  var _onChange = _ref2.onChange,
      _ref2$value = _ref2.value,
      value = _ref2$value === void 0 ? '' : _ref2$value,
      name = _ref2.name;
  return /*#__PURE__*/_react["default"].createElement("input", {
    name: name,
    value: value,
    onChange: function onChange(evt) {
      return _onChange(evt.target.value);
    }
  });
};

var Container = function Container(_ref3) {
  var children = _ref3.children;
  return /*#__PURE__*/_react["default"].createElement("div", null, children);
};

_index["default"].setComponents({
  Input: Input,
  Text: Text,
  Container: Container
});

describe('Test children update onChange', function () {
  var store;
  beforeEach(function () {
    store = (0, _redux.createStore)((0, _redux.combineReducers)({
      app: _testUtils.userSlice.reducer
    }));
  });
  it('Quando passo un valore ad un input valido, mi aspetto il render dell\'elemento correttamente', function () {
    var children = [{
      type: 'Input',
      id: 'surname',
      name: 'surname'
    }];
    var dispatchSpy = jest.spyOn(store, 'dispatch');
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
      store: store
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_index["default"], {
      data: children,
      prefix: "app"
    }))));
    wrapper.find('input').simulate('change', {
      target: {
        value: 'Hello'
      }
    });
    expect(dispatchSpy.mock.lastCall[0].type).toEqual('@box/app/update');
    expect(wrapper.html()).toEqual('<div><input name="surname" value=\"Hello\"></div>');
  });
  it('Quando passo un valore ad un input valido complesso e un valore di default, mi aspetto il render dell\'elemento correttamente', function () {
    var children = [{
      type: 'Input',
      id: 'a.b.c.surname',
      name: 'surname'
    }, {
      type: 'Input',
      id: 'a.name',
      "default": 'andrea'
    }];
    var dispatchSpy = jest.spyOn(store, 'dispatch');
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
      store: store
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_index["default"], {
      data: children,
      prefix: "app"
    }))));
    wrapper.find('input[name="surname"]').simulate('change', {
      target: {
        value: 'Hello'
      }
    });
    expect(dispatchSpy.mock.lastCall[0].type).toEqual('@box/app/update');
    expect(store.getState()).toEqual({
      app: {
        a: {
          name: 'andrea',
          b: {
            c: {
              surname: 'Hello'
            }
          }
        }
      }
    });
    expect(wrapper.html()).toEqual('<div><input name="surname" value=\"Hello\"><input value=\"andrea\"></div>');
  });
  it('Quando passo un valore ad un input obbligatorio, mi aspetto che sia validato (^isValid)', function () {
    var children = [{
      type: 'Input',
      id: 'surname',
      name: 'surname',
      required: true
    }, {
      type: 'Text',
      text: 'OKK',
      rules: {
        '^isValid': {
          eq: true
        }
      }
    }];
    var dispatchSpy = jest.spyOn(store, 'dispatch');
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
      store: store
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_index["default"], {
      data: children,
      prefix: "app"
    }))));
    wrapper.find('input').simulate('change', {
      target: {
        value: 'Hello'
      }
    });
    expect(dispatchSpy.mock.lastCall[0].type).toEqual('@box/app/update');
    expect(wrapper.html()).toEqual('<div><input name="surname" value=\"Hello\"><h1>OKK</h1></div>');
  });
  it('Quando non passo un valore ad un input obbligatorio, mi aspetto che non sia valido (^isValid)', function () {
    var children = [{
      type: 'Input',
      id: 'surname',
      name: 'surname',
      required: true
    }, {
      type: 'Text',
      text: 'OKK',
      rules: {
        '^isValid': {
          eq: true
        }
      }
    }, {
      type: 'Text',
      text: 'KO!',
      rules: {
        '^isValid': {
          eq: false
        }
      }
    }];
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
      store: store
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_index["default"], {
      data: children,
      prefix: "app"
    }))));
    expect(wrapper.html()).toEqual('<div><input name="surname" value=\"\"><h1>KO!</h1></div>');
  });
});