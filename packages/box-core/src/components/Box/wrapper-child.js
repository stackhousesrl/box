/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { selectorRulesDisabled } from '../../selectors'
import BoxChild from './child';

class WrapperChild extends PureComponent {
  render() {
    const { child, disabled } = this.props;
    const { ruleModeDisable } = child;
    if (disabled && !ruleModeDisable) return null;

    return (
      <BoxChild {...this.props} />
    )
  }
}

const makeMapStateToProps = (state, props) => {
  const { prefix, child, contextProps, flatIds, disableRules, childId } = props;
  const { rules } = child;
  return {
    disabled: !disableRules && rules && selectorRulesDisabled(state, contextProps, rules, flatIds, prefix, false, childId),
    flatIds: undefined
  };
};

export default connect(
  makeMapStateToProps,
  null, null,
  { forwardRef: true },
)(WrapperChild);
