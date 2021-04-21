import React, { PureComponent } from 'react'

export default class EmptyContainer extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const { className } = this.props
        return (
            <div className={className}>{this.props.children}</div>
        )
    }

}