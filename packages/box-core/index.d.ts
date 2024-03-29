import { Component, ComponentType } from 'react'
​
declare module '@stackhouseos/box-core' {
    export type BoxProps = {
        prefix: string;
        fields: BoxField | BoxField[];
        destroyValue?: boolean
    }
    
    export type BoxField = Partial<BoxProps> & {
        type:string | ComponentType;
        rules?: {} | [];
        validate?: {};
        id?: string;
        container?: BoxField | string;
        ruleModeDisable?: boolean;
    }
​
    export default class Box extends Component<BoxProps> {
        static extendControls ( controls: {}): Component
    }
​
    export const createBoxInstance: () => typeof Box;
​
    type BoxContext = React.Context<Record<string, any>>
​
    export const BoxContext: BoxContext
    export const BoxContextProvider: BoxContext['Provider']
    export const BoxContextConsumer: BoxContext['Consumer']
}
