import { Component } from 'react'

declare module '@stackhouseos/box-core' {
    export type BoxProps = {
        rules?: {} | [];
        validate?: {};
        id?: string;
        prefix?: string;
        ruleModeDisable?: boolean;
        fields: BoxProps | BoxProps[];
        container: BoxProps | string;
    }

    export default class Box extends Component<BoxProps> {
        static extendControls ( controls: {}): Component
    }

    export const createBoxInstance: () => typeof Box;
}