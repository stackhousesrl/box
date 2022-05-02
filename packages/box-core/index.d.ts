import { Component } from 'react'
​
declare module '@stackhouseos/box-core' {

    type CustomRules<PropName extends string = string> = `${PropName}_rules`
    type CustomId<PropName extends string = string> = `${PropName}_id`
    type CustomChildren<PropName extends string = string> = `${PropName}_children`

    export type BoxProps = {
        prefix: string;
        data: BoxChild | BoxChild[];
        destroyValue?: boolean
    }

    type Rule = Record<string, any>
    
    export type BoxChild =  {
        type:string;
        prefix?: string;
        rules?: Rule | Rule[];
        children?: BoxChild[],
        validate?: Rule;
        id?: string;
        container?: BoxChild | string;
        ruleModeDisable?: boolean;
        destroyValue?: boolean;
    } & {
        [K in CustomRules]: BoxChild['rules'];
    } & {
        [K in CustomId]: string;
    } & {
        [K in CustomChildren]: BoxChild[];
    } & {
        [K:string]: any;
    }

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