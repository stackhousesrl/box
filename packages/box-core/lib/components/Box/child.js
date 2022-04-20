"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _typeof=require("@babel/runtime/helpers/typeof");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _objectWithoutProperties2=_interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));var _toArray2=_interopRequireDefault(require("@babel/runtime/helpers/toArray"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _react=_interopRequireWildcard(require("react"));var _reactRedux=require("react-redux");var _get2=_interopRequireDefault(require("lodash/get"));var _size2=_interopRequireDefault(require("lodash/size"));var _isEmpty2=_interopRequireDefault(require("lodash/isEmpty"));var _isNumber2=_interopRequireDefault(require("lodash/isNumber"));var _isFunction2=_interopRequireDefault(require("lodash/isFunction"));var _selectors=require("../../selectors");var _actions=require("../../actions");var _utils=require("../../utils");var _excluded=["Component","child","match","dispatch","history","keys","setFlatId","contextProps","defaultDestroyValue","onChange"],_excluded2=["rules","ruleModeDisable","type","children","customSelectorId","customSelectorFromId","saveOnState"];function _getRequireWildcardCache(nodeInterop){if(typeof WeakMap!=="function")return null;var cacheBabelInterop=new WeakMap;var cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function _getRequireWildcardCache(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule){return obj}if(obj===null||_typeof(obj)!=="object"&&typeof obj!=="function"){return{"default":obj}}var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj)){return cache.get(obj)}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(key!=="default"&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc)}else{newObj[key]=obj[key]}}}newObj["default"]=obj;if(cache){cache.set(obj,newObj)}return newObj}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach(function(key){(0,_defineProperty2["default"])(target,key,source[key])}):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}return target}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=(0,_getPrototypeOf2["default"])(Derived),result;if(hasNativeReflectConstruct){var NewTarget=(0,_getPrototypeOf2["default"])(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else{result=Super.apply(this,arguments)}return(0,_possibleConstructorReturn2["default"])(this,result)}}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}var BoxChild=function(_PureComponent){(0,_inherits2["default"])(BoxChild,_PureComponent);var _super=_createSuper(BoxChild);function BoxChild(){var _this;(0,_classCallCheck2["default"])(this,BoxChild);_this=_super.call(this);(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onLoadHandler",function(){var _this$props=_this.props,child=_this$props.child,disabled=_this$props.disabled;var onLoad=child.onLoad;if(onLoad&&!disabled){_this.onLoad()}});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"resetChild",function(){var _this$props2=_this.props,id=_this$props2.id,child=_this$props2.child,onChange=_this$props2.onChange,childrenId=_this$props2.childrenId,setFlatId=_this$props2.setFlatId,defaultDestroyValue=_this$props2.defaultDestroyValue;var _child$destroyValue=child.destroyValue,destroyValue=_child$destroyValue===void 0?defaultDestroyValue:_child$destroyValue;setFlatId(undefined,function(){if(destroyValue&&id){onChange(childrenId,undefined,child)}})});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onLoad",function(){var _this$props3=_this.props,child=_this$props3.child,dispatch=_this$props3.dispatch,contextProps=_this$props3.contextProps;var onLoad=child.onLoad;if(!onLoad)return;if(_this.loaded)return;_this.loaded=true;if(typeof onLoad==="string")dispatch(_objectSpread(_objectSpread({type:onLoad},contextProps),{},{child:child,fromOnLoad:true}));else dispatch(_objectSpread({fromOnLoad:true},onLoad(_objectSpread({child:child},contextProps))))});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onDestroy",function(){var _this$props4=_this.props,child=_this$props4.child,dispatch=_this$props4.dispatch,contextProps=_this$props4.contextProps;var onDestroy=child.onDestroy;if(!onDestroy)return;if(typeof onDestroy==="string")dispatch(_objectSpread(_objectSpread({type:onDestroy},contextProps),{},{child:child,fromOnDestroy:true}));else dispatch(_objectSpread({fromOnDestroy:true},onDestroy(_objectSpread({child:child},contextProps))))});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onChange",function(value){var _this$props5=_this.props,child=_this$props5.child,onChange=_this$props5.onChange,childrenId=_this$props5.childrenId;onChange(childrenId,value,child);_this.setState({blur:false})});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onChangeState",function(value){_this.setState({value:value,blur:false})});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onAction",function(paramsFromArgs){var _this$props6=_this.props,valueId=_this$props6.valueId,childrenId=_this$props6.childrenId,dispatch=_this$props6.dispatch,child=_this$props6.child,id=_this$props6.id,contextProps=_this$props6.contextProps;var store=_this.context.store;var action=child.action,paramsChild=child.params;var selectorId=(0,_utils.getPath)(valueId||childrenId);var _selectorId$split=selectorId.split("."),_selectorId$split2=(0,_toArray2["default"])(_selectorId$split),reducer=_selectorId$split2[0],selector=_selectorId$split2.slice(1);var value=(0,_utils.select)()(store.getState(),selectorId);if(action){if(action==="#reset"){return dispatch((0,_actions.actionResetData)(reducer,selector.join(".")))}var baseData=Object.assign({},contextProps,{params:paramsChild||paramsFromArgs,value:value,id:id,child:child,childrenId:childrenId,valueId:valueId,selectorId:selectorId});if(typeof action==="string")return dispatch({type:action,payload:baseData});else return action({dispatch:dispatch,payload:baseData})}});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onBlur",function(){return _this.setState({blur:true})});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"setError",function(){});_this.loaded=false;_this.state={blur:false};return _this}(0,_createClass2["default"])(BoxChild,[{key:"componentDidMount",value:function componentDidMount(){var _this2=this;var _this$props7=this.props,setFlatId=_this$props7.setFlatId,validate=_this$props7.validate,required=_this$props7.required,pattern=_this$props7.pattern;var hasDefaultValue=typeof this.props.child["default"]==="number"?true:typeof this.props.child["default"]!=="undefined";setFlatId({validate:validate,required:required,pattern:pattern},function(){if(typeof _this2.props.value==="undefined"&&hasDefaultValue&&_this2.props.id){_this2.onChange(_this2.props.child["default"])}_this2.onLoadHandler()})}},{key:"componentDidUpdate",value:function componentDidUpdate(prevProps){var _this$props8=this.props,setFlatId=_this$props8.setFlatId,validate=_this$props8.validate,required=_this$props8.required,pattern=_this$props8.pattern;var validatePrev=prevProps.validate,requiredPrev=prevProps.required,patternPrev=prevProps.pattern;if(validate!==validatePrev||required!==requiredPrev||pattern!==patternPrev){setFlatId({validate:validate,required:required,pattern:pattern})}}},{key:"componentWillUnmount",value:function componentWillUnmount(){this.resetChild();this.onDestroy()}},{key:"getError",get:function get(){var blur=this.state.blur;var _this$props9=this.props,error=_this$props9.error,contextProps=_this$props9.contextProps;var showErrors=contextProps.showErrors;if(!blur&&!showErrors)return null;if(!error)return null;var results=error.split("|#|");return results}},{key:"errorText",get:function get(){var error=this.getError;var child=this.props.child;var errorMessages=child.errorMessages;return error&&error.map(function(e){return typeof errorMessages==="string"?errorMessages:errorMessages&&errorMessages[e]||e||"Error"}).join(" ")}},{key:"value",get:function get(){var valueFromState=this.state.value;var _this$props10=this.props,value=_this$props10.value,child=_this$props10.child;var saveOnState=child.saveOnState;return saveOnState?valueFromState:value}},{key:"render",value:function render(){var _this$props11=this.props,Component=_this$props11.Component,child=_this$props11.child,match=_this$props11.match,dispatch=_this$props11.dispatch,history=_this$props11.history,keys=_this$props11.keys,setFlatId=_this$props11.setFlatId,contextProps=_this$props11.contextProps,defaultDestroyValue=_this$props11.defaultDestroyValue,onChange=_this$props11.onChange,props=(0,_objectWithoutProperties2["default"])(_this$props11,_excluded);var rules=child.rules,ruleModeDisable=child.ruleModeDisable,type=child.type,children=child.children,customSelectorId=child.customSelectorId,customSelectorFromId=child.customSelectorFromId,saveOnState=child.saveOnState,restChild=(0,_objectWithoutProperties2["default"])(child,_excluded2);var actions=restChild.action&&{onAction:this.onAction};return _react["default"].createElement(Component,(0,_extends2["default"])({},restChild,props,actions,{value:this.value,onBlur:this.onBlur,setError:this.setError,error:this.errorText,onChange:this.onChange,changeState:saveOnState&&this.onChangeState}))}}]);return BoxChild}(_react.PureComponent);(0,_defineProperty2["default"])(BoxChild,"contextType",_reactRedux.ReactReduxContext);(0,_defineProperty2["default"])(BoxChild,"defaultProps",{contextProps:{}});var makeMapStateToProps=function makeMapStateToProps(state,props){var prefix=props.prefix,childrenId=props.childrenId,id=props.id,child=props.child,contextProps=props.contextProps,disableErrors=props.disableErrors;var valueFromProps=child.value,customSelectorId=child.customSelectorId,customSelectorValue=child.customSelectorValue;var makeSelectorId=customSelectorId||(0,_isFunction2["default"])(id)?(customSelectorId||id)(state,childrenId,child,contextProps):id&&(0,_selectors.chooseSelectorByNode)(state,contextProps,childrenId,child);var child_rules=Object.keys(child).filter(function(e){return e.indexOf("_rules")>0});var child_selector=Object.keys(child).filter(function(e){return e==="fromId"||e==="customSelectorFromId"||e.indexOf("_fromId")>0});var child_func=Object.keys(child).filter(function(e){return e.indexOf("_func")>0&&typeof e==="function"});var valueId=id||customSelectorId?makeSelectorId:valueFromProps;var value=customSelectorValue?customSelectorValue(state,valueId,contextProps):valueId;var child_with_rules=child_rules.reduce(function(acc,inc){var _inc$split=inc.split("_rules"),_inc$split2=(0,_slicedToArray2["default"])(_inc$split,1),childKey=_inc$split2[0];return Object.assign({},acc,(0,_defineProperty2["default"])({},childKey,(0,_selectors.selectorRules)((0,_get2["default"])(child,inc),prefix)(state,contextProps)||(0,_get2["default"])(child,"".concat(childKey,"_default"))))},{});var child_with_selector=child_selector.reduce(function(acc,inc){var _ref=inc==="fromId"||inc==="customSelectorFromId"?["fromStore"]:inc.split("_fromId"),_ref2=(0,_slicedToArray2["default"])(_ref,1),childKey=_ref2[0];var childValue=(0,_get2["default"])(child,inc)||(0,_get2["default"])(child,"".concat(childKey,"_default"));return Object.assign({},acc,(0,_defineProperty2["default"])({},childKey,(0,_isFunction2["default"])(childValue)?childValue(state,(0,_utils.getPath)(prefix),child,contextProps):(0,_selectors.chooseSelectorByNode)(state,contextProps,(0,_utils.getPath)(prefix,childValue),child)))},{});var child_with_func=child_func.reduce(function(acc,inc){var _inc$split3=inc.split("_func"),_inc$split4=(0,_slicedToArray2["default"])(_inc$split3,1),childKey=_inc$split4[0];return Object.assign({},acc,(0,_defineProperty2["default"])({},childKey,(0,_get2["default"])(child,inc)(value,state,contextProps,childrenId)))},{});var finalProps=_objectSpread(_objectSpread(_objectSpread(_objectSpread({pattern:child.pattern,required:child.required,validate:child.validate},child_with_rules),child_with_func),child_with_selector),{},{value:value});var required=finalProps.required,pattern=finalProps.pattern,validate=finalProps.validate;var error=!disableErrors&&childrenId&&(pattern||required||validate)&&(0,_selectors.chooseSelectorErrors)(state,contextProps,childrenId,{pattern:pattern,required:required,validate:validate},prefix);return _objectSpread(_objectSpread({},finalProps),{},{error:error})};var _default=(0,_reactRedux.connect)(makeMapStateToProps,null,null,{forwardRef:true})(BoxChild);exports["default"]=_default;