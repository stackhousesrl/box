import React, { createContext } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics';

const context = createContext({})

const { Provider: BoxContextProvider } = context
const { Consumer: BoxContextConsumer } = context

const withBoxContext = WrappedComponent => {
    const HoistedComponent = React.forwardRef((props, ref) => (
        <BoxContextConsumer>
            {boxContext => <WrappedComponent ref={ref} {...props} contextProps={boxContext} />}
        </BoxContextConsumer>
    ))
    return hoistNonReactStatics(HoistedComponent, WrappedComponent)
}

const BoxContext = context
export { withBoxContext, BoxContextProvider, BoxContextConsumer, BoxContext }