import { Component } from 'react'

declare module '@stackhouseos/box-core' {
    export type BoxProps = {
        rules?: {} | [];
        validate?: {};
        id?: string;
        container?: BoxProps | string;
        prefix?: string;
        ruleModeDisable?: boolean;
        fields: BoxProps | BoxProps[];
    }

    export default class Box extends Component<BoxProps> {
        static extendControls ( controls: {}): Component
    }

    export const createBoxInstance: () => typeof Box;
}