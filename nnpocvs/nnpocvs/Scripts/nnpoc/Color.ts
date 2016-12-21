module nnpoc {
    export class Color {
        static hsvToRgb(h: number, v: number, s: number): string {
            var c = v * s;
            var hp = h / 60;
            var x = c * (1 - Math.abs((hp % 2) - 1));
            var r1, g1, b1;
            if (hp < 0) {
                r1 = 0; g1 = 0; b1 = 0;
            } else if (hp < 1) {
                r1 = c; g1 = x; b1 = 0;
            } else if (hp < 2) {
                r1 = x; g1 = c; b1 = 0;
            } else if (hp < 3) {
                r1 = 0; g1 = c; b1 = x;
            } else if (hp < 4) {
                r1 = 0; g1 = x; b1 = c;
            } else if (hp < 5) {
                r1 = x; g1 = 0; b1 = c;
            } else if (hp < 6) {
                r1 = c; g1 = 0; b1 = x;
            }

            var m = v - c;
            var r = r1 + m;
            var g = g1 + m;
            var b = b1 + m;

            return 'rgb(' + Math.floor(r * 255) + ',' + Math.floor(g * 255) + ',' + Math.floor(b * 255) + ')';
        }

        static getValueColor(value: number): string {
            var h = 240 - (value || 0) * 240;
            return Color.hsvToRgb(h, 1, 1);
        }
    }
}