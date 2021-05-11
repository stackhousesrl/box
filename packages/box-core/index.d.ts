import { Component } from 'react'

declare module '@stackhouseos/box-core' {
    export type BoxProps = {
        prefix: string;
        fields: BoxField | BoxField[];
    }
    
    export type BoxField = Partial<BoxProps> & {
        type:string;
        rules?: {} | [];
        validate?: {};
        id?: string;
        container?: BoxField | string;
        ruleModeDisable?: boolean;
    }

    export default class Box extends Component<BoxProps> {
        static extendControls ( controls: {}): Component
    }

    export const createBoxInstance: () => typeof Box;
}