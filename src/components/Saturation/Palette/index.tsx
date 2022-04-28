import styles from './index.module.less';
import { ReactNode, useRef, useState } from 'react';
import React, { FC, createRef, useEffect } from 'react';
import Board from './Board';
import { Clamp } from '../../../assets/scripts/utils'
import { Colors } from '../../../Interfaces/Colors';
import useColors from '../../../hooks/useColors';
import tinycolor from 'tinycolor2';

/**
 * 接口定义：Props属性
 */
export interface InteractiveProps {
    /**
     * 颜色对象
     */
    val?: string | Colors | tinycolor.ColorInput,

    /**
     * 光标：X坐标
     */
    cursorX?: number,

    /**
     * 光标：Y坐标
     */
    cursorY?: number,

    /**
     * 光标：颜色对象
     */
    cursorColor?: Colors,

    /**
     * 拖拽改变时
     *
     * @param {number} x 坐标 x
     * @param {number} y 坐标 y
     * @param {boolean} [complete] 拖拽完成
     */
    onChange?: (x: number, y: number, complete?: boolean) => void;
};

/**
 * 定义：Props属性默认值
 */
const defaultProps: InteractiveProps = {
    val: '#f00',
    cursorX: -10,
    cursorY: -10
};

const Interactive: FC<InteractiveProps> = ({
    ...props
}) => {
    /**
     * refs定义
     */
    const refs = {
        /**
         * 区域
         */
        area: useRef<HTMLDivElement>(null),
        /**
         * 光标
         */
        cursor: useRef<HTMLDivElement>(null)
    };

    const [stateColorGet, { stateColorSet }] = useColors('#000');
    const [statePositionGet, statePositionSet] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    /**
     * 函数
     */
    const methods = {
        /**
         * 鼠标移动处理函数
         *
         * @param {MouseEvent} e 事件对象
         * @param {boolean} [complete] 是否完成
         */
        move(e: MouseEvent, complete?: boolean): void {
            if (refs.area.current) {
                const { current: area } = refs.area;
                const { width, height, left, top } = area.getBoundingClientRect();

                const x = Clamp(e.clientX - left, width, 0);
                const y = Clamp(e.clientY - top, height, 0);

                if (props.onChange) {
                    props.onChange(x, y, false);
                    complete && props.onChange(x, y, true);
                }
            }
        },
        /**
         * 坐标计算
         */
        position() {
            if (props.cursorX && props.cursorY && refs.cursor.current) {
                const { current: cursor } = refs.cursor;
                statePositionSet({ x: props.cursorX - cursor.offsetWidth / 2, y: props.cursorY - cursor.offsetHeight / 2 });
            }
        }
    };

    /**
     * 事件
     */
    const events = {
        /**
         * 事件：鼠标移动
         *
         * @param {MouseEvent} e 事件对象
         */
        onMouseMove(e: MouseEvent): void { methods.move(e); },
        /**
         * 事件：鼠标释放
         *
         * @param {MouseEvent} e 事件对象
         */
        onMouseUp(e: MouseEvent): void {
            document.removeEventListener('mousemove', events.onMouseMove, false);
            document.removeEventListener('mouseup', events.onMouseUp, false);

            methods.move(e, true);
        },
        /**
         * 事件：鼠标按下
         *
         * @param {MouseEvent<HTMLDivElement>} e 事件对象
         */
        onMouseDown(e: React.MouseEvent<HTMLDivElement>): void {
            if (e.button !== 0) { return };

            document.addEventListener('mousemove', events.onMouseMove, false);
            document.addEventListener('mouseup', events.onMouseUp, false);
        }
    };

    /**
     * 组件：更新副作用
     */
    useEffect(() => {
        if (props.val) {
            stateColorSet(props.val);
        }
    }, [props.val]);

    /**
     * 组件：坐标更新副作用
     */
    useEffect(methods.position, [props.cursorX, props.cursorY]);

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
                ref={refs.area}
                className={styles.interactive}
                onMouseDown={events.onMouseDown}
            >
                <Board val={`#${stateColorGet.hex}`} />
                <div ref={refs.cursor} style={{ transform: `translate(${statePositionGet.x}px, ${statePositionGet.y}px)`, backgroundColor: props.cursorColor ? `#${props.cursorColor.hex}` : `#${stateColorGet.hex}` }} className={styles['cursor-color']} />
            </div>;
        }
    };

    return renders.main();
};

Interactive.defaultProps = defaultProps;

export default Interactive;