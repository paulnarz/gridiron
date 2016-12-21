module nnpoc {
    export class MathH {
        static normalize(value: number, min: number, max: number) {
            return ((value || 0) + min) / (max - min);
        }

        static expand(value: number, min: number, max: number) {
            return (value || 0) * (max - min) + min;
        }
    }
}