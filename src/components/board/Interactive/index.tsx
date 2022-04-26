import styles from './index.module.less';
import type { ReactNode } from 'react';
import React, { FC, createRef, useEffect } from 'react';
import { Colors } from '../../../interfaces/Colors';

export interface InteractiveOnChangeProps {
    x: number;
    y: number;
    complete?: boolean;
};

/**
 * 接口定义：Props属性
 */
export interface BoardProps {
    color?: Colors,
    onChange?: (e: InteractiveOnChangeProps) => void,
    children?: ReactNode
};

/**
 * 定义：Props属性默认值
 */
const defaultProps: BoardProps = {
    color: undefined,
    onChange: undefined,
    children: null
};

const Board: FC<BoardProps> = ({
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
            return <div className={styles.board} style={{ background: `#${props.hex}`.replace('##', '') }}>
                <div>
                    <div></div>
                </div>
            </div>;
        }
    };

    return renders.main();
};

Board.defaultProps = defaultProps;

export default Board;