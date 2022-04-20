/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moize from 'moize'
import { connect, ReactReduxContext } from 'react-redux';
import _get from 'lodash/get';
import { getPath, containerChildren, cleanPath } from '../../utils';
import EmptyContainer from '../empty';
import { actionUpdate } from '../../actions';
import { withBoxContext } from '../../context';
import WrapperChild from './wrapper-child';
import { chooseSelectorGlobalErrors } from '../../selectors';

const Components = {};

export const createBoxInstance = () => connect(null, null, null, { forwardRef: true })(withBoxContext(class Box extends PureComponent {
  static contextType = ReactReduxContext;

  static defaultProps = {
    data: [],
  };

  static propTypes = {
    prefix: PropTypes.string,
    destroyValue: PropTypes.bool,
    ruleModeDisable: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    /* Function called when form value changes */
    onChange: PropTypes.func,
  };

  constructor(props) {
    super();
    const { DefaultComponent, defaultType } = props
    const children = containerChildren(props.data);
    this.state = { flatIds: {}, children };

    const fn = id => (child, cb) => {
      if (id) {

        if (child === undefined) {

          this.setState(state => ({
            flatIds: Object.assign({}, state.flatIds, { [id]: undefined })
          }), cb);

          return

        } else {

          const { pattern = false, required = false, validate = false } = child || {}

          this.setState(state => {
            // nel caso ci sia pù volte lo stesso campo, usato la prima volta con un validatore e dopo solo in visualizzazione
            if (
              typeof child.pattern === 'undefined' &&
              typeof child.required === 'undefined' &&
              typeof child.validate === 'undefined' &&
              typeof _get(this.state.flatIds, [id]) === 'undefined'
            ) {
              return
            }

            return {
              flatIds: Object.assign({}, state.flatIds, {
                [id]: {
                  pattern: pattern ?? _get(state.flatIds, [id, 'pattern']),
                  required: required ?? _get(state.flatIds, [id, 'required']),
                  validate: validate ?? _get(state.flatIds, [id, 'validate']),
                }
              })
            }
          }, cb);

          return

        }



      }

      if (cb)
        cb()
    }

    const finalFallbackComponent = (DefaultComponent || EmptyContainer)

    const fnComponent = type => {
      return typeof type === 'string'
        ? Box.getComponent(type) || Box.getComponent(defaultType) || finalFallbackComponent
        : type || finalFallbackComponent
    }

    this.setFlatIdsMemoized = moize(fn) // usato per la validazione
    this.getComponentMemoized = moize(fnComponent)
  }

  static Components = Components;

  static getComponent(type) {
    return Box.Components[type];
  }

  static registerComponents(components) {
    Box.Components = Object.assign({}, Box.Components, components);
    return Box;
  }

  static setComponents(components) {
    Box.Components = components;
    return Box;
  }

  static setComponent(type, Component) {
    Box.Components = Object.assign({}, Box.Components, { [type]: Component });
    return Box;
  }

  isValid = () => {
    const { store } = this.context;
    const { contextProps, prefix } = this.props;
    const { flatIds } = this.state;
    const { hasError, results } = chooseSelectorGlobalErrors(store.getState(), contextProps, null, flatIds, prefix, true)
    return { ok: hasError === false, errors: results }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      const children = containerChildren(this.props.data);
      this.setState({ children })
    }
  }

  getFlatIds = () => {
    return this.state.flatIds;
  }

  onChange = (id, value, child) => {
    const { dispatch } = this.props;
    const { onChange, validate } = child;
    const [reducer, ...selector] = id.split('.');
    dispatch(actionUpdate(cleanPath(reducer), selector.join('.'), value, validate));
    if (onChange) {
      this.eventOnChange({ onChange, id, value, child, reducer })
    }
  };

  eventOnChange = ({ onChange, id, value, child, reducer }) => {
    const { dispatch } = this.props
    const baseData = Object.assign({}, { id, value, child, reducer }, this.commonProps)
    if (typeof onChange === 'string') dispatch({ type: onChange, payload: baseData });
    else dispatch(onChange(baseData));
  }

  get commonProps() {
    const { DefaultComponent, defaultType, data, sort, staticContext, ...commonProps } = this.props;
    return commonProps;
  }

  nestedChildren = (child, prefix, prefixFunc) => {
    const childrenList = Object.keys(child).filter(e => e.indexOf('_children') > 0)
    if (!childrenList.length) return

    const _children = childrenList.reduce((acc, inc) => {
      const [childKey] = inc.split('_children');
      return Object.assign(acc,
        {
          [childKey]: this.renderChildren(_get(child, inc), prefix, prefixFunc)
        })
    }, {});

    return _children
  }

  renderChild = (child, index, prefix, prefixFunc) => {
    const { destroyValue } = this.props
    const {
      type,
      id,
      children,
      prefix: prefixChildrenId,
    } = child;

    const Component = this.getComponentMemoized(type)

    if (!Component) {
      console.warn('Missing', type)
      return null
    }

    const getId = typeof id === 'string' && id

    const childrenId = getPath(prefix, prefixChildrenId, getId, prefixFunc);
    const [reducer, ...selector] = childrenId.split('.');

    return (
      <WrapperChild
        {...this.commonProps}
        {...this.nestedChildren(child, childrenId, prefixFunc)}
        key={`${childrenId}-${index}`}
        id={id}
        defaultDestroyValue={destroyValue}
        prefix={prefixFunc ? prefixFunc(prefix).prefix : prefix}
        child={child}
        childrenId={childrenId}
        flatIds={this.state.flatIds}
        setFlatId={this.setFlatIdsMemoized(childrenId)}
        reducer={reducer}
        selector={selector.join('.')}
        Component={Component}
        childType={typeof type === 'string' ? type : 'Class'}
        onChange={this.onChange}
        renderChildren={this.renderChildren}
      >
        {children && this.renderChildren(children, childrenId, prefixFunc)}
      </WrapperChild>
    )
  };

  renderChildren = (children, prefix, prefixFunc) => children.map((child, index) => this.renderChild(child, index, prefix, prefixFunc));

  render() {
    const { prefix, prefixFunc } = this.props;
    const { children } = this.state
    return this.renderChildren(children, getPath(prefix, undefined, undefined, prefixFunc), prefixFunc);
  }
}))

export default createBoxInstance()