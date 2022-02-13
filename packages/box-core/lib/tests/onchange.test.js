"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("jsdom-global/register");var _react=_interopRequireDefault(require("react"));var _reactRedux=require("react-redux");var _index=_interopRequireDefault(require("../index"));var _reduxMockStore=_interopRequireDefault(require("redux-mock-store"));var _enzyme=require("enzyme");var _sinon=_interopRequireDefault(require("sinon"));var mockStore=(0,_reduxMockStore["default"])([]);var Text=function Text(_ref){var text=_ref.text,value=_ref.value;return _react["default"].createElement("h1",null,text||value)};var Input=function Input(_ref2){var _onChange=_ref2.onChange,value=_ref2.value,name=_ref2.name;return _react["default"].createElement("input",{name:name,value:value,onChange:function onChange(evt){return _onChange(evt.target.value)}})};var Container=function Container(_ref3){var children=_ref3.children;return _react["default"].createElement("div",null,children)};_index["default"].setControls({Input:Input,Text:Text,Container:Container});describe("Test fields update onChange",function(){var store;beforeEach(function(){store=mockStore({app2:{secondName:"carla"},app:{name:"andrea"}})});it("Quando passo un field valido, mi aspetto il render dell'elemento correttamente",function(){var fields=[{type:"Input",id:"surname",name:"surname"}];var onChange=_sinon["default"].spy();var wrapper=(0,_enzyme.mount)(_react["default"].createElement(_reactRedux.Provider,{store:store},_react["default"].createElement("div",null,_react["default"].createElement(_index["default"],{fields:fields,prefix:"app"}))));wrapper.find("input").simulate("change",{target:{value:"Hello"}});expect(onChange);expect(wrapper.html()).toEqual("<div><input name=\"surname\" value=\"Hello\"></div>")})});