import { useMemo, useState } from 'react';
import { Colors } from '../../src/interfaces/Colors'
import colorConvert from 'color-convert';

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
     */
    setRgb: (r: number, g: number, b: number) => void;

    /**
     * 设置：RGB颜色
     * 
     * @param {number} r 红
     * @param {number} g 绿
     * @param {number} b 蓝
     * @param {number} a alpha 透明度 百分比
     */
    setRgba: (r: number, g: number, b: number, a: number) => void;

    /**
     * 设置：HSL颜色
     * 
     * @param {number} h 色相
     * @param {number} s 饱和度
     * @param {number} l 亮度
     */
    setHsl: (h: number, s: number, l: number) => void;

    /**
     * 设置：HSL颜色
     * 
     * @param {number} h 色相
     * @param {number} s 饱和度
     * @param {number} l 亮度
     * @param {number} a alpha 透明度 百分比
     */
    setHsla: (h: number, s: number, l: number, a: number) => void;

    /**
     * 设置：HSB颜色
     * 
     * @param {number} h 色相
     * @param {number} s 饱和度
     * @param {number} b 亮度
     */
    setHsb: (h: number, s: number, b: number) => void;

    /**
     * 设置：HSB颜色
     * 
     * @param {number} h 色相
     * @param {number} s 饱和度
     * @param {number} b 亮度
     * @param {number} a alpha 透明度 百分比
     */
    setHsba: (h: number, s: number, b: number, a: number) => void;

    /**
     * 设置：HSV颜色
     * 
     * @param {number} h 色相
     * @param {number} s 饱和度
     * @param {number} b 亮度
     * @param {number} v alpha 透明度 百分比
     */
    setHsv: (h: number, s: number, v: number) => void;

    /**
     * 设置：HSV颜色
     * 
     * @param {number} h 色相
     * @param {number} s 饱和度
     * @param {number} b 亮度
     * @param {number} v alpha 透明度 百分比
     */
    setHsva: (h: number, s: number, v: number, a: number) => void;

    /**
     * 设置：CMYK颜色
     * 
     * @param {number} c 青色、天蓝、湛蓝
     * @param {number} m 品红、洋红
     * @param {number} y 黄色
     * @param {number} k 黑色
     */
    setCmyk: (c: number, m: number, y: number, k: number) => void;

    /**
     * 设置：CMYK颜色
     * 
     * @param {number} c 青色、天蓝、湛蓝
     * @param {number} m 品红、洋红
     * @param {number} y 黄色
     * @param {number} k 黑色
     * @param {number} v alpha 透明度 百分比
     */
    setCmyka: (c: number, m: number, y: number, k: number, a: number) => void;
};

export default function useColors(defaultValue = false): [Colors, Actions] {
    const [stateGet, stateSet] = useState<Colors>();

    const methods = {
        /**
         * 设置：十六进制颜色
         * 
         * @param {string} hex 颜色值
         */
        setHex(hex: string) {
            const val: Colors['hex'] = hex;

            const _rgb = colorConvert.hex.rgb(hex);
            const rgb: Colors['rgb'] = {
                r: _rgb[0],
                g: _rgb[1],
                b: _rgb[2]
            };

            const rgba: Colors['rgb'] = {
                r: _rgb[0],
                g: _rgb[1],
                b: _rgb[2],
                a: 1
            };
        },

        /**
         * 设置：RGB颜色
         * 
         * @param {number} r 红
         * @param {number} g 绿
         * @param {number} b 蓝
         */
        setRgb(r: number, g: number, b: number) {

        },

        /**
         * 设置：RGB颜色
         * 
         * @param {number} r 红
         * @param {number} g 绿
         * @param {number} b 蓝
         * @param {number} a alpha 透明度 百分比
         */
        setRgba(r: number, g: number, b: number, a: number) {

        },

        /**
         * 设置：HSL颜色
         * 
         * @param {number} h 色相
         * @param {number} s 饱和度
         * @param {number} l 亮度
         */
        setHsl(h: number, s: number, l: number) {

        },

        /**
         * 设置：HSL颜色
         * 
         * @param {number} h 色相
         * @param {number} s 饱和度
         * @param {number} l 亮度
         * @param {number} a alpha 透明度 百分比
         */
        setHsla(h: number, s: number, l: number, a: number) {

        },

        /**
         * 设置：HSB颜色
         * 
         * @param {number} h 色相
         * @param {number} s 饱和度
         * @param {number} b 亮度
         */
        setHsb(h: number, s: number, b: number) {

        },

        /**
         * 设置：HSB颜色
         * 
         * @param {number} h 色相
         * @param {number} s 饱和度
         * @param {number} b 亮度
         * @param {number} a alpha 透明度 百分比
         */
        setHsba(h: number, s: number, b: number, a: number) {

        },

        /**
         * 设置：HSV颜色
         * 
         * @param {number} h 色相
         * @param {number} s 饱和度
         * @param {number} b 亮度
         * @param {number} v alpha 透明度 百分比
         */
        setHsv(h: number, s: number, v: number) {

        },

        /**
         * 设置：HSV颜色
         * 
         * @param {number} h 色相
         * @param {number} s 饱和度
         * @param {number} b 亮度
         * @param {number} v alpha 透明度 百分比
         */
        setHsva(h: number, s: number, v: number, a: number) {

        },

        /**
         * 设置：CMYK颜色
         * 
         * @param {number} c 青色、天蓝、湛蓝
         * @param {number} m 品红、洋红
         * @param {number} y 黄色
         * @param {number} k 黑色
         */
        setCmyk(c: number, m: number, y: number, k: number) {

        },

        /**
         * 设置：CMYK颜色
         * 
         * @param {number} c 青色、天蓝、湛蓝
         * @param {number} m 品红、洋红
         * @param {number} y 黄色
         * @param {number} k 黑色
         * @param {number} v alpha 透明度 百分比
         */
        setCmyka(c: number, m: number, y: number, k: number, a: number) {

        }
    };

    const actions: Actions = useMemo(() => {

        return {
            setHex: methods.setHex,
            setRgb: methods.setRgb,
            setRgba: methods.setRgba,
            setHsl: methods.setHsl,
            setHsla: methods.setHsla,
            setHsb: methods.setHsb,
            setHsba: methods.setHsba,
            setHsv: methods.setHsv,
            setHsva: methods.setHsva,
            setCmyk: methods.setCmyk,
            setCmyka: methods.setCmyka
        };
    }, []);

    return [stateGet, actions];
}