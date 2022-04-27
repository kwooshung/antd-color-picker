import { useMemo, useState } from 'react';
import { Colors } from '../../src/interfaces/Colors'
import tinycolor from 'tinycolor2';

export interface Actions {
    /**
     * 设置颜色，格式不限
     *
     * @param {string} val 颜色值
     */
    stateColorSet: (val: string | Colors | tinycolor.ColorInput) => void;

    /**
     * 设置：十六进制颜色
     * 
     * @param {string} hex 颜色值
     */
    stateColorHexSet: (hex: string) => void;

    /**
     * 设置：RGB颜色
     * 
     * @param {number} r 红
     * @param {number} g 绿
     * @param {number} b 蓝
     * @param {number} [a=1] alpha 透明度 百分比
     */
    stateColorRgbSet: (r: number, g: number, b: number, a?: number) => void;

    /**
     * 设置：HSL颜色
     * 
     * @param {number} h 色相
     * @param {number} s 饱和度
     * @param {number} l 亮度
     * @param {number} [a=1] alpha 透明度 百分比
     */
    stateColorHslSet: (h: number, s: number, l: number, a?: number) => void;

    /**
     * 设置：HSV颜色
     * 
     * @param {number} h 色相
     * @param {number} s 饱和度
     * @param {number} v 亮度
     * @param {number} [a=1] alpha 透明度 百分比
     */
    stateColorHsvSet: (h: number, s: number, b: number, a?: number) => void;
};

export default function useColors(defaultValue: string | tinycolor.ColorInput): [Colors, Actions] {
    const [stateGet, stateSet] = useState<Colors>((() => {
        if (typeof defaultValue === 'string') {
            if (defaultValue[0] === '#') {
                defaultValue = defaultValue.replace(/^#{1,}/, '');
                if (defaultValue.length === 3) {
                    defaultValue = `${defaultValue[0]}${defaultValue[0]}${defaultValue[1]}${defaultValue[1]}${defaultValue[2]}${defaultValue[2]}`;
                }
                else if (defaultValue.length === 4) {
                    defaultValue = `${defaultValue[0]}${defaultValue[0]}${defaultValue[1]}${defaultValue[1]}${defaultValue[2]}${defaultValue[2]}${defaultValue[3]}${defaultValue[3]}`;
                }

                defaultValue = defaultValue.length === 8 ? tinycolor(defaultValue).toHex8() : tinycolor(defaultValue).toHex()

                return {
                    hex: defaultValue.length === 8 ? tinycolor(defaultValue).toHex8() : tinycolor(defaultValue).toHex(),
                    rgb: tinycolor(defaultValue).toRgb(),
                    hsl: tinycolor(defaultValue).toHsl(),
                    hsv: tinycolor(defaultValue).toHsv()
                };
            }
        }
        const color: Colors = {
            hex: tinycolor(defaultValue).toHex(),
            rgb: tinycolor(defaultValue).toRgb(),
            hsl: tinycolor(defaultValue).toHsl(),
            hsv: tinycolor(defaultValue).toHsv()
        };

        if (color.rgb.a != 1) {
            color.hex = tinycolor(defaultValue).toHex8();
        }

        return color;
    })());

    const methods = {
        /**
         * 标准化十六进制颜色
         *
         * @param {string} hex 十六进制颜色
         * @return {string} 标准十六进制颜色
         */
        hexStandard(hex: string): string {
            hex = hex.replace(/^#{1,}/, '');
            if (hex.length === 3) {
                hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
            }
            else if (hex.length === 4) {
                hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
            }

            return `#${hex}`;
        },
        /**
         * 设置颜色，格式不限
         *
         * @param {string} val 颜色值
         */
        stateColorSet(val: string | Colors | tinycolor.ColorInput) {
            if (typeof val === 'object') {
                return val;
            }
            else if (typeof val === 'string') {
                if (val[0] === '#') {
                    val = methods.hexStandard(val);
                }
            }

            const color: Colors = {
                hex: tinycolor(val).toHex(),
                rgb: tinycolor(val).toRgb(),
                hsl: tinycolor(val).toHsl(),
                hsv: tinycolor(val).toHsv()
            };

            if (color.rgb.a != 1) {
                color.hex = tinycolor(defaultValue).toHex8();
            }

            stateSet(color);
        },
        /**
         * 设置：十六进制颜色
         * 
         * @param {string} hex 颜色值
         */
        stateColorHexSet(hex: string) {
            hex = methods.hexStandard(hex);

            stateSet({
                hex: hex.length === 8 ? tinycolor(hex).toHex8() : tinycolor(hex).toHex(),
                rgb: tinycolor(hex).toRgb(),
                hsl: tinycolor(hex).toHsl(),
                hsv: tinycolor(hex).toHsv()
            });
        },

        /**
         * 设置：RGB颜色
         * 
         * @param {number} r 红
         * @param {number} g 绿
         * @param {number} b 蓝
         * @param {number} [a=1] alpha 透明度 百分比
         */
        stateColorRgbSet(r: number, g: number, b: number, a: number = 1) {
            const _rgb: Colors['rgb'] = { r, g, b, a };

            stateSet({
                hex: a === 1 ? tinycolor(_rgb).toHex() : tinycolor(_rgb).toHex8(),
                rgb: tinycolor(_rgb).toRgb(),
                hsl: tinycolor(_rgb).toHsl(),
                hsv: tinycolor(_rgb).toHsv()
            });
        },
        /**
         * 设置：HSL颜色
         * 
         * @param {number} h 色相
         * @param {number} s 饱和度
         * @param {number} l 亮度
         * @param {number} [a=1] alpha 透明度 百分比
         */
        stateColorHslSet(h: number, s: number, l: number, a: number = 1) {
            const _hsl: Colors['hsl'] = { h, s, l, a };

            stateSet({
                hex: a === 1 ? tinycolor(_hsl).toHex() : tinycolor(_hsl).toHex8(),
                rgb: tinycolor(_hsl).toRgb(),
                hsl: tinycolor(_hsl).toHsl(),
                hsv: tinycolor(_hsl).toHsv()
            });
        },

        /**
         * 设置：HSV颜色
         * 
         * @param {number} h 色相
         * @param {number} s 饱和度
         * @param {number} v 亮度
         * @param {number} [a=1] alpha 透明度 百分比
         */
        stateColorHsvSet(h: number, s: number, v: number, a: number = 1) {
            const _hsv: Colors['hsv'] = { h, s, v, a };

            stateSet({
                hex: a === 1 ? tinycolor(_hsv).toHex() : tinycolor(_hsv).toHex8(),
                rgb: tinycolor(_hsv).toRgb(),
                hsl: tinycolor(_hsv).toHsl(),
                hsv: tinycolor(_hsv).toHsv()
            });
        }
    };

    const actions: Actions = useMemo(() => {
        return {
            stateColorSet: methods.stateColorSet,
            stateColorHexSet: methods.stateColorHexSet,
            stateColorRgbSet: methods.stateColorRgbSet,
            stateColorHslSet: methods.stateColorHslSet,
            stateColorHsvSet: methods.stateColorHsvSet
        };
    }, []);

    return [stateGet, actions];
}