// import styles from './index.less';
import type { ReactNode } from 'react';
import React, { FC, createRef, useEffect } from 'react';
import { } from 'antd';
import Board from '../../../src/components/board';

/**
 * 接口定义：Props属性
 */
export interface ExampleProps {
};

/**
 * 定义：Props属性默认值
 */
const defaultProps: ExampleProps = {
};

const Example: FC<ExampleProps> = ({
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
                <Board hex='f00' />
            </>;
        }
    };

    return renders.main();
};

Example.defaultProps = defaultProps;

export default Example;