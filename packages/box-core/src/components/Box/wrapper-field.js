/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import { selectorRulesDisabled } from '../../selectors'
import BoxField from './field';
import hocConnect from '../../hoc-connect';

class WrapperField extends PureComponent {
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


export default hocConnect(makeMapStateToProps)(WrapperField)