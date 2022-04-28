import styles from './index.module.less';
import { ReactNode, useMemo, useRef, useState } from 'react';
import React, { FC, createRef, useEffect } from 'react';
import { Colors } from '../../Interfaces/Colors';
import { Color } from '../../assets/scripts/utils/ColorPosition';
import useColors from '../../hooks/useColors';
import Palette from './Palette'
import { } from 'antd';

/**
 * 接口定义：Props属性
 */
export interface SaturationProps {
    /**
     * 颜色对象
     */
    color?: Colors,

    /**
     * 拖拽改变时
     * 
     * @param {Colors} color 颜色对象
     */
    onChange?: (color: Colors) => void,

    /**
     * 拖拽改变时
     *
     * @param {Colors} color 颜色对象
     */
    onChangeComplete?: (color: Colors) => void;
};

/**
 * 定义：Props属性默认值
 */
const defaultProps: SaturationProps = {

};

const Saturation: FC<SaturationProps> = ({
    ...props
}) => {
    /**
     * refs定义
     */
    const refs = {
        /**
         * 区域
         */
        saturation: useRef<HTMLDivElement>(null)
    };

    /**
     * 当前颜色
     */
    const [stateColorGet, { stateColorSet, stateColorHsvSet }] = useColors(props.color?.hex ?? '#f00');

    /**
     * 颜色改变完成
     */
    const [stateChangeCompleteGet, stateChangeCompleteSet] = useState<boolean>(false);

    /**
     * 坐标计算
     */
    const memoPosition = useMemo(() => {
        if (refs.saturation.current) {
            const { current: saturation } = refs.saturation;
            const [x, y] = Color(stateColorGet, saturation.offsetWidth, saturation.offsetHeight);
            return { x, y };
        }
        return { x: 0, y: 0 };
    }, [stateColorGet, refs.saturation.current?.offsetWidth, refs.saturation.current?.offsetHeight]);

    /**
     * 函数
     */
    const methods = {
        /**
         * 触发器
         */
        trigger() {
            props.onChange && props.onChange(stateColorGet);
            stateChangeCompleteGet && props.onChangeComplete && props.onChangeComplete(stateColorGet);
        }
    };

    /**
     * 事件
     */
    const events = {
        /**
         * 颜色改变
         */
        onChange(x: number, y: number, complete = false) {
            if (refs.saturation.current) {
                const { current: saturation } = refs.saturation;
                const hsv = { ...stateColorGet.hsv, s: Math.round((x / saturation.offsetWidth) * 100), v: Math.round(100 - (y / saturation.offsetHeight) * 100) };
                stateColorHsvSet(hsv.h, hsv.s, hsv.v);

                stateChangeCompleteSet(complete);
            }
        },
    };

    /**
     * 组件：更新副作用
     */
    useEffect(methods.trigger, [stateColorGet, stateChangeCompleteGet]);

    /**
     * 组件：更新副作用
     */
    useEffect(() => {
        props.color && stateColorSet(`#${props.color.hex}`);
    }, [props.color]);

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
            return <div ref={refs.saturation} className={styles.saturation}>
                <Palette val={'#f00'} cursorX={memoPosition.x} cursorY={memoPosition.y} cursorColor={stateColorGet} onChange={events.onChange} />
            </div>;
        }
    };

    return renders.main();
};

Saturation.defaultProps = defaultProps;

export default Saturation;