/**
 * 色相
 *
 * @param {number} h Hue值
 * @param {number} size 尺寸（竖向：宽度，横向：高度）
 * @return {*} {number} 值
 */
const Hue = (h: number, size: number): number => h / 360 * size;

export default Hue;