import { useMemo, useState } from 'react';
import { Colors } from '../../src/interfaces/Colors'
import tinycolor from 'tinycolor2';

export interface Actions {
    /**
     * 设置：十六进制颜色
     * 
     * @param {string} hex 颜色值
     */
    setHex: (hex: string) => void;

    /**
     * 设置：RGB颜色
     * 
     * @param {number} r 红
     * @param {number} g 绿
     * @param {number} b 蓝
     * @param {number} [a=1] alpha 透明度 百分比
     */
    setRgb: (r: number, g: number, b: number, a?: number) => void;

    /**
     * 设置：HSL颜色
     * 
     * @param {number} h 色相
     * @param {number} s 饱和度
     * @param {number} l 亮度
     * @param {number} [a=1] alpha 透明度 百分比
     */
    setHsl: (h: number, s: number, l: number, a?: number) => void;

    /**
     * 设置：HSV颜色
     * 
     * @param {number} h 色相
     * @param {number} s 饱和度
     * @param {number} v 亮度
     * @param {number} [a=1] alpha 透明度 百分比
     */
    setHsv: (h: number, s: number, b: number, a?: number) => void;
};

export default function useColors(defaultValue = false): [Colors, Actions] {
    const [stateGet, stateSet] = useState<Colors>((() => {
        const hex = '#000000';

        return {
            hex,
            rgb: tinycolor(hex).toRgb(),
            hsl: tinycolor(hex).toHsl(),
            hsv: tinycolor(hex).toHsv()
        };
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
         * 设置：十六进制颜色
         * 
         * @param {string} hex 颜色值
         */
        setHex(hex: string) {
            hex = this.hexStandard(hex);

            stateSet({
                hex,
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
        setRgb(r: number, g: number, b: number, a: number = 1) {
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
        setHsl(h: number, s: number, l: number, a: number = 1) {
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
        setHsv(h: number, s: number, v: number, a: number = 1) {
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
            setHex: methods.setHex,
            setRgb: methods.setRgb,
            setHsl: methods.setHsl,
            setHsv: methods.setHsv
        };
    }, []);

    return [stateGet, actions];
}