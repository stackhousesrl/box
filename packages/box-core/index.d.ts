import { Component } from 'react'
​
declare module '@stackhouseos/box-core' {

    type CustomRules<PropName extends string> = `${PropName}_rules`
    type CustomId<PropName extends string> = `${PropName}_id`
    type CustomChildren<PropName extends string> = `${PropName}_children`

    export type BoxProps = {
        prefix: string;
        data: BoxChild | BoxChild[];
        destroyValue?: boolean
    }
    
    export type BoxChild = Partial<BoxProps> & {
        type:string;
        rules?: {} | [];
        children?: BoxChild[],
        validate?: {};
        id?: string;
        container?: BoxChild | string;
        ruleModeDisable?: boolean;
    } & {
        [K in CustomRules<string>]: {} | [];
    } & {
        [K in CustomId<string>]: string;
    } & {
        [K in CustomChildren<string>]: BoxChild[];
    }
​
    export default class Box extends Component<BoxProps> {
        static registerComponents ( components: {}): Component
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