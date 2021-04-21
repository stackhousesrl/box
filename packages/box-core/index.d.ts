import { Component } from 'react'

declare module '@stackhouseos/box-core' {
    type BoxProps = {
        prefix: string
        fields: Record<string, any>
    }

    export default class Box extends Component<BoxProps> {
        static extendControls ( controls: {}): Component
    }
}
