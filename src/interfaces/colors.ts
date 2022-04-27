export interface Colors {
    hex: string;
    rgb: ColorRGBA;
    hsl: ColorHSLA;
    hsv: ColorHSVA;
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

interface ColorHSVA {
    h: number;
    s: number;
    v: number;
    a?: number;
}