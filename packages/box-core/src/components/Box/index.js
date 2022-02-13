/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moize from 'moize'
import { connect, ReactReduxContext } from 'react-redux';
import _get from 'lodash/get';
import { sortWithOrder, getPath, containerFields, cleanPath } from '../../utils';
import EmptyContainer from '../empty';
import { actionUpdate } from '../../actions';
import { withBoxContext } from '../../context';
import WrapperField from './wrapper-field';
import { chooseSelectorGlobalErrors } from '../../selectors';

const Controls = {};

export const createBoxInstance = () => connect(null, null, null, { forwardRef: true })(withBoxContext(class Box extends PureComponent {
  static contextType = ReactReduxContext;

  static defaultProps = {
    fields: [],
  };

  static propTypes = {
    prefix: PropTypes.string,
    destroyValue: PropTypes.bool,
    ruleModeDisable: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    /* Form fields */
    fields: PropTypes.array.isRequired,
    /* Function called when form value changes */
    onChange: PropTypes.func,
  };

  constructor(props) {
    super();
    const { DefaultControl, defaultType } = props
    const fields = containerFields(props.fields);
    this.state = { flatIds: {}, fields };

    const fn = id => (field, cb) => {
      if (id) {

        if (field === undefined) {

          this.setState(state => ({
            flatIds: Object.assign({}, state.flatIds, { [id]: undefined })
          }), cb);

          return

        } else {

          const { pattern = false, required = false, validate = false } = field || {}

          this.setState(state => {
            // nel caso ci sia pù volte lo stesso campo, usato la prima volta con un validatore e dopo solo in visualizzazione
            if (
              typeof field.pattern === 'undefined' &&
              typeof field.required === 'undefined' &&
              typeof field.validate === 'undefined' &&
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

    const finalFallbackControl = (DefaultControl || EmptyContainer)

    const fnControl = type => {
      return typeof type === 'string'
        ? Box.getControl(type) || Box.getControl(defaultType) || finalFallbackControl
        : type || finalFallbackControl
    }

    this.setFlatIdsMemoized = moize(fn) // usato per la validazione
    this.getControlMemoized = moize(fnControl)
  }

  static Controls = Controls;

  static getControl(type) {
    return Box.Controls[type];
  }

  static extendControls(controls) {
    Box.Controls = Object.assign({}, Box.Controls, controls);
    return Box;
  }

  static setControls(controls) {
    Box.Controls = controls;
    return Box;
  }

  static setControl(type, Control) {
    Box.Controls = Object.assign({}, Box.Controls, { [type]: Control });
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
    if (prevProps.fields !== this.props.fields) {
      const fields = containerFields(this.props.fields);
      this.setState({ fields })
    }
  }

  getFlatIds = () => {
    return this.state.flatIds;
  }

  onChange = (id, value, field) => {
    const { dispatch } = this.props;
    const { onChange, validate } = field;
    const [reducer, ...selector] = id.split('.');
    dispatch(actionUpdate(cleanPath(reducer), selector.join('.'), value, validate));
    if (onChange) {
      this.eventOnChange({ onChange, id, value, field, reducer })
    }
  };

  eventOnChange = ({ onChange, id, value, field, reducer }) => {
    const { dispatch } = this.props
    const baseData = Object.assign({}, { id, value, field, reducer }, this.commonProps)
    if (typeof onChange === 'string') dispatch({ type: onChange, payload: baseData });
    else dispatch(onChange(baseData));
  }

  get commonProps() {
    const { DefaultControl, defaultType, fields, sort, staticContext, ...commonProps } = this.props;
    return commonProps;
  }

  nestedFields = (field, prefix, prefixFunc) => {
    const fieldsList = Object.keys(field).filter(e => e.indexOf('_fields') > 0)
    if (!fieldsList.length) return

    const _fields = fieldsList.reduce((acc, inc) => {
      const [fieldKey] = inc.split('_fields');
      return Object.assign(acc,
        {
          [fieldKey]: this.renderFields(_get(field, inc), prefix, prefixFunc)
        })
    }, {});

    return _fields
  }

  renderField = (field, index, prefix, prefixFunc) => {
    const { destroyValue } = this.props
    const {
      type,
      id,
      fields,
      prefix: prefixFieldsId,
    } = field;

    const Control = this.getControlMemoized(type)

    if (!Control) {
      console.warn('Missing', type)
      return null
    }

    const getId = typeof id === 'string' && id

    const fieldId = getPath(prefix, prefixFieldsId, getId, prefixFunc);
    const [reducer, ...selector] = fieldId.split('.');

    return (
      <WrapperField
        {...this.commonProps}
        {...this.nestedFields(field, fieldId, prefixFunc)}
        key={`${fieldId}-${index}`}
        id={id}
        defaultDestroyValue={destroyValue}
        prefix={prefixFunc ? prefixFunc(prefix).prefix : prefix}
        field={field}
        fieldId={fieldId}
        flatIds={this.state.flatIds}
        setFlatId={this.setFlatIdsMemoized(fieldId)}
        reducer={reducer}
        selector={selector.join('.')}
        Control={Control}
        fieldType={typeof type === 'string' ? type : 'Class'}
        onChange={this.onChange}
        renderFields={this.renderFields}
      >
        {fields && this.renderFields(fields, fieldId, prefixFunc)}
      </WrapperField>
    )
  };

  renderFields = (fields, prefix, prefixFunc) => fields.map((field, index) => this.renderField(field, index, prefix, prefixFunc));

  render() {
    const { prefix, prefixFunc } = this.props;
    const { fields } = this.state
    return this.renderFields(fields, getPath(prefix, undefined, undefined, prefixFunc), prefixFunc);
  }
}))

export default createBoxInstance()