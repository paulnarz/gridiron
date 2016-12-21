module nnpoc {
    export interface Point2d {
        x: number;
        y: number;
    }

    export interface Point3d {
        x: number;
        y: number;
        z: number;
    }

    export interface Func2d {
        (x: number, y: number): number;
    }

    export class Points {
        static createPoints2d(min: number, max: number, resolution: number): Point2d[] {
            var points = [];
            var step = Math.pow(2, -resolution);

            for (var x = min; x <= max; x += step) {
                for (var y = min; y <= max; y += step) {
                    points.push({ x: x, y: y });
                }
            }

            return points;
        }
    }
}