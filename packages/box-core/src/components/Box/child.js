/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { connect, ReactReduxContext } from 'react-redux';
import _get from 'lodash/get';
import _size from 'lodash/size';
import _isEmpty from 'lodash/isEmpty';
import _isNumber from 'lodash/isNumber'
import _isFunction from 'lodash/isFunction';
import { chooseSelectorByNode, chooseSelectorErrors, selectorRules } from '../../selectors'
import { actionResetData } from '../../actions';
import { select, getPath } from '../../utils';

class BoxChild extends PureComponent {
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
    const { setFlatId, validate, required, pattern } = this.props;

    const hasDefaultValue = typeof this.props.child.default === 'number'
      ? true
      : typeof this.props.child.default !== 'undefined'

    setFlatId({ validate, required, pattern }, () => {

      if (typeof this.props.value === 'undefined' && hasDefaultValue && this.props.id) {
        this.onChange(this.props.child.default);
      }

      this.onLoadHandler();

    })

  }

  componentDidUpdate(prevProps) {
    const { setFlatId, validate, required, pattern } = this.props;
    const { validate: validatePrev, required: requiredPrev, pattern: patternPrev } = prevProps;
    if (
      validate !== validatePrev ||
      required !== requiredPrev ||
      pattern !== patternPrev
    ) {
      setFlatId({ validate, required, pattern })
    }
  }

  onLoadHandler = () => {
    const { child, disabled } = this.props;
    const { onLoad } = child;
    if (onLoad && !disabled) {
      this.onLoad()
    }
  }

  componentWillUnmount() {
    this.resetChild();
    this.onDestroy();
  }

  resetChild = () => {
    const { id, child, onChange, childId, setFlatId, defaultDestroyValue } = this.props;
    const { destroyValue = defaultDestroyValue } = child
    setFlatId(undefined, () => {
      if (destroyValue && id) {
        onChange(childId, undefined, child);
      }
    })
  }

  onLoad = () => {
    const { child, dispatch, contextProps } = this.props;
    const { onLoad } = child;
    if (!onLoad) return;
    if (this.loaded) return;
    this.loaded = true;
    if (typeof onLoad === 'string') dispatch({ type: onLoad, ...contextProps, child, fromOnLoad: true });
    else dispatch({ fromOnLoad: true, ...onLoad({ child, ...contextProps }) });
  }

  onDestroy = () => {
    const { child, dispatch, contextProps } = this.props;
    const { onDestroy } = child;
    if (!onDestroy) return;
    if (typeof onDestroy === 'string') dispatch({ type: onDestroy, ...contextProps, child, fromOnDestroy: true });
    else dispatch({ fromOnDestroy: true, ...onDestroy({ child, ...contextProps }) });
  }

  onChange = value => {
    const { child, onChange, childId } = this.props;
    onChange(childId, value, child);
    this.setState({ blur: false })
  }

  onChangeState = value => {
    this.setState({ value, blur: false })
  }

  onAction = (paramsFromArgs) => {
    const { valueId, childId, dispatch, child, id, contextProps } = this.props;
    const { store } = this.context;
    const { action, params: paramsChild } = child;
    const selectorId = getPath(valueId || childId);

    const [reducer, ...selector] = selectorId.split('.');
    const value = select()(store.getState(), selectorId);

    if (action) {
      if (action === '#reset') {
        return dispatch(actionResetData(reducer, selector.join('.')));
      }
      const baseData = Object.assign({}, contextProps, { params: paramsChild || paramsFromArgs, value, id, child, childId, valueId, selectorId });
      if (typeof action === 'string') return dispatch({ type: action, payload: baseData });
      else return action({ dispatch, payload: baseData });
    }
  }

  onBlur = () => this.setState({ blur: true })
  setError = () => {

  }

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
    const { child } = this.props
    const { errorMessages } = child
    return error && error.map(e => typeof errorMessages === 'string'
      ? errorMessages
      : (errorMessages && errorMessages[e]) || e || 'Error').join(' ')
  }

  get value() {
    const { value: valueFromState } = this.state
    const { value, child } = this.props
    const { saveOnState } = child
    return saveOnState ? valueFromState : value
  }

  render() {
    const {
      Component,
      child,
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
      children,
      customSelectorId,
      customSelectorFromId,
      saveOnState,
      ...restChild
    } = child

    const actions = restChild.action && { onAction: this.onAction }

    return (
      <Component
        {...restChild}
        {...props}
        {...actions}
        value={this.value}
        onBlur={this.onBlur}
        setError={this.setError}
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
    childId,
    id,
    child,
    contextProps,
    disableErrors,
    selectors,
  } = props;
  
  const {
    value: valueFromProps,
    customSelectorValue,
  } = child;
  
  const customSelectorId = (selectors && selectors[id])
  const makeSelectorId = customSelectorId || _isFunction(id)
    ? (customSelectorId || id)(state, childId, child, contextProps)
    : (id && chooseSelectorByNode(state, contextProps, childId, child))

  const child_rules = Object.keys(child).filter(e => e.indexOf('_rules') > 0)
  // fromId e customSelectorFromId, servono per la retrocompatibilità
  const child_selector = Object.keys(child).filter(e => e === 'fromId' || e === 'customSelectorFromId' || e.indexOf('_fromId') > 0)
  const child_func = Object.keys(child).filter(e => e.indexOf('_func') > 0 && typeof e === 'function')

  const valueId = (id || customSelectorId) ? makeSelectorId : valueFromProps;
  const value = customSelectorValue ? customSelectorValue(state, valueId, contextProps) : valueId;

  const child_with_rules = child_rules.reduce((acc, inc) => {
    const [childKey] = inc.split('_rules');
    return Object.assign({}, acc,
      {
        [childKey]: selectorRules(_get(child, inc), prefix)(state, contextProps) || _get(child, `${childKey}_default`),
      })
  }, {});

  const child_with_selector = child_selector.reduce((acc, inc) => {
    const [childKey] = (inc === 'fromId' || inc === 'customSelectorFromId') ? ['fromStore'] : inc.split('_fromId');
    const childValue = _get(child, inc) || _get(child, `${childKey}_default`)
    const customSelectorFromId = (selectors && selectors[childValue])
    return Object.assign({}, acc,
      {
        [childKey]: customSelectorFromId || _isFunction(childValue)
          ? (customSelectorFromId || childValue)(state, getPath(prefix), child, contextProps)
          : chooseSelectorByNode(state, contextProps, getPath(prefix, childValue), child)
      })
  }, {});

  const child_with_func = child_func.reduce((acc, inc) => {
    const [childKey] = inc.split('_func');
    return Object.assign({}, acc,
      {
        [childKey]: _get(child, inc)(value, state, contextProps, childId),
      })
  }, {});


  const finalProps = {
    pattern: child.pattern,
    required: child.required,
    validate: child.validate,
    ...child_with_rules,
    ...child_with_func,
    ...child_with_selector,
    value
  };

  const { required, pattern, validate } = finalProps
  const error = !disableErrors && childId && (pattern || required || validate) && chooseSelectorErrors(state, contextProps, childId, { pattern, required, validate }, prefix)

  return {
    ...finalProps,
    error
  }
};


export default connect(
  makeMapStateToProps,
  null, null,
  { forwardRef: true },
)(BoxChild);
