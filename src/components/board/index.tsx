import styles from './index.module.less';
import type { ReactNode } from 'react';
import React, { FC, createRef, useEffect } from 'react';
import { Colors } from '../../interfaces/Colors';
import useColors from '../../hooks/useColor';
import tinycolor from 'tinycolor2';

/**
 * 接口定义：Props属性
 */
export interface BoardProps {
    /**
     * 颜色对象
     */
    val: string | Colors | tinycolor.ColorInput
};

/**
 * 定义：Props属性默认值
 */
const defaultProps: BoardProps = {
    val: '#000'
};

const Board: FC<BoardProps> = ({
    ...props
}) => {
    /**
     * refs定义
     */
    const refs = {
    };

    const [stateColorGet, { stateColorSet }] = useColors('#000');

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
        stateColorSet(props.val)
    }, [props.val]);

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
            return <div className={styles.board} style={{ background: `rgba(${stateColorGet.rgb.r}, ${stateColorGet.rgb.g}, ${stateColorGet.rgb.b}, ${stateColorGet.rgb.a})` }}>
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