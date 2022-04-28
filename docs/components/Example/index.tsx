// import styles from './index.less';
import type { ReactNode } from 'react';
import React, { FC, createRef, useEffect } from 'react';
import { } from 'antd';
import Saturation from '../../../src/components/Saturation';

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
                <div style={{ margin: '150px auto 0', padding: '10px', width: '300px', height: '300px', border: '1px #eee solid', borderRadius: '5px', boxShadow: '0 0 3px rgba(0, 0, 0, .15)', background: '#fff' }}>
                    <Saturation val='f00' />
                </div>
            </>;
        }
    };

    return renders.main();
};

Example.defaultProps = defaultProps;

export default Example;