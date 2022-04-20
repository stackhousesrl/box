"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _typeof=require("@babel/runtime/helpers/typeof");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=exports.createBoxInstance=void 0;var _objectWithoutProperties2=_interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _toArray2=_interopRequireDefault(require("@babel/runtime/helpers/toArray"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _react=_interopRequireWildcard(require("react"));var _propTypes=_interopRequireDefault(require("prop-types"));var _moize=_interopRequireDefault(require("moize"));var _reactRedux=require("react-redux");var _get2=_interopRequireDefault(require("lodash/get"));var _utils=require("../../utils");var _empty=_interopRequireDefault(require("../empty"));var _actions=require("../../actions");var _context=require("../../context");var _wrapperChild=_interopRequireDefault(require("./wrapper-child"));var _selectors=require("../../selectors");var _excluded=["DefaultComponent","defaultType","data","sort","staticContext"];function _getRequireWildcardCache(nodeInterop){if(typeof WeakMap!=="function")return null;var cacheBabelInterop=new WeakMap;var cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function _getRequireWildcardCache(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule){return obj}if(obj===null||_typeof(obj)!=="object"&&typeof obj!=="function"){return{"default":obj}}var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj)){return cache.get(obj)}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(key!=="default"&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc)}else{newObj[key]=obj[key]}}}newObj["default"]=obj;if(cache){cache.set(obj,newObj)}return newObj}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=(0,_getPrototypeOf2["default"])(Derived),result;if(hasNativeReflectConstruct){var NewTarget=(0,_getPrototypeOf2["default"])(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else{result=Super.apply(this,arguments)}return(0,_possibleConstructorReturn2["default"])(this,result)}}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}var Components={};var createBoxInstance=function createBoxInstance(){var _class;return(0,_reactRedux.connect)(null,null,null,{forwardRef:true})((0,_context.withBoxContext)((_class=function(_PureComponent){(0,_inherits2["default"])(Box,_PureComponent);var _super=_createSuper(Box);function Box(props){var _this;(0,_classCallCheck2["default"])(this,Box);_this=_super.call(this);(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"isValid",function(){var store=_this.context.store;var _this$props=_this.props,contextProps=_this$props.contextProps,prefix=_this$props.prefix;var flatIds=_this.state.flatIds;var _chooseSelectorGlobal=(0,_selectors.chooseSelectorGlobalErrors)(store.getState(),contextProps,null,flatIds,prefix,true),hasError=_chooseSelectorGlobal.hasError,results=_chooseSelectorGlobal.results;return{ok:hasError===false,errors:results}});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"getFlatIds",function(){return _this.state.flatIds});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onChange",function(id,value,child){var dispatch=_this.props.dispatch;var onChange=child.onChange,validate=child.validate;var _id$split=id.split("."),_id$split2=(0,_toArray2["default"])(_id$split),reducer=_id$split2[0],selector=_id$split2.slice(1);dispatch((0,_actions.actionUpdate)((0,_utils.cleanPath)(reducer),selector.join("."),value,validate));if(onChange){_this.eventOnChange({onChange:onChange,id:id,value:value,child:child,reducer:reducer})}});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"eventOnChange",function(_ref){var onChange=_ref.onChange,id=_ref.id,value=_ref.value,child=_ref.child,reducer=_ref.reducer;var dispatch=_this.props.dispatch;var baseData=Object.assign({},{id:id,value:value,child:child,reducer:reducer},_this.commonProps);if(typeof onChange==="string")dispatch({type:onChange,payload:baseData});else dispatch(onChange(baseData))});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"nestedChildren",function(child,prefix,prefixFunc){var childrenList=Object.keys(child).filter(function(e){return e.indexOf("_children")>0});if(!childrenList.length)return;var _children=childrenList.reduce(function(acc,inc){var _inc$split=inc.split("_children"),_inc$split2=(0,_slicedToArray2["default"])(_inc$split,1),childKey=_inc$split2[0];return Object.assign(acc,(0,_defineProperty2["default"])({},childKey,_this.renderChildren((0,_get2["default"])(child,inc),prefix,prefixFunc)))},{});return _children});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"renderChild",function(child,index,prefix,prefixFunc){var destroyValue=_this.props.destroyValue;var type=child.type,id=child.id,children=child.children,prefixChildrenId=child.prefix;var Component=_this.getComponentMemoized(type);if(!Component){console.warn("Missing",type);return null}var getId=typeof id==="string"&&id;var childId=(0,_utils.getPath)(prefix,prefixChildrenId,getId,prefixFunc);var _childId$split=childId.split("."),_childId$split2=(0,_toArray2["default"])(_childId$split),reducer=_childId$split2[0],selector=_childId$split2.slice(1);return _react["default"].createElement(_wrapperChild["default"],(0,_extends2["default"])({},_this.commonProps,_this.nestedChildren(child,childId,prefixFunc),{key:"".concat(childId,"-").concat(index),id:id,defaultDestroyValue:destroyValue,prefix:prefixFunc?prefixFunc(prefix).prefix:prefix,child:child,childId:childId,flatIds:_this.state.flatIds,setFlatId:_this.setFlatIdsMemoized(childId),reducer:reducer,selector:selector.join("."),Component:Component,childType:typeof type==="string"?type:"Class",onChange:_this.onChange,renderChildren:_this.renderChildren}),children&&_this.renderChildren(children,childId,prefixFunc))});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"renderChildren",function(children,prefix,prefixFunc){return children.map(function(child,index){return _this.renderChild(child,index,prefix,prefixFunc)})});var DefaultComponent=props.DefaultComponent,defaultType=props.defaultType;var _children2=(0,_utils.containerChildren)(props.data);_this.state={flatIds:{},children:_children2};var fn=function fn(id){return function(child,cb){if(id){if(child===undefined){_this.setState(function(state){return{flatIds:Object.assign({},state.flatIds,(0,_defineProperty2["default"])({},id,undefined))}},cb);return}else{var _ref2=child||{},_ref2$pattern=_ref2.pattern,pattern=_ref2$pattern===void 0?false:_ref2$pattern,_ref2$required=_ref2.required,required=_ref2$required===void 0?false:_ref2$required,_ref2$validate=_ref2.validate,validate=_ref2$validate===void 0?false:_ref2$validate;_this.setState(function(state){if(typeof child.pattern==="undefined"&&typeof child.required==="undefined"&&typeof child.validate==="undefined"&&typeof(0,_get2["default"])(_this.state.flatIds,[id])==="undefined"){return}return{flatIds:Object.assign({},state.flatIds,(0,_defineProperty2["default"])({},id,{pattern:pattern!==null&&pattern!==void 0?pattern:(0,_get2["default"])(state.flatIds,[id,"pattern"]),required:required!==null&&required!==void 0?required:(0,_get2["default"])(state.flatIds,[id,"required"]),validate:validate!==null&&validate!==void 0?validate:(0,_get2["default"])(state.flatIds,[id,"validate"])}))}},cb);return}}if(cb)cb()}};var finalFallbackComponent=DefaultComponent||_empty["default"];var fnComponent=function fnComponent(type){return typeof type==="string"?Box.getComponent(type)||Box.getComponent(defaultType)||finalFallbackComponent:type||finalFallbackComponent};_this.setFlatIdsMemoized=(0,_moize["default"])(fn);_this.getComponentMemoized=(0,_moize["default"])(fnComponent);return _this}(0,_createClass2["default"])(Box,[{key:"componentDidUpdate",value:function componentDidUpdate(prevProps){if(prevProps.data!==this.props.data){var children=(0,_utils.containerChildren)(this.props.data);this.setState({children:children})}}},{key:"commonProps",get:function get(){var _this$props2=this.props,DefaultComponent=_this$props2.DefaultComponent,defaultType=_this$props2.defaultType,data=_this$props2.data,sort=_this$props2.sort,staticContext=_this$props2.staticContext,commonProps=(0,_objectWithoutProperties2["default"])(_this$props2,_excluded);return commonProps}},{key:"render",value:function render(){var _this$props3=this.props,prefix=_this$props3.prefix,prefixFunc=_this$props3.prefixFunc;var children=this.state.children;return this.renderChildren(children,(0,_utils.getPath)(prefix,undefined,undefined,prefixFunc),prefixFunc)}}],[{key:"getComponent",value:function getComponent(type){return Box.Components[type]}},{key:"registerComponents",value:function registerComponents(components){Box.Components=Object.assign({},Box.Components,components);return Box}},{key:"setComponents",value:function setComponents(components){Box.Components=components;return Box}},{key:"setComponent",value:function setComponent(type,Component){Box.Components=Object.assign({},Box.Components,(0,_defineProperty2["default"])({},type,Component));return Box}}]);return Box}(_react.PureComponent),(0,_defineProperty2["default"])(_class,"contextType",_reactRedux.ReactReduxContext),(0,_defineProperty2["default"])(_class,"defaultProps",{data:[]}),(0,_defineProperty2["default"])(_class,"propTypes",{prefix:_propTypes["default"].string,destroyValue:_propTypes["default"].bool,ruleModeDisable:_propTypes["default"].bool,dispatch:_propTypes["default"].func.isRequired,data:_propTypes["default"].array.isRequired,onChange:_propTypes["default"].func}),(0,_defineProperty2["default"])(_class,"Components",Components),_class)))};exports.createBoxInstance=createBoxInstance;var _default=createBoxInstance();exports["default"]=_default;