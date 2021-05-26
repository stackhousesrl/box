import React, { useContext, useMemo } from "react"
import { connect } from "react-redux"
import { BoxContext } from "./context"

export default makeMapStateToProps => BoxField => props => {
  const context = useContext(BoxContext)

  const ConnectedComponent = useMemo(() => context.state
    ? BoxField
    : connect(
      makeMapStateToProps,
      null, null,
      { forwardRef: true },
    )(BoxField),
    [])

  if (context.state) {
    const newProps = useMemo(() => makeMapStateToProps(context.state, props), [context.state, props])
    return <ConnectedComponent {...props} {...newProps} dispatch={context.dispatch} />
  }

  return <ConnectedComponent {...props} />
}
