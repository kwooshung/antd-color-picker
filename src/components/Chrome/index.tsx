import styles from './index.module.less';
import React, { FC, ReactNode, MouseEvent, useEffect, useRef, useState, ChangeEvent } from 'react';
import Saturation from '@uiw/react-color-saturation';
import Hue from '@uiw/react-color-hue';
import Alpha from '@uiw/react-color-alpha';
import { HsvaColor, hsvaToRgbaString, color as ConvertColor, validHex, hexToHsva, rgbaToHsva, hslaToHsva } from '@uiw/color-convert';
import { Input, InputNumber, Typography } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Colors } from 'src/Interfaces/Colors';

/**
 * 接口定义：Props属性
 */
export interface ChromeProps {
    /**
     * className
     */
    className?: string,
    /**
     * 无色
     */
    colourless?: boolean,
    /**
     * 宽度：写数字，则默认px，其他单位写字符串
     */
    width?: number | string,
    /**
     * 颜色：HEXA
     */
    color?: Colors | string,
    /**
     * 颜色默认展现类型
     */
    colorType?: 'hexa' | 'rgba' | 'hsla' | 'hsva',
    /**
     * 是否简化十六进制颜色
     */
    hexType?: 'short' | 'full',
    /**
     * Hex是否大写
     */
    hexUppercase?: boolean,
    /**
     * 是否强制显示hex的通明度值
     */
    hexAlphaForce?: boolean,
    /**
     * HUE 和 Alpha 滑条指针元素
     */
    pointer?: ReactNode | JSX.Element,
    /**
     * 复制功能：是否启用
     */
    copy?: boolean,
    /**
     * 复制功能：颜色复制成功的提示 [复制前，复制后]
     */
    copytip?: [string, string],
    /**
     * 事件：复制后
     */
    onCopy?: (color: Colors) => void,
    /**
     * 事件：颜色改变
     */
    onChange?: (color: Colors) => void,
    /**
     * 子元素
     */
    children?: ReactNode;
};

/**
 * 定义：Props属性默认值
 */
const defaultProps: ChromeProps = {
    colourless: false,
    width: 225,
    color: '#194d33',
    colorType: 'hexa',
    hexType: 'short',
    hexUppercase: false,
    hexAlphaForce: false,
    copytip: ['复制当前色值', '已成功复制'],
    copy: true
};

const Chrome: FC<ChromeProps> = ({
    children,
    ...props
}) => {
    /**
     * Refs
     */
    const refs = {
        styles: useRef<Array<string>>([styles.hexa, styles.rgba, styles.hsla, styles.hsva])
    };

    /**
     * 函数
     */
    const methods = {
        /**
         * 颜色类型
         */
        colorType(): number {
            switch (props.colorType) {
                case 'hexa': return 0;
                case 'rgba': return 1;
                case 'hsla': return 2;
                case 'hsva': return 3;
            }
            return 0;
        },
        /**
         * hex/hexa/hsv/hsva 转换 hsva 色值
         *
         * @param {(string | HsvaColor | undefined)} color 色值
         * @return {*}  {HsvaColor} hsva 色值
         */
        hexa2Hsva(color: string | HsvaColor | undefined): HsvaColor {
            return (typeof color === 'string' && validHex(color) ? hexToHsva(color) : color || { h: 0, s: 0, l: 0, a: 0 }) as HsvaColor;
        },
        /**
         * 十六进制颜色：简化
         *
         * @param {string} hexa 十六进制色值
         * @return {*} {string} 简化后的值（不含#号）
         */
        toShortHex(hexa: string): string {
            hexa = hexa.replace('#', '');

            if (hexa.length === 6 || hexa.length === 8) {
                if (hexa[0] === hexa[1] && hexa[2] === hexa[3] && hexa[4] === hexa[5]) {
                    if (hexa.length === 8) {
                        return `${hexa[0]}${hexa[2]}${hexa[4]}${hexa[6]}`;
                    }
                    return `${hexa[0]}${hexa[2]}${hexa[4]}`;
                }
            }

            return hexa;
        },
        /**
         * 数字输入框改变时
         * 
         * @param {('r' | 'g' | 'b' | 'h' | 's' | 'l' | 'v' | 'a')} type 类型
         * @param {number} val 值
         */
        rgbHslAlpha2Hslva(type: 'r' | 'g' | 'b' | 'h' | 's' | 'l' | 'v' | 'a', val: number) {
            if (stateControlsIndexGet === 1) {
                if (type === 'r' || type === 'g' || type === 'b' || type === 'a') {
                    const rgba: Colors['rgba'] = { ...stateColorGet.rgba };
                    rgba[type] = val;
                    return methods.hsva2Color(rgbaToHsva(rgba));
                }
            }
            else if (stateControlsIndexGet === 2) {
                if (type === 'h' || type === 's' || type === 'l' || type === 'a') {
                    const hsla: Colors['hsla'] = { ...stateColorGet.hsla };
                    hsla[type] = val;
                    return methods.hsva2Color(hslaToHsva(hsla));
                }
            }
            else if (stateControlsIndexGet === 3) {
                if (type === 'h' || type === 's' || type === 'v' || type === 'a') {
                    const hsva: Colors['hsva'] = { ...stateColorGet.hsva };
                    hsva[type] = val;
                    return methods.hsva2Color(hsva);
                }
            }
        },
        /**
         * 转换颜色对象
         *
         * @param {HsvaColor} hsva hsva
         * @return {*} {Colors} 颜色对象
         */
        hsva2Color(hsva: HsvaColor): Colors {
            const color = ConvertColor(methods.hexa2Hsva(hsva));

            const values: Colors = {
                hex: {
                    short: `#${methods.toShortHex(color.hex)}`,
                    full: color.hex
                },
                hexa: {
                    short: `#${methods.toShortHex(color.hexa)}`,
                    full: color.hexa
                },
                rgb: {
                    r: Math.round(color.rgb.r),
                    g: Math.round(color.rgb.g),
                    b: Math.round(color.rgb.b)
                },
                rgba: {
                    r: Math.round(color.rgba.r),
                    g: Math.round(color.rgba.g),
                    b: Math.round(color.rgba.b),
                    a: Number(color.rgba.a.toFixed(2))
                },
                hsl: {
                    h: Math.round(color.hsl.h),
                    l: Math.round(color.hsl.s),
                    s: Math.round(color.hsl.l)
                },
                hsla: {
                    h: Math.round(color.hsla.h),
                    l: Math.round(color.hsla.s),
                    s: Math.round(color.hsla.l),
                    a: Number(color.hsla.a.toFixed(2))
                },
                hsv: {
                    h: Math.round(color.hsv.h),
                    s: Math.round(color.hsv.s),
                    v: Math.round(color.hsv.v)
                },
                hsva: {
                    h: Math.round(color.hsva.h),
                    s: Math.round(color.hsva.s),
                    v: Math.round(color.hsva.v),
                    a: Number(color.hsva.a.toFixed(2))
                }
            };

            return values;
        }
    };

    /**
     * 状态：色板颜色
     */
    const [stateColorGet, stateColorSet] = useState<Colors>(typeof props.color === 'string' ? methods.hsva2Color(methods.hexa2Hsva(props.color)) : props.color);
    /**
     * 状态：颜色类型索引
     */
    const [stateControlsIndexGet, stateControlsIndexSet] = useState<number>(methods.colorType());
    /**
     * 状态：临时的十六进制颜色，避免出错无法输入
     */
    const [stateControlsHexTempGet, stateControlsHexTempSet] = useState<string>('');

    /**
     * 事件
     */
    const events = {
        /**
         * 颜色值切换按钮，向上切换
         */
        onControlsButtonSwitchUp() {
            let inx = stateControlsIndexGet;
            if (--inx < 0) {
                inx = 3;
            }
            stateControlsIndexSet(inx);
        },
        /**
         * 颜色值切换按钮，向上切换
         */
        onControlsButtonSwitchDown() {
            let inx = stateControlsIndexGet;
            if (++inx >= 4) {
                inx = 0;
            }
            stateControlsIndexSet(inx);
        },
        /**
         * 颜色复制
         *
         * @param {MouseEvent<HTMLDivElement>} [e] 事件对象
         */
        onCopy(e?: MouseEvent<HTMLDivElement>) {
            props.onCopy && props.onCopy(stateColorGet);
        },
        /**
         * 颜色改变时
         * 
         * @param hsva hsva颜色值
         */
        onChange(hsva: HsvaColor) {
            const values = methods.hsva2Color(hsva);
            stateColorSet(values);
            props.onChange && props.onChange(values);
        },
        /**
         * 输入框事件
         */
        inputs: {
            /**
             * HEX/HEXA 输入框改变时
             *
             * @param {ChangeEvent<HTMLInputElement>} [e] 事件对象
             */
            onHexChange(e?: ChangeEvent<HTMLInputElement>) {
                if (e) {
                    try {
                        if (e.target.value.length === 5 || e.target.value.length === 7) {
                            stateControlsHexTempSet(e.target.value);
                        }
                        else {
                            stateControlsHexTempSet('');
                            stateColorSet(methods.hsva2Color(methods.hexa2Hsva(`#${e.target.value}`)));
                        }
                    }
                    catch {
                        stateControlsHexTempSet(e.target.value);
                    }
                }
            },
            /**
             * 数字输入框改变时
             * 
             * @param {('r' | 'g' | 'b' | 'h' | 's' | 'l' | 'v' | 'a')} type 类型
             * @param {number} val 值
             */
            onNumberChange(type: 'r' | 'g' | 'b' | 'h' | 's' | 'l' | 'v' | 'a', val: number) {
                const v = methods.rgbHslAlpha2Hslva(type, type === 'a' ? (val === 0 ? 0 : (val / 100)) : val);
                v && stateColorSet(v);
            }
        }
    };

    /**
     * 更新副作用：颜色更新
     */
    useEffect(() => {
        props.color && stateColorSet(typeof props.color === 'string' ? methods.hsva2Color(methods.hexa2Hsva(props.color)) : props.color);
    }, [props.color]);

    /**
     * 更新副作用：颜色类型
     */
    useEffect(() => {
        stateControlsIndexSet(methods.colorType());
    }, [props.colorType]);

    /**
     * 渲染
     */
    const renders = {
        /**
         * Saturation
         *
         * @return {*} {ReactNode} ReactNode节点
         */
        saturation(): ReactNode {
            return <div className={styles.saturation}>
                <Saturation
                    className='ks-antd-color-picker-saturation'
                    hsva={stateColorGet.hsva}
                    prefixCls={styles['saturation']}
                    onChange={events.onChange}
                />
            </div>;
        },
        /**
         * 躯干
         */
        body: {
            /**
             * 滑条
             */
            bars: {
                /**
                 * 颜色预览
                 *
                 * @return {*} {ReactNode} ReactNode节点
                 */
                preview(): ReactNode {
                    return <Alpha
                        prefixCls='ks-antd-color-picker-alpha'
                        className={styles['alpha-preview']}
                        width={24}
                        height={24}
                        hsva={stateColorGet.hsva}
                        radius='100%'
                        bgProps={{ style: { background: 'transparent' } }}
                        innerProps={{ style: { background: hsvaToRgbaString(stateColorGet.hsva) } }}
                        pointer={() => <></>}
                    />
                },
                /**
                 * 颜色滑条
                 */
                slider: {
                    /**
                     * 颜色滑条：Hue
                     *
                     * @return {*} {ReactNode} ReactNode节点
                     */
                    hue(): ReactNode {
                        return <Hue
                            prefixCls='ks-antd-color-picker-hue'
                            height={10}
                            hue={stateColorGet.hsva.h}
                            pointer={props.pointer ? () => props.pointer : undefined}
                            onChange={(newHue) => { events.onChange({ ...stateColorGet.hsva, ...newHue }); }}
                        />;
                    },
                    /**
                     * 颜色滑条：Alpha
                     *
                     * @return {*} {ReactNode} ReactNode节点
                     */
                    alpha(): ReactNode {
                        return <Alpha
                            prefixCls='ks-antd-color-picker-alpha'
                            height={10}
                            hsva={stateColorGet.hsva}
                            pointer={props.pointer ? () => props.pointer : undefined}
                            onChange={(newAlpha) => { events.onChange({ ...stateColorGet.hsva, ...newAlpha }); }}
                        />;
                    },
                    /**
                     * 主渲染
                     *
                     * @return {*} {ReactNode} ReactNode节点
                     */
                    main(): ReactNode {
                        return <div className={styles.bars}>
                            {this.hue()}
                            {this.alpha()}
                        </div>;
                    }
                },
                /**
                 * 主渲染
                 *
                 * @return {*} {ReactNode} ReactNode节点
                 */
                main(): ReactNode {
                    return <div className={`ks-antd-color-picker-bars ${styles['bar-area']}`}>
                        {this.preview()}
                        {this.slider.main()}
                    </div>;
                }
            },
            /**
             * 颜色滑条
             */
            controls: {
                /**
                 * 小元素
                 */
                elements: {
                    /**
                     * 输入框
                     */
                    inputs: {
                        /**
                         * 十六进制
                         *
                         * @param {(Colors['hex'] | Colors['hexa'])} value hex对象
                         * @return {*} {ReactNode} ReactNode节点
                         */
                        hex(value: Colors['hex'] | Colors['hexa']): ReactNode {
                            return <Input addonBefore="#" size='small' value={stateControlsHexTempGet ? stateControlsHexTempGet : value[props.hexType].replace('#', '')} maxLength={8} onChange={events.inputs.onHexChange} />;
                        },
                        /**
                         * 数值
                         *
                         * @param {('r' | 'g' | 'b' | 'h' | 's' | 'l' | 'v' | 'a')} before 前置标签内容
                         * @param {number} value 值
                         * @param {('°|%')} after 后置标签内容
                         * @param {number} [max=255] 最大值
                         * @param {number} [min=0] 最小值
                         * @return {*} {ReactNode} ReactNode节点
                         */
                        number(before: 'r' | 'g' | 'b' | 'h' | 's' | 'l' | 'v' | 'a', value: number, after?: '°' | '%', max: number = 255, min: number = 0): ReactNode {
                            return <InputNumber addonBefore={before.toUpperCase()} addonAfter={after} size='small' min={min} max={max} value={value} onChange={(val: number) => { events.inputs.onNumberChange(before, val) }} />;
                        }
                    },
                    /**
                     * 名称
                     *
                     * @param {string} copytext 拷贝值
                     * @param {string} name 名称
                     * @return {*} {ReactNode} ReactNode节点
                     */
                    name(copytext: string, name: string): ReactNode {
                        if (props.copy) {
                            const copyable = {
                                text: copytext,
                                tooltips: props.copytip,
                                onCopy: events.onCopy
                            };
                            return <Typography.Paragraph copyable={copyable}>{name}</Typography.Paragraph>;
                        }
                        return <Typography.Paragraph >{name}</Typography.Paragraph>;
                    }
                },
                /**
                 * HEX/HEXA
                 *
                 * @return {*} {ReactNode} ReactNode节点
                 */
                hexa(): ReactNode {
                    return <li>
                        <div className={`ks-antd-color-picker-input ${styles['inputs']}`}>
                            {this.elements.inputs.hex((stateColorGet.rgba.a < 1 || props.hexAlphaForce) ? stateColorGet.hexa : stateColorGet.hex)}
                        </div>
                        {this.elements.name((stateColorGet.rgba.a < 1 || props.hexAlphaForce) ? stateColorGet.hexa[props.hexType] : stateColorGet.hex[props.hexType], 'HEX/HEXA')}
                    </li>;
                },
                /**
                 * RGB/RGBA
                 *
                 * @return {*} {ReactNode} ReactNode节点
                 */
                rgba(): ReactNode {
                    return <li>
                        <div className={`ks-antd-color-picker-inputs ${styles['inputs']}`}>
                            {this.elements.inputs.number('r', Math.round(stateColorGet.rgba.r))}
                            {this.elements.inputs.number('g', Math.round(stateColorGet.rgba.g))}
                            {this.elements.inputs.number('b', Math.round(stateColorGet.rgba.b))}
                            {this.elements.inputs.number('a', parseInt(`${stateColorGet.rgba.a * 100}`), '%', 100)}
                        </div>
                        {this.elements.name(`rgb(${stateColorGet.rgba.r} ${stateColorGet.rgba.g} ${stateColorGet.rgba.b}${stateColorGet.rgba.a < 1 ? (` / ${parseInt(`${stateColorGet.rgba.a * 100}`)}%`) : ''})`, 'RGB/RGBA')}
                    </li>;
                },
                /**
                 * HSL/HSLA
                 *
                 * @return {*} {ReactNode} ReactNode节点
                 */
                hsla(): ReactNode {
                    return <li>
                        <div className={`ks-antd-color-picker-inputs  ${styles['inputs']}`}>
                            {this.elements.inputs.number('h', Math.round(stateColorGet.hsla.h), '°', 360)}
                            {this.elements.inputs.number('s', Math.round(stateColorGet.hsla.s), '%', 100)}
                            {this.elements.inputs.number('l', Math.round(stateColorGet.hsla.l), '%', 100)}
                            {this.elements.inputs.number('a', parseInt(`${stateColorGet.hsla.a * 100}`), '%', 100)}
                        </div>
                        {this.elements.name(`hsl(${stateColorGet.hsla.h}deg ${stateColorGet.hsla.s}% ${stateColorGet.hsla.l}%${stateColorGet.hsla.a < 1 ? (` / ${parseInt(`${stateColorGet.hsla.a * 100}`)}%`) : ''})`, 'HSL/HSLA')}
                    </li>;
                },
                /**
                 * HSV/HSVA
                 *
                 * @return {*} {ReactNode} ReactNode节点
                 */
                hsva(): ReactNode {
                    return <li>
                        <div className={`ks-antd-color-picker-inputs ${styles['inputs']}`}>
                            {this.elements.inputs.number('h', Math.round(stateColorGet.hsva.h), '°', 360)}
                            {this.elements.inputs.number('s', Math.round(stateColorGet.hsva.s), '%', 100)}
                            {this.elements.inputs.number('v', Math.round(stateColorGet.hsva.v), '%', 100)}
                            {this.elements.inputs.number('a', parseInt(`${stateColorGet.hsva.a * 100}`), '%', 100)}
                        </div>
                        {this.elements.name(`hsva(${stateColorGet.hsva.h}deg ${stateColorGet.hsva.s}% ${stateColorGet.hsva.v}%${stateColorGet.hsva.a < 1 ? (` / ${parseInt(`${stateColorGet.hsva.a * 100}`)}%`) : ''})`, 'HSV/HSVA')}
                    </li>;
                },
                /**
                 * 切换按钮
                 *
                 * @return {*} {ReactNode} ReactNode节点
                 */
                switchBtn(): ReactNode {
                    return <ul className={`ks-antd-color-picker-buttons ${styles.buttons}`}>
                        <li onClick={events.onControlsButtonSwitchUp}><CaretUpOutlined /></li>
                        <li onClick={events.onControlsButtonSwitchDown}><CaretDownOutlined /></li>
                    </ul>;
                },
                /**
                 * 主渲染
                 *
                 * @return {*} {ReactNode} ReactNode节点
                 */
                main(): ReactNode {
                    return <div className={`ks-antd-color-picker-controls ${styles['controls']} ${refs.styles.current[stateControlsIndexGet]}${props.hexUppercase ? ` ${styles['upper-case']}` : ''}`}>
                        <ul className={`ks-antd-color-picker-input-editable ${styles['input-editable']}`}>
                            {this.hexa()}
                            {this.rgba()}
                            {this.hsla()}
                            {this.hsva()}
                        </ul>
                        {this.switchBtn()}
                    </div>;
                }
            },
            /**
             * 主渲染
             *
             * @return {*} {ReactNode} ReactNode节点
             */
            main(): ReactNode {
                return <div className={`ks-antd-color-picker-body ${styles.body}${props.colourless ? ` ${styles.colourless}` : ''}`}>
                    {this.bars.main()}
                    {this.controls.main()}
                    {children}
                </div>;
            }
        },
        /**
         * 主渲染
         *
         * @return {*} {JSX.Element} JSX元素
         */
        main(): JSX.Element {
            return <div className={`ks-antd-color-picker-area ${styles['chrome-picker']}${(props.className ? ` ${props.className}` : '')}`} style={{ width: typeof props.width === 'number' ? `${props.width}px` : props.width }}>
                {this.saturation()}
                {this.body.main()}
            </div>;
        }
    };

    return renders.main();
};

Chrome.defaultProps = defaultProps;

export default Chrome;