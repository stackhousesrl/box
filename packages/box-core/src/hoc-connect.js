import React, { memo, useContext, useMemo } from "react"
import { connect } from "react-redux"
import { BoxContext } from "./context"

export default makeMapStateToProps => WrappedComponent => memo(wrapperProps => {
  const context = useContext(BoxContext)

  // use custom dispatch
  const ConnectedComponent = useMemo(() => context.dispatch
    ? WrappedComponent
    : connect(makeMapStateToProps, null, null, { forwardRef: true })(WrappedComponent),
    [context.dispatch]
  )

  if (context.dispatch) {
    const newProps = useMemo(() => makeMapStateToProps(context, wrapperProps), [context, wrapperProps])
    return <ConnectedComponent {...wrapperProps} {...newProps} dispatch={context.dispatch} />
  }

  return <ConnectedComponent {...wrapperProps} />
})
