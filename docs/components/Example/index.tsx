// import styles from './index.less';
import React, { FC, useEffect } from 'react';
import KsColorPicker from '../../../src/components'

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
                <KsColorPicker.Chrome />
            </>;
        }
    };

    return renders.main();
};

Example.defaultProps = defaultProps;

export default Example;