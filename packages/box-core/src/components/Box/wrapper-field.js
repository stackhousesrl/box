/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { selectorRulesDisabled } from '../../selectors'
import BoxField from './field';

class WrapperField extends PureComponent {

  /*    
  componentWillReceiveProps(nextProps) {
    for (const index in nextProps) {
      if (nextProps[index] !== this.props[index]) {
        console.log(index, this.props, this.props[index], '-->', nextProps[index]);
      }
    }
  } 
  */

  render() {
    const { field, disabled } = this.props;
    const { ruleModeDisable } = field;
    if (disabled && !ruleModeDisable) return null;

    return (
      <BoxField {...this.props} />
    )
  }
}

const makeMapStateToProps = (state, props) => {
  const { prefix, field, contextProps, flatIds, disableRules } = props;
  const { rules } = field;
  return {
    disabled: !disableRules && rules && selectorRulesDisabled(state, contextProps, rules, flatIds, prefix),
    flatIds: undefined
  };
};

export default connect(
  makeMapStateToProps,
  null, null,
  { forwardRef: true },
)(WrapperField);
