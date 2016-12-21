module nnpoc {
    export class Points {
        static createPoints2d(min: number, max: number, resolution: number): { x: number, y: number }[] {
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