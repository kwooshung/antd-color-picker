import styles from './index.module.less';
import { ReactNode, useRef } from 'react';
import React, { FC, createRef, useEffect } from 'react';
import Board from './Board';
import { Clamp } from '../../../assets/scripts/utils'
import { Colors } from '../../../interfaces/Colors';
import useColors from '../../../hooks/useColor';
import tinycolor from 'tinycolor2';

/**
 * 接口定义：Props属性
 */
export interface InteractiveProps {
    /**
     * 颜色对象
     */
    val: string | Colors | tinycolor.ColorInput,
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
    val: '#000',

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
        area: useRef<HTMLDivElement>(null)
    };

    const [stateColorGet, { stateColorSet }] = useColors('#000');

    /**
     * 函数
     */
    const methods = {
        init() {

        },
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
                    props.onChange(x, y);
                    complete && props.onChange(x, y, true);
                }
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
                ref={refs.area}
                className={styles.interactive}
                onMouseDown={events.onMouseDown}
            >
                <Board val={props.val} />
                <div className={styles['cursor-color']} />
            </div>;
        }
    };

    return renders.main();
};


export default Interactive;