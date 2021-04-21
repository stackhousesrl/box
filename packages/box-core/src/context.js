import React, { createContext } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics';

const context = createContext({})

const { Provider: BoxContextProvider } = context
const { Consumer: BoxContextConsumer } = context

const withBoxContext = WrappedComponent => hoistNonReactStatics(props => (
    <BoxContextConsumer>
        {boxContext => <WrappedComponent {...props} contextProps={boxContext} />}
    </BoxContextConsumer>
), WrappedComponent)

const BoxContext = context
export { withBoxContext, BoxContextProvider, BoxContextConsumer, BoxContext }