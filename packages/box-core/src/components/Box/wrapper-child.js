/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { selectorRulesDisabled } from '../../selectors'
import BoxChild from './child';

class WrapperChild extends PureComponent {

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
    const { child, disabled } = this.props;
    const { ruleModeDisable } = child;
    if (disabled && !ruleModeDisable) return null;

    return (
      <BoxChild {...this.props} />
    )
  }
}

const makeMapStateToProps = (state, props) => {
  const { prefix, child, contextProps, flatIds, disableRules, childrenId } = props;
  const { rules } = child;
  return {
    disabled: !disableRules && rules && selectorRulesDisabled(state, contextProps, rules, flatIds, prefix, false, childrenId),
    flatIds: undefined
  };
};

export default connect(
  makeMapStateToProps,
  null, null,
  { forwardRef: true },
)(WrapperChild);
