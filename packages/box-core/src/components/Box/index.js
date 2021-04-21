/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moize from 'moize'
import { connect } from 'react-redux';
import { sortWithOrder, getPath, containerFields, cleanPath } from '../../utils';
import EmptyContainer from '../empty';
import { actionUpdate } from '../../actions';
import { withBoxContext } from '../../context';
import WrapperField from './wrapper-field';

const Controls = {};

export const createBoxInstance = () => connect()(withBoxContext(class Box extends PureComponent {

  static defaultProps = {
    fields: [],
  };

  static propTypes = {
    /* Initial form value */
    prefix: PropTypes.string,
    destroyValue: PropTypes.bool,
    ruleModeDisable: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    /* Fields {key: index } sort */
    sort: PropTypes.array,
    /* Form fields */
    fields: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    /* Function called when form value changes */
    onChange: PropTypes.func,
  };

  constructor(props) {
    super();
    const { DefaultControl, defaultType } = props
    const fields = containerFields(props.fields);
    this.state = { flatIds: {}, fields };

    const fn = id => (field, cb) => {

      if (id && field === undefined) {
        this.setState(state => ({
          flatIds: Object.assign({}, state.flatIds, { [id]: undefined })
        }), cb);
        return
      }

      const { pattern, required, validate } = field || {}

      if (id && (pattern || required || validate)) {
        this.setState(state => ({
          flatIds: Object.assign({}, state.flatIds, {
            [id]: {
              pattern,
              required,
              validate
            }
          })
        }), cb);
        return
      }

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

  renderField = (field, index, prefix) => {
    const { destroyValue } = this.props
    const {
      type,
      id,
      fields,
      sort,
      prefix: prefixFieldsId,
    } = field;

    const Control = this.getControlMemoized(type)

    if (!Control) {
      console.warn('Missing', type)
      return null
    }

    const getId = typeof id === 'string' && id

    const fieldId = getPath(prefix, prefixFieldsId, getId);
    const [reducer, ...selector] = fieldId.split('.');

    return (
      <WrapperField
        {...this.commonProps}
        key={`${fieldId}-${index}`}
        id={id}
        defaultDestroyValue={destroyValue}
        prefix={prefix}
        field={field}
        fieldId={fieldId}
        flatIds={this.state.flatIds}
        setFlatId={this.setFlatIdsMemoized(fieldId)}
        reducer={reducer}
        selector={selector.join('.')}
        Control={Control}
        fieldType={typeof type === 'string' ? type : 'Class'}
        onChange={this.onChange}
      >
        {fields && this.renderFields(fields, sort, fieldId)}
      </WrapperField>
    )
  };

  renderFields = (fields, sort, prefix) => sortWithOrder(fields, sort).map((field, index) => this.renderField(field, index, prefix));

  render() {
    const { sort, prefix } = this.props;
    const { fields } = this.state
    return this.renderFields(fields, sort, getPath(prefix));
  }
}))

export default createBoxInstance()