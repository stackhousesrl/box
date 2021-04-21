import React, { PureComponent } from 'react'

export default class EmptyContainer extends PureComponent {
    render() {
        return (
            <React.Fragment>{this.props.children}</React.Fragment>
        )
    }
}