module nnpoc {
    
    /** converts a value between min and max to value between 0 and 1 */
    export function lerpInv(value: number, min: number, max: number): number {
        return ((value || 0) - min) / (max - min);
    }

    /** converts a value between 0 and 1 to a value between min and max */
    export function lerp(value: number, min: number, max: number): number {
        return (value || 0) * (max - min) + min;
    }
}