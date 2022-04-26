import React, { FC, createRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import Example from './components/Example';

/**
 * 接口定义：Props属性
 */
export interface AppProps {
};

/**
 * 定义：Props属性默认值
 */
const defaultProps: AppProps = {
};

const App: FC<AppProps> = ({
    ...props
}) => {
    /**
     * 渲染
     */
    const renders = {
        /**
         * 主渲染
         *
         * @return {*}  {JSX.Element}
         */
        main(): JSX.Element {
            return <>
                <Example />
            </>;
        }
    };

    return renders.main();
};

App.defaultProps = defaultProps;

export default App;