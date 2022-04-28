import styles from './index.module.less';
import { ReactNode, useRef } from 'react';
import React, { FC, useEffect, MouseEvent } from 'react';
import { Colors } from '../../../../Interfaces/Colors';
import useColors from '../../../../hooks/useColors';
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
    const [stateColorGet, { stateColorSet }] = useColors('#000');

    /**
     * 事件
     */
    const events = {
        /**
         * 事件：鼠标按下
         *
         * @param {MouseEvent<HTMLDivElement>} e 事件对象
         */
        onMouseDown(e: MouseEvent<HTMLDivElement>) {
            const body = document.querySelector('body');
            body?.classList.add('mousedown-color');
        }
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
         * @return {*} {JSX.Element}
         */
        main(): JSX.Element {
            return <div
                className={styles.board}
                style={{ background: `rgba(${stateColorGet.rgb.r}, ${stateColorGet.rgb.g}, ${stateColorGet.rgb.b}, ${stateColorGet.rgb.a})` }}
                onMouseDown={events.onMouseDown}
            >
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