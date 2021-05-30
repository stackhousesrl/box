/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { ReactReduxContext } from 'react-redux';
import _get from 'lodash/get';
import _size from 'lodash/size';
import _isEmpty from 'lodash/isEmpty';
import _isNumber from 'lodash/isNumber'
import _isFunction from 'lodash/isFunction';
import { chooseSelectorByNode, chooseSelectorErrors, selectorRules } from '../../selectors'
import { actionResetData } from '../../actions';
import { select, getPath } from '../../utils';
import hocConnect from '../../hoc-connect';

class BoxField extends PureComponent {
  static contextType = ReactReduxContext;

  static defaultProps = {
    contextProps: {}
  }

  constructor() {
    super();
    this.loaded = false;
    this.state = { blur: false }
  }

  componentDidMount() {
    const { field, setFlatId } = this.props;

    const hasDefaultValue = typeof this.props.field.default === 'number'
      ? true
      : typeof this.props.field.default !== 'undefined'

    setFlatId(field, () => {

      if (typeof this.props.value === 'undefined' && hasDefaultValue && this.props.id) {
        this.onChange(this.props.field.default);
      }

      this.onLoadHandler();

    })


  }

  onLoadHandler = () => {
    const { field, disabled } = this.props;
    const { onLoad } = field;
    if (onLoad && !disabled) {
      this.onLoad()
    }
  }

  componentWillUnmount() {
    this.resetField();
    this.onDestroy();
  }

  resetField = () => {
    const { id, field, onChange, fieldId, setFlatId, defaultDestroyValue } = this.props;
    const { destroyValue = defaultDestroyValue } = field
    setFlatId(undefined, () => {
      if (destroyValue && id) {
        onChange(fieldId, undefined, field);
      }
    })
  }

  onLoad = () => {
    const { field, dispatch, contextProps } = this.props;
    const { onLoad } = field;
    if (!onLoad) return;
    if (this.loaded) return;
    this.loaded = true;
    if (typeof onLoad === 'string') dispatch({ type: onLoad, ...contextProps, field, fromOnLoad: true });
    else dispatch({ fromOnLoad: true, ...onLoad({ field, ...contextProps }) });
  }

  onDestroy = () => {
    const { field, dispatch, contextProps } = this.props;
    const { onDestroy } = field;
    if (!onDestroy) return;
    if (typeof onDestroy === 'string') dispatch({ type: onDestroy, ...contextProps, field, fromOnDestroy: true });
    else dispatch({ fromOnDestroy: true, ...onDestroy({ field, ...contextProps }) });
  }

  onChange = value => {
    const { field, onChange, fieldId, dispatch } = this.props;
    onChange(fieldId, value, field, dispatch);
    this.setState({ blur: false })
  }

  onChangeState = value => {
    this.setState({ value, blur: false })
  }

  onAction = (paramsFromArgs) => {
    const { valueId, fieldId, dispatch, field, id, contextProps } = this.props;
    const { dispatch: nodispatch, ...restContextProps } = contextProps

    const { store } = this.context;
    const { action, params: paramsField } = field;
    const selectorId = getPath(valueId || fieldId);

    const reduxStore = (store && store.getState) ? store.getState() : {}
    const state = { ...reduxStore, ...restContextProps }

    const [reducer, ...selector] = selectorId.split('.');
    const value = select()(state, selectorId);

    if (action) {
      if (action === '#reset') {
        return dispatch(actionResetData(reducer, selector.join('.')));
      }
      const baseData = Object.assign({}, restContextProps, { params: paramsField || paramsFromArgs, value, id, field, fieldId, valueId, selectorId });
      if (typeof action === 'string') return dispatch({ type: action, payload: baseData });
      else return action({ dispatch, payload: baseData });
    }
  }

  onBlur = () => this.setState({ blur: true })

  get getError() {
    const { blur } = this.state
    const { error, contextProps } = this.props
    const { showErrors } = contextProps
    if (!blur && !showErrors) return null
    if (!error) return null
    const results = error.split('|#|')
    return results
  }

  get errorText() {
    const error = this.getError;
    const { field } = this.props
    const { errorMessages } = field
    return error && error.map(e => typeof errorMessages === 'string'
      ? errorMessages
      : (errorMessages && errorMessages[e]) || e || 'Error').join(' ')
  }

  get value() {
    const { value: valueFromState } = this.state
    const { value, field } = this.props
    const { saveOnState } = field
    return saveOnState ? valueFromState : value
  }

  render() {
    const {
      Control,
      field,
      match,
      dispatch,
      history,
      keys,
      setFlatId,
      contextProps,
      defaultDestroyValue,
      onChange,
      ...props
    } = this.props;

    const {
      rules,
      ruleModeDisable,
      type,
      fields,
      customSelectorId,
      customSelectorFromId,
      saveOnState,
      ...restField
    } = field

    const actions = restField.action && { onAction: this.onAction }

    return (
      <Control
        {...restField}
        {...props}
        {...actions}
        value={this.value}
        onBlur={this.onBlur}
        error={this.errorText}
        onChange={this.onChange}
        changeState={saveOnState && this.onChangeState}
      />
    )
  }
}

const makeMapStateToProps = (state, props) => {
  const {
    prefix,
    fieldId,
    id,
    field,
    contextProps,
    disableErrors
  } = props;

  const {
    value: valueFromProps,
    customSelectorId,
    customSelectorValue,
    pattern,
    required,
    validate
  } = field;

  const makeSelectorId = customSelectorId || _isFunction(id)
    ? (customSelectorId || id)(state, fieldId, field, contextProps)
    : (id && chooseSelectorByNode(state, contextProps, fieldId, field))

  const field_rules = Object.keys(field).filter(e => e.indexOf('_rules') > 0)
  // fromId e customSelectorFromId, servono per la retrocompatibilità
  const field_selector = Object.keys(field).filter(e => e === 'fromId' || e === 'customSelectorFromId' || e.indexOf('_fromId') > 0)
  const field_func = Object.keys(field).filter(e => e.indexOf('_func') > 0 && typeof e === 'function')

  const valueId = (id || customSelectorId) ? makeSelectorId : valueFromProps;
  const value = customSelectorValue ? customSelectorValue(state, valueId, contextProps) : valueId;

  const field_with_rules = field_rules.reduce((acc, inc) => {
    const [fieldKey] = inc.split('_rules');
    return Object.assign({}, acc,
      {
        [fieldKey]: selectorRules(_get(field, inc), prefix)(state, contextProps) || _get(field, `${fieldKey}_default`),
      })
  }, {});

  const field_with_selector = field_selector.reduce((acc, inc) => {
    const [fieldKey] = (inc === 'fromId' || inc === 'customSelectorFromId') ? ['fromStore'] : inc.split('_fromId');
    const fieldValue = _get(field, inc) || _get(field, `${fieldKey}_default`)
    return Object.assign({}, acc,
      {
        [fieldKey]: _isFunction(fieldValue)
          ? fieldValue(state, getPath(prefix), field, contextProps)
          : chooseSelectorByNode(state, contextProps, getPath(prefix, fieldValue), field)
      })
  }, {});

  const field_with_func = field_func.reduce((acc, inc) => {
    const [fieldKey] = inc.split('_func');
    return Object.assign({}, acc,
      {
        [fieldKey]: _get(field, inc)(value, state, contextProps, fieldId),
      })
  }, {});

  const error = !disableErrors && fieldId && (pattern || required || validate) && chooseSelectorErrors(state, contextProps, fieldId, { pattern, required, validate }, prefix)

  return {
    ...field_with_rules,
    ...field_with_func,
    ...field_with_selector,
    error,
    value
  };
};


export default hocConnect(makeMapStateToProps)(BoxField)