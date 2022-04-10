"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _react=_interopRequireDefault(require("react"));var _reactRedux=require("react-redux");var _index=_interopRequireDefault(require("../index"));var _reduxMockStore=_interopRequireDefault(require("redux-mock-store"));var _enzyme=require("enzyme");var mockStore=(0,_reduxMockStore["default"])([]);var Text=function Text(_ref){var text=_ref.text,value=_ref.value;return _react["default"].createElement("h1",null,text||value)};var Input=function Input(_ref2){var _onChange=_ref2.onChange,value=_ref2.value,name=_ref2.name;return _react["default"].createElement("input",{name:name,value:value,onChange:function onChange(evt){return _onChange(evt.target.value)}})};var Container=function Container(_ref3){var children=_ref3.children;return _react["default"].createElement("div",null,children)};_index["default"].setComponents({Input:Input,Text:Text,Container:Container});describe("Test children",function(){var store;beforeEach(function(){store=mockStore({app:{}})});it("Quando passo un field valido, mi aspetto il render dell'elemento correttamente",function(){var children=[{type:"Text",text:"andrea"}];var wrapper=(0,_enzyme.render)(_react["default"].createElement(_reactRedux.Provider,{store:store},_react["default"].createElement("div",null,_react["default"].createElement(_index["default"],{data:children,prefix:"app"}))));expect(wrapper.html()).toEqual("<h1>andrea</h1>")});it("Quando passo un field non valido, mi aspetto il render dell'elemento correttamente",function(){var children=[{type:"TextNO",text:"andrea"}];var wrapper=(0,_enzyme.render)(_react["default"].createElement(_reactRedux.Provider,{store:store},_react["default"].createElement(_index["default"],{data:children,prefix:"app"})));expect(wrapper.html()).toEqual("")});it("Quando passo due children valido, mi aspetto il render dell'elemento correttamente",function(){var children=[{type:"Text",text:"andrea"},{type:"Text",text:"carla"}];var wrapper=(0,_enzyme.render)(_react["default"].createElement(_reactRedux.Provider,{store:store},_react["default"].createElement("div",null,_react["default"].createElement(_index["default"],{data:children,prefix:"app"}))));expect(wrapper.html()).toEqual("<h1>andrea</h1><h1>carla</h1>")});it("Quando passo children validi nested, mi aspetto il render dell'elemento correttamente",function(){var children=[{container:"Container",type:"Text",text:"andrea"},{type:"Container",children:[{type:"Text",text:"carla"}]}];var wrapper=(0,_enzyme.render)(_react["default"].createElement(_reactRedux.Provider,{store:store},_react["default"].createElement("div",null,_react["default"].createElement(_index["default"],{data:children,prefix:"app"}))));expect(wrapper.html()).toEqual("<div><h1>andrea</h1></div><div><h1>carla</h1></div>")})});describe("Test value by id",function(){var store;beforeEach(function(){store=mockStore({app:{name:"andrea",secondName:"carla"}})});it("Quando passo un field valido, mi aspetto il render dell'elemento correttamente",function(){var children=[{type:"Text",id:"name"}];var wrapper=(0,_enzyme.render)(_react["default"].createElement(_reactRedux.Provider,{store:store},_react["default"].createElement("div",null,_react["default"].createElement(_index["default"],{data:children,prefix:"app"}))));expect(wrapper.html()).toEqual("<h1>andrea</h1>")});it("Quando passo due children valido, mi aspetto il render dell'elemento correttamente",function(){var children=[{type:"Text",id:"name"},{type:"Text",id:"secondName"}];var wrapper=(0,_enzyme.render)(_react["default"].createElement(_reactRedux.Provider,{store:store},_react["default"].createElement("div",null,_react["default"].createElement(_index["default"],{data:children,prefix:"app"}))));expect(wrapper.html()).toEqual("<h1>andrea</h1><h1>carla</h1>")});it("Quando passo children validi nested, mi aspetto il render dell'elemento correttamente",function(){var children=[{container:"Container",type:"Text",id:"name"},{type:"Container",children:[{type:"Text",id:"secondName"}]}];var wrapper=(0,_enzyme.render)(_react["default"].createElement(_reactRedux.Provider,{store:store},_react["default"].createElement("div",null,_react["default"].createElement(_index["default"],{data:children,prefix:"app"}))));expect(wrapper.html()).toEqual("<div><h1>andrea</h1></div><div><h1>carla</h1></div>")})});describe("Test value by root id",function(){var store;beforeEach(function(){store=mockStore({app2:{secondName:"carla"},app:{name:"andrea"},app3:{data:{valore:{secondName:"carla"}}}})});it("Quando passo un field valido, mi aspetto il render dell'elemento correttamente",function(){var children=[{type:"Text",id:"name"}];var wrapper=(0,_enzyme.render)(_react["default"].createElement(_reactRedux.Provider,{store:store},_react["default"].createElement("div",null,_react["default"].createElement(_index["default"],{data:children,prefix:"app"}))));expect(wrapper.html()).toEqual("<h1>andrea</h1>")});it("Quando passo due children valido, mi aspetto il render dell'elemento correttamente",function(){var children=[{type:"Text",id:"name"},{type:"Text",id:"^app2.secondName"}];var wrapper=(0,_enzyme.render)(_react["default"].createElement(_reactRedux.Provider,{store:store},_react["default"].createElement("div",null,_react["default"].createElement(_index["default"],{data:children,prefix:"app"}))));expect(wrapper.html()).toEqual("<h1>andrea</h1><h1>carla</h1>")});it("Quando passo children validi nested, mi aspetto il render dell'elemento correttamente",function(){var children=[{container:"Container",type:"Text",id:"name"},{type:"Container",children:[{type:"Text",id:"^app2.secondName"}]}];var wrapper=(0,_enzyme.render)(_react["default"].createElement(_reactRedux.Provider,{store:store},_react["default"].createElement("div",null,_react["default"].createElement(_index["default"],{data:children,prefix:"app"}))));expect(wrapper.html()).toEqual("<div><h1>andrea</h1></div><div><h1>carla</h1></div>")});it("Quando passo children validi nested con prefix nei nodi, mi aspetto il render dell'elemento correttamente",function(){var children=[{container:"Container",type:"Text",id:"^app.name"},{type:"Container",prefix:"data",children:[{type:"Container",prefix:"valore",children:[{type:"Text",id:"secondName"}]}]}];var wrapper=(0,_enzyme.render)(_react["default"].createElement(_reactRedux.Provider,{store:store},_react["default"].createElement("div",null,_react["default"].createElement(_index["default"],{data:children,prefix:"app3"}))));expect(wrapper.html()).toEqual("<div><h1>andrea</h1></div><div><div><h1>carla</h1></div></div>")})});