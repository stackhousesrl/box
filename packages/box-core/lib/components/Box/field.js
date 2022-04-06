"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _objectWithoutProperties2=_interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));var _toArray2=_interopRequireDefault(require("@babel/runtime/helpers/toArray"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _react=_interopRequireWildcard(require("react"));var _reactRedux=require("react-redux");var _get2=_interopRequireDefault(require("lodash/get"));var _size2=_interopRequireDefault(require("lodash/size"));var _isEmpty2=_interopRequireDefault(require("lodash/isEmpty"));var _isNumber2=_interopRequireDefault(require("lodash/isNumber"));var _isFunction2=_interopRequireDefault(require("lodash/isFunction"));var _selectors=require("../../selectors");var _actions=require("../../actions");var _utils=require("../../utils");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){(0,_defineProperty2["default"])(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=(0,_getPrototypeOf2["default"])(Derived),result;if(hasNativeReflectConstruct){var NewTarget=(0,_getPrototypeOf2["default"])(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else{result=Super.apply(this,arguments)}return(0,_possibleConstructorReturn2["default"])(this,result)}}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true}catch(e){return false}}var BoxField=function(_PureComponent){(0,_inherits2["default"])(BoxField,_PureComponent);var _super=_createSuper(BoxField);function BoxField(){var _this;(0,_classCallCheck2["default"])(this,BoxField);_this=_super.call(this);(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onLoadHandler",function(){var _this$props=_this.props,field=_this$props.field,disabled=_this$props.disabled;var onLoad=field.onLoad;if(onLoad&&!disabled){_this.onLoad()}});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"resetField",function(){var _this$props2=_this.props,id=_this$props2.id,field=_this$props2.field,onChange=_this$props2.onChange,fieldId=_this$props2.fieldId,setFlatId=_this$props2.setFlatId,defaultDestroyValue=_this$props2.defaultDestroyValue;var _field$destroyValue=field.destroyValue,destroyValue=_field$destroyValue===void 0?defaultDestroyValue:_field$destroyValue;setFlatId(undefined,function(){if(destroyValue&&id){onChange(fieldId,undefined,field)}})});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onLoad",function(){var _this$props3=_this.props,field=_this$props3.field,dispatch=_this$props3.dispatch,contextProps=_this$props3.contextProps;var onLoad=field.onLoad;if(!onLoad)return;if(_this.loaded)return;_this.loaded=true;if(typeof onLoad==="string")dispatch(_objectSpread(_objectSpread({type:onLoad},contextProps),{},{field:field,fromOnLoad:true}));else dispatch(_objectSpread({fromOnLoad:true},onLoad(_objectSpread({field:field},contextProps))))});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onDestroy",function(){var _this$props4=_this.props,field=_this$props4.field,dispatch=_this$props4.dispatch,contextProps=_this$props4.contextProps;var onDestroy=field.onDestroy;if(!onDestroy)return;if(typeof onDestroy==="string")dispatch(_objectSpread(_objectSpread({type:onDestroy},contextProps),{},{field:field,fromOnDestroy:true}));else dispatch(_objectSpread({fromOnDestroy:true},onDestroy(_objectSpread({field:field},contextProps))))});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onChange",function(value){var _this$props5=_this.props,field=_this$props5.field,onChange=_this$props5.onChange,fieldId=_this$props5.fieldId;onChange(fieldId,value,field);_this.setState({blur:false})});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onChangeState",function(value){_this.setState({value:value,blur:false})});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onAction",function(paramsFromArgs){var _this$props6=_this.props,valueId=_this$props6.valueId,fieldId=_this$props6.fieldId,dispatch=_this$props6.dispatch,field=_this$props6.field,id=_this$props6.id,contextProps=_this$props6.contextProps;var store=_this.context.store;var action=field.action,paramsField=field.params;var selectorId=(0,_utils.getPath)(valueId||fieldId);var _selectorId$split=selectorId.split("."),_selectorId$split2=(0,_toArray2["default"])(_selectorId$split),reducer=_selectorId$split2[0],selector=_selectorId$split2.slice(1);var value=(0,_utils.select)()(store.getState(),selectorId);if(action){if(action==="#reset"){return dispatch((0,_actions.actionResetData)(reducer,selector.join(".")))}var baseData=Object.assign({},contextProps,{params:paramsField||paramsFromArgs,value:value,id:id,field:field,fieldId:fieldId,valueId:valueId,selectorId:selectorId});if(typeof action==="string")return dispatch({type:action,payload:baseData});else return action({dispatch:dispatch,payload:baseData})}});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"onBlur",function(){return _this.setState({blur:true})});(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this),"setError",function(){});_this.loaded=false;_this.state={blur:false};return _this}(0,_createClass2["default"])(BoxField,[{key:"componentDidMount",value:function componentDidMount(){var _this2=this;var _this$props7=this.props,setFlatId=_this$props7.setFlatId,validate=_this$props7.validate,required=_this$props7.required,pattern=_this$props7.pattern;var hasDefaultValue=typeof this.props.field["default"]==="number"?true:typeof this.props.field["default"]!=="undefined";setFlatId({validate:validate,required:required,pattern:pattern},function(){if(typeof _this2.props.value==="undefined"&&hasDefaultValue&&_this2.props.id){_this2.onChange(_this2.props.field["default"])}_this2.onLoadHandler()})}},{key:"componentDidUpdate",value:function componentDidUpdate(prevProps){var _this$props8=this.props,setFlatId=_this$props8.setFlatId,validate=_this$props8.validate,required=_this$props8.required,pattern=_this$props8.pattern;var validatePrev=prevProps.validate,requiredPrev=prevProps.required,patternPrev=prevProps.pattern;if(validate!==validatePrev||required!==requiredPrev||pattern!==patternPrev){setFlatId({validate:validate,required:required,pattern:pattern})}}},{key:"componentWillUnmount",value:function componentWillUnmount(){this.resetField();this.onDestroy()}},{key:"render",value:function render(){var _this$props9=this.props,Control=_this$props9.Control,field=_this$props9.field,match=_this$props9.match,dispatch=_this$props9.dispatch,history=_this$props9.history,keys=_this$props9.keys,setFlatId=_this$props9.setFlatId,contextProps=_this$props9.contextProps,defaultDestroyValue=_this$props9.defaultDestroyValue,onChange=_this$props9.onChange,props=(0,_objectWithoutProperties2["default"])(_this$props9,["Control","field","match","dispatch","history","keys","setFlatId","contextProps","defaultDestroyValue","onChange"]);var rules=field.rules,ruleModeDisable=field.ruleModeDisable,type=field.type,children=field.children,customSelectorId=field.customSelectorId,customSelectorFromId=field.customSelectorFromId,saveOnState=field.saveOnState,restField=(0,_objectWithoutProperties2["default"])(field,["rules","ruleModeDisable","type","children","customSelectorId","customSelectorFromId","saveOnState"]);var actions=restField.action&&{onAction:this.onAction};return _react["default"].createElement(Control,(0,_extends2["default"])({},restField,props,actions,{value:this.value,onBlur:this.onBlur,setError:this.setError,error:this.errorText,onChange:this.onChange,changeState:saveOnState&&this.onChangeState}))}},{key:"getError",get:function get(){var blur=this.state.blur;var _this$props10=this.props,error=_this$props10.error,contextProps=_this$props10.contextProps;var showErrors=contextProps.showErrors;if(!blur&&!showErrors)return null;if(!error)return null;var results=error.split("|#|");return results}},{key:"errorText",get:function get(){var error=this.getError;var field=this.props.field;var errorMessages=field.errorMessages;return error&&error.map(function(e){return typeof errorMessages==="string"?errorMessages:errorMessages&&errorMessages[e]||e||"Error"}).join(" ")}},{key:"value",get:function get(){var valueFromState=this.state.value;var _this$props11=this.props,value=_this$props11.value,field=_this$props11.field;var saveOnState=field.saveOnState;return saveOnState?valueFromState:value}}]);return BoxField}(_react.PureComponent);(0,_defineProperty2["default"])(BoxField,"contextType",_reactRedux.ReactReduxContext);(0,_defineProperty2["default"])(BoxField,"defaultProps",{contextProps:{}});var makeMapStateToProps=function makeMapStateToProps(state,props){var prefix=props.prefix,fieldId=props.fieldId,id=props.id,field=props.field,contextProps=props.contextProps,disableErrors=props.disableErrors;var valueFromProps=field.value,customSelectorId=field.customSelectorId,customSelectorValue=field.customSelectorValue;var makeSelectorId=customSelectorId||(0,_isFunction2["default"])(id)?(customSelectorId||id)(state,fieldId,field,contextProps):id&&(0,_selectors.chooseSelectorByNode)(state,contextProps,fieldId,field);var field_rules=Object.keys(field).filter(function(e){return e.indexOf("_rules")>0});var field_selector=Object.keys(field).filter(function(e){return e==="fromId"||e==="customSelectorFromId"||e.indexOf("_fromId")>0});var field_func=Object.keys(field).filter(function(e){return e.indexOf("_func")>0&&typeof e==="function"});var valueId=id||customSelectorId?makeSelectorId:valueFromProps;var value=customSelectorValue?customSelectorValue(state,valueId,contextProps):valueId;var field_with_rules=field_rules.reduce(function(acc,inc){var _inc$split=inc.split("_rules"),_inc$split2=(0,_slicedToArray2["default"])(_inc$split,1),fieldKey=_inc$split2[0];return Object.assign({},acc,(0,_defineProperty2["default"])({},fieldKey,(0,_selectors.selectorRules)((0,_get2["default"])(field,inc),prefix)(state,contextProps)||(0,_get2["default"])(field,"".concat(fieldKey,"_default"))))},{});var field_with_selector=field_selector.reduce(function(acc,inc){var _ref=inc==="fromId"||inc==="customSelectorFromId"?["fromStore"]:inc.split("_fromId"),_ref2=(0,_slicedToArray2["default"])(_ref,1),fieldKey=_ref2[0];var fieldValue=(0,_get2["default"])(field,inc)||(0,_get2["default"])(field,"".concat(fieldKey,"_default"));return Object.assign({},acc,(0,_defineProperty2["default"])({},fieldKey,(0,_isFunction2["default"])(fieldValue)?fieldValue(state,(0,_utils.getPath)(prefix),field,contextProps):(0,_selectors.chooseSelectorByNode)(state,contextProps,(0,_utils.getPath)(prefix,fieldValue),field)))},{});var field_with_func=field_func.reduce(function(acc,inc){var _inc$split3=inc.split("_func"),_inc$split4=(0,_slicedToArray2["default"])(_inc$split3,1),fieldKey=_inc$split4[0];return Object.assign({},acc,(0,_defineProperty2["default"])({},fieldKey,(0,_get2["default"])(field,inc)(value,state,contextProps,fieldId)))},{});var finalProps=_objectSpread(_objectSpread(_objectSpread(_objectSpread({pattern:field.pattern,required:field.required,validate:field.validate},field_with_rules),field_with_func),field_with_selector),{},{value:value});var required=finalProps.required,pattern=finalProps.pattern,validate=finalProps.validate;var error=!disableErrors&&fieldId&&(pattern||required||validate)&&(0,_selectors.chooseSelectorErrors)(state,contextProps,fieldId,{pattern:pattern,required:required,validate:validate},prefix);return _objectSpread(_objectSpread({},finalProps),{},{error:error})};var _default=(0,_reactRedux.connect)(makeMapStateToProps,null,null,{forwardRef:true})(BoxField);exports["default"]=_default;