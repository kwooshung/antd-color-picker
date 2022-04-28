import { Colors } from '../../../../Interfaces/Colors';

/**
 * 根据颜色获得颜色坐标
 *
 * @param {Colors} c 色值
 * @param {number} w 宽度
 * @param {number} h 高度
 * @return {*}  {[number, number]} xy坐标数组
 */
const Color = (c: Colors, w: number, h: number): [number, number] => {
    const { s, v } = c.hsv;

    const x = s * w;
    const y = (100 - v * 100) / 100 * h;

    return [x, y];
};

export default Color;