module nnlunar {
    export class Vector2 {
        static TO_DEGREES = 180 / Math.PI;
        static TO_RADIANS = Math.PI / 180;
        static temp = new Vector2(0, 0);

        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x || 0;
            this.y = y || 0;
        }

        reset(x: number, y: number): Vector2 {
            this.x = x;
            this.y = y;
            return this;
        }

        toString(decPlaces: number): string {
            decPlaces = decPlaces || 3;
            var scalar = Math.pow(10, decPlaces);
            return "[" + Math.round(this.x * scalar) / scalar + ", " + Math.round(this.y * scalar) / scalar + "]";
        }

        clone(): Vector2 {
            return new Vector2(this.x, this.y);
        }

        copyTo(v): void {
            v.x = this.x;
            v.y = this.y;
        }

        copyFrom(v): void {
            this.x = v.x;
            this.y = v.y;
        }

        magnitude(): number {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        }

        magnitudeSquared(): number {
            return (this.x * this.x) + (this.y * this.y);
        }

        normalise(): Vector2 {
            var m = this.magnitude();
            this.x = this.x / m;
            this.y = this.y / m;
            return this;
        }

        reverse(): Vector2 {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }

        plusEq(v: Vector2): Vector2 {
            this.x += v.x;
            this.y += v.y;
            return this;
        }

        plusNew(v: Vector2): Vector2 {
            return new Vector2(this.x + v.x, this.y + v.y);
        }

        minusEq(v: Vector2): Vector2 {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        }

        minusNew(v: Vector2): Vector2 {
            return new Vector2(this.x - v.x, this.y - v.y);
        }

        multiplyEq(scalar: number): Vector2 {
            this.x *= scalar;
            this.y *= scalar;
            return this;
        }

        multiplyNew(scalar: number): Vector2 {
            var returnvec = this.clone();
            return returnvec.multiplyEq(scalar);
        }

        divideEq(scalar: number): Vector2 {
            this.x /= scalar;
            this.y /= scalar;
            return this;
        }

        divideNew(scalar: number): Vector2 {
            var returnvec = this.clone();
            return returnvec.divideEq(scalar);
        }

        dot(v: Vector2): number {
            return (this.x * v.x) + (this.y * v.y);
        }

        angle(useRadians: boolean): number {
            return Math.atan2(this.y, this.x) * (useRadians ? 1 : Vector2.TO_DEGREES);
        }

        rotate(angle: number, useRadians: boolean): Vector2 {
            var cosRY = Math.cos(angle * (useRadians ? 1 : Vector2.TO_RADIANS));
            var sinRY = Math.sin(angle * (useRadians ? 1 : Vector2.TO_RADIANS));
            Vector2.temp.copyFrom(this);
            this.x = (Vector2.temp.x * cosRY) - (Vector2.temp.y * sinRY);
            this.y = (Vector2.temp.x * sinRY) + (Vector2.temp.y * cosRY);
            return this;
        }

        equals(v: Vector2): boolean {
            return ((this.x == v.x) && (this.y == v.x));
        }

        isCloseTo(v: Vector2, tolerance: number): boolean {
            if (this.equals(v))
                return true;
            Vector2.temp.copyFrom(this);
            Vector2.temp.minusEq(v);
            return (Vector2.temp.magnitudeSquared() < tolerance * tolerance);
        }

        rotateAroundPoint(point: Vector2, angle: number, useRadians: boolean): void {
            Vector2.temp.copyFrom(this);
            Vector2.temp.minusEq(point);
            Vector2.temp.rotate(angle, useRadians);
            Vector2.temp.plusEq(point);
            this.copyFrom(Vector2.temp);
        }

        isMagLessThan(distance: number): boolean {
            return (this.magnitudeSquared() < distance * distance);
        }

        isMagGreaterThan(distance: number): boolean {
            return (this.magnitudeSquared() > distance * distance);
        }
    }
}