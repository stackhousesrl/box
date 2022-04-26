"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _enzyme = _interopRequireDefault(require("enzyme"));

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

// import Adapter from '@wojtekmaj/enzyme-adapter-react-17' // Adapter ufficiale di enzyme per React 17 non ancora disponibile
console.warn = function () {}; // console.log = function() {}


_enzyme["default"].configure({
  adapter: new _enzymeAdapterReact["default"]()
});