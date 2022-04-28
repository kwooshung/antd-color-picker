import { Colors } from '../../../../interfaces/Colors';

/**
 * 根据颜色获得颜色坐标
 *
 * @param {Colors} color 色值
 * @param {number} width 宽度
 * @param {number} height 高度
 * @return {*}  {[number, number]} xy坐标数组
 */
const Color = (color: Colors, width: number, height: number): [number, number] => {
    const { s, v } = color.hsv;

    const x = s / 100 * width;
    const y = (100 - v) / 100 * height;

    return [x, y];
};

export default Color;