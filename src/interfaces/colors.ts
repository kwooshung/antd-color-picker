export interface Colors {
    hex: string;
    rgb: ColorRGBA;
    hsl: ColorHSLA;
    hsb: ColorHSBA;
    hsv: ColorHSVA;
    cmyk: ColorCMYKA;
}

interface ColorRGBA {
    r: number;
    g: number;
    b: number;
    a?: number;
}

interface ColorHSLA {
    h: number;
    s: number;
    l: number;
    a?: number;
}
interface ColorHSBA {
    h: number;
    s: number;
    b: number;
    a?: number;
}

interface ColorHSVA {
    h: number;
    s: number;
    v: number;
    a?: number;
}
interface ColorCMYKA {
    c: number;
    m: number;
    y: number;
    k: number;
    a?: number;
}