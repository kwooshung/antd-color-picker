const Clamp = (value: number, max: number, min: number): number => value > max ? max : value < min ? min : value;

export default Clamp;