module nnlunar {
    export class Lander {
        vel = new Vector2(0, 0);
        pos = new Vector2(0, 0);
        bottomLeft = new Vector2(0, 0);
        bottomRight = new Vector2(0, 0);
        thrustVec = new Vector2(0, 0);
        gravity = 0.0005;
        thrustAcceleration = 0.0015;
        thrustBuild = 0;
        topSpeed = 0.35;
        drag = 0.9997;
        bouncing = 0;
        landed = false;
        crashed = 0;
        exploding = false;
        explodingCounter = 0;
        targetRotation = 0;
        lastRotationTime = 0;
        counter = 0;        
        rotation = 0;
        thrusting = 0;
        altitude = 0;
        active = true;
        fuel = 0;
        scale = 0.8;
        left = 0;
        right = 0;
        bottom = 0;
        top = 0;
        color = 'white';        
        thrustLevel = 0;

        constructor() {
            
        }

        reset(): void {            
            this.vel.reset(0, 0);
            this.pos.reset(0, 0);
            this.rotation = this.targetRotation = 0;
            this.scale = 1;
            this.thrustBuild = 0;
            this.bouncing = 0;
            this.landed = false;
            this.crashed = 0;
            this.active = true;
            this.exploding = false;
            this.explodingCounter = 0;
            this.thrusting = 0;
            this.color = 'white';
        }

        rotate(direction: number): void {
            this.targetRotation += direction * 15;
            this.targetRotation = clamp(this.targetRotation, -90, 90);
        }

        setRotation(angle: number): void {
            this.targetRotation = Math.round(clamp(angle, -90, 90) / 10) * 10;
        }

        thrust(power: number): void {
            this.thrusting = power;
        }

        update(): void {
            this.counter++;
            this.rotation += (this.targetRotation - this.rotation) * 0.3;
            if (Math.abs(this.rotation - this.targetRotation) < 0.1)
                this.rotation = this.targetRotation;
            if (this.exploding) {
                this.explodingCounter++;                
            }
            if (this.active) {
                if (this.fuel <= 0)
                    this.thrusting = 0;
                this.thrustBuild += ((this.thrusting - this.thrustBuild) * 0.2);
                if (this.thrustBuild > 0) {
                    this.thrustVec.reset(0, -this.thrustAcceleration * this.thrustBuild);
                    this.thrustVec.rotate(this.rotation, false);
                    this.vel.plusEq(this.thrustVec);
                    this.fuel -= (0.2 * this.thrustBuild);
                }
                this.pos.plusEq(this.vel);
                this.vel.x *= this.drag;
                this.vel.y += this.gravity;
                if (this.vel.y > this.topSpeed)
                    this.vel.y = this.topSpeed;
                else if (this.vel.y < -this.topSpeed)
                    this.vel.y = -this.topSpeed;
                this.left = this.pos.x - (10 * this.scale);
                this.right = this.pos.x + (10 * this.scale);
                this.bottom = this.pos.y + (14 * this.scale);
                this.top = this.pos.y - (5 * this.scale);
                this.bottomLeft.reset(this.left, this.bottom);
                this.bottomRight.reset(this.right, this.bottom);
            } else if (this.bouncing > 0) {
                this.pos.y += Math.sin(this.bouncing) * 0.07;
                this.bouncing -= Math.PI / 20;
            }
            if (this.fuel < 0)
                this.fuel = 0;
            this.thrustLevel = this.thrustBuild;
        }

        crash(crash: number): void {
            //console.log("crash", this.pos.toString(), this.vel.toString(), this.rotation);         
            this.landed = false;
            this.crashed = crash;
            this.active = false;
            this.exploding = true;
            this.explodingCounter = 0;
            this.thrustBuild = 0;            
        }

        land(): void {
            //console.log("land", this.pos.toString(), this.vel.toString(), this.rotation);
            this.landed = true;
            this.crashed = 0;
            this.active = false;
            this.thrustBuild = 0;
            this.color = 'green';
        }

        makeBounce(): void {
            this.bouncing = Math.PI * 2;
        }
    }

    export class LanderRenderer {
        shapes = [];
        shapeVels: Vector2[] = [];

        constructor() {
            this.defineShape();
        }

        defineShape(): void {
            var m = 'm'
                , l = 'l'
                , r = 'r'
                , cp = 'cp';
            var min = 2.6
                , max = 5;
            var shape = [];
            shape.push(m, min, -max);
            shape.push(l, max, -min);
            shape.push(l, max, min);
            shape.push(l, min, max);
            shape.push(l, -min, max);
            shape.push(l, -max, min);
            shape.push(l, -max, -min);
            shape.push(l, -min, -max);
            shape.push(cp);
            this.shapes.push(shape);
            this.shapeVels.push(new Vector2(1, -2.5));
            this.shapes.push([r, -6, 5, 12, 2]);
            this.shapeVels.push(new Vector2(2, -1.5));
            shape = [];
            shape.push(m, -5, 7.5);
            shape.push(l, -9, 13);
            shape.push(m, -11, 13);
            shape.push(l, -7, 13);
            this.shapes.push(shape);
            this.shapeVels.push(new Vector2(0, -3));
            shape = [];
            shape.push(m, 5, 7.5);
            shape.push(l, 9, 13);
            shape.push(m, 11, 13);
            shape.push(l, 7, 13);
            this.shapes.push(shape);
            this.shapeVels.push(new Vector2(3, -1));
            shape = [];
            shape.push(m, -3, 7.5);
            shape.push(l, -5, 12);
            shape.push(l, -4.5, 13);
            this.shapes.push(shape);
            this.shapeVels.push(new Vector2(1, -1));
            shape = [];
            shape.push(m, 3, 7.5);
            shape.push(l, 5, 12);
            shape.push(l, 4.5, 13);
            this.shapes.push(shape);
            this.shapeVels.push(new Vector2(2.5, -1));
            shape = [];
            shape.push(m, 4, 11);
            shape.push(l, -4, 11);
            this.shapes.push(shape);
            this.shapeVels.push(new Vector2(2, -0.5));
            for (let i = 0; i < this.shapeVels.length; i++) {
                this.shapeVels[i].rotate(-45, false);
            }
        }

        render(l: Lander, c: CanvasRenderingContext2D, scale: number, color?: string): void {
            if (l.explodingCounter > 60)
                return;

            c.save();
            c.translate(l.pos.x, l.pos.y);
            c.scale(l.scale, l.scale);
            c.lineWidth = 1 / (l.scale * scale);
            c.rotate(l.rotation * Vector2.TO_RADIANS);
            c.strokeStyle = color || l.color;
            c.beginPath();            
            this.renderShapes(c, l.explodingCounter);
            if ((l.thrustBuild > 0) && (l.active)) {
                c.lineTo(0, 11 + (Math.min(l.thrustBuild, 1) * 20 * ((((l.counter >> 1) % 3) * 0.2) + 1)));
                c.closePath();
            }
            c.stroke();
            c.restore();
        }

        renderShapes(c: CanvasRenderingContext2D, timeOffset: number): void {
            var shapes = this.shapes                
                , shapeVels = this.shapeVels;
            for (var i = 0; i < shapes.length; i++) {
                var s = shapes[i].slice(0);                
                c.save();
                c.translate(shapeVels[i].x * timeOffset, shapeVels[i].y * timeOffset);
                while (s.length > 0) {
                    var cmd = s.shift();
                    switch (cmd) {
                        case 'm':
                            c.moveTo(s.shift(), s.shift());
                            break;
                        case 'l':
                            c.lineTo(s.shift(), s.shift());
                            break;
                        case 'cp':
                            c.closePath();
                            break;
                        case 'r':
                            c.rect(s.shift(), s.shift(), s.shift(), s.shift());
                            break;
                        default:
                            console.log('bad command!');
                    }
                }
                c.restore();
            }
        }
    }
}