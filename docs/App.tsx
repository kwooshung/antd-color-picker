import React, { FC, createRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { } from 'antd';

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
     * refs定义
     */
    const refs = {
    };

    /**
     * 函数
     */
    const methods = {
    };

    /**
     * 事件
     */
    const events = {
    };

    /**
     * 组件：更新副作用
     */
    useEffect(() => {
    }, []);

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
            </>;
        }
    };

    return renders.main();
};

App.defaultProps = defaultProps;

export default App;