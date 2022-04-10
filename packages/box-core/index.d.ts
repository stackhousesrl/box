import { Component } from 'react'
​
declare module '@stackhouseos/box-core' {
    export type BoxProps = {
        prefix: string;
        data: BoxField | BoxField[];
        destroyValue?: boolean
    }
    
    export type BoxField = Partial<BoxProps> & {
        type:string;
        rules?: {} | [];
        children?: BoxField[],
        validate?: {};
        id?: string;
        container?: BoxField | string;
        ruleModeDisable?: boolean;
    }
​
    export default class Box extends Component<BoxProps> {
        static extendComponents ( components: {}): Component
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