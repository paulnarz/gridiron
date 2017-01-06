var nnlunar;
(function (nnlunar) {
    var Lander = (function () {
        function Lander() {
            this.vel = new nnlunar.Vector2(0, 0);
            this.pos = new nnlunar.Vector2(0, 0);
            this.bottomLeft = new nnlunar.Vector2(0, 0);
            this.bottomRight = new nnlunar.Vector2(0, 0);
            this.thrustVec = new nnlunar.Vector2(0, 0);
            this.gravity = 0.0005;
            this.thrustAcceleration = 0.0015;
            this.thrustBuild = 0;
            this.topSpeed = 0.35;
            this.drag = 0.9997;
            this.bouncing = 0;
            this.landed = false;
            this.crashed = false;
            this.exploding = false;
            this.explodingCounter = 0;
            this.targetRotation = 0;
            this.lastRotationTime = 0;
            this.counter = 0;
            this.rotation = 0;
            this.thrusting = 0;
            this.altitude = 0;
            this.active = true;
            this.fuel = 0;
            this.scale = 0.8;
            this.left = 0;
            this.right = 0;
            this.bottom = 0;
            this.top = 0;
            this.color = 'white';
            this.thrustLevel = 0;
        }
        Lander.prototype.reset = function () {
            this.vel.reset(0, 0);
            this.pos.reset(0, 0);
            this.rotation = this.targetRotation = 0;
            this.scale = 1;
            this.thrustBuild = 0;
            this.bouncing = 0;
            this.landed = false;
            this.crashed = false;
            this.active = true;
            this.exploding = false;
            this.explodingCounter = 0;
            this.thrusting = 0;
            this.color = 'white';
        };
        Lander.prototype.rotate = function (direction) {
            this.targetRotation += direction * 15;
            this.targetRotation = nnlunar.clamp(this.targetRotation, -90, 90);
        };
        Lander.prototype.setRotation = function (angle) {
            this.targetRotation = Math.round(nnlunar.clamp(angle, -90, 90) / 10) * 10;
        };
        Lander.prototype.thrust = function (power) {
            this.thrusting = power;
        };
        Lander.prototype.update = function () {
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
            }
            else if (this.bouncing > 0) {
                this.pos.y += Math.sin(this.bouncing) * 0.07;
                this.bouncing -= Math.PI / 20;
            }
            if (this.fuel < 0)
                this.fuel = 0;
            this.thrustLevel = this.thrustBuild;
        };
        Lander.prototype.crash = function () {
            //console.log("crash", this.pos.toString(), this.vel.toString(), this.rotation);         
            this.landed = false;
            this.crashed = true;
            this.active = false;
            this.exploding = true;
            this.explodingCounter = 0;
            this.thrustBuild = 0;
        };
        Lander.prototype.land = function () {
            //console.log("land", this.pos.toString(), this.vel.toString(), this.rotation);
            this.landed = true;
            this.crashed = false;
            this.active = false;
            this.thrustBuild = 0;
            this.color = 'green';
        };
        Lander.prototype.makeBounce = function () {
            this.bouncing = Math.PI * 2;
        };
        return Lander;
    }());
    nnlunar.Lander = Lander;
    var LanderRenderer = (function () {
        function LanderRenderer() {
            this.shapes = [];
            this.shapeVels = [];
            this.defineShape();
        }
        LanderRenderer.prototype.defineShape = function () {
            var m = 'm', l = 'l', r = 'r', cp = 'cp';
            var min = 2.6, max = 5;
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
            this.shapeVels.push(new nnlunar.Vector2(1, -2.5));
            this.shapes.push([r, -6, 5, 12, 2]);
            this.shapeVels.push(new nnlunar.Vector2(2, -1.5));
            shape = [];
            shape.push(m, -5, 7.5);
            shape.push(l, -9, 13);
            shape.push(m, -11, 13);
            shape.push(l, -7, 13);
            this.shapes.push(shape);
            this.shapeVels.push(new nnlunar.Vector2(0, -3));
            shape = [];
            shape.push(m, 5, 7.5);
            shape.push(l, 9, 13);
            shape.push(m, 11, 13);
            shape.push(l, 7, 13);
            this.shapes.push(shape);
            this.shapeVels.push(new nnlunar.Vector2(3, -1));
            shape = [];
            shape.push(m, -3, 7.5);
            shape.push(l, -5, 12);
            shape.push(l, -4.5, 13);
            this.shapes.push(shape);
            this.shapeVels.push(new nnlunar.Vector2(1, -1));
            shape = [];
            shape.push(m, 3, 7.5);
            shape.push(l, 5, 12);
            shape.push(l, 4.5, 13);
            this.shapes.push(shape);
            this.shapeVels.push(new nnlunar.Vector2(2.5, -1));
            shape = [];
            shape.push(m, 4, 11);
            shape.push(l, -4, 11);
            this.shapes.push(shape);
            this.shapeVels.push(new nnlunar.Vector2(2, -0.5));
            for (var i = 0; i < this.shapeVels.length; i++) {
                this.shapeVels[i].rotate(-45, false);
            }
        };
        LanderRenderer.prototype.render = function (l, c, scale, color) {
            if (l.explodingCounter > 60)
                return;
            c.save();
            c.translate(l.pos.x, l.pos.y);
            c.scale(l.scale, l.scale);
            c.lineWidth = 1 / (l.scale * scale);
            c.rotate(l.rotation * nnlunar.Vector2.TO_RADIANS);
            c.strokeStyle = color || l.color;
            c.beginPath();
            this.renderShapes(c, l.explodingCounter);
            if ((l.thrustBuild > 0) && (l.active)) {
                c.lineTo(0, 11 + (Math.min(l.thrustBuild, 1) * 20 * ((((l.counter >> 1) % 3) * 0.2) + 1)));
                c.closePath();
            }
            c.stroke();
            c.restore();
        };
        LanderRenderer.prototype.renderShapes = function (c, timeOffset) {
            var shapes = this.shapes, shapeVels = this.shapeVels;
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
        };
        return LanderRenderer;
    }());
    nnlunar.LanderRenderer = LanderRenderer;
})(nnlunar || (nnlunar = {}));
var nnlunar;
(function (nnlunar) {
    var LunarGamePhaser = (function () {
        function LunarGamePhaser() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, "content", {
                preload: this.preload,
                create: this.create
            });
        }
        LunarGamePhaser.prototype.preload = function () {
            console.log("preload");
        };
        LunarGamePhaser.prototype.create = function () {
            console.log("create");
        };
        return LunarGamePhaser;
    }());
    nnlunar.LunarGamePhaser = LunarGamePhaser;
})(nnlunar || (nnlunar = {}));
var nnlunar;
(function (nnlunar) {
    var LunarGameRaw = (function () {
        function LunarGameRaw() {
            var _this = this;
            //world
            this.SCREEN_WIDTH = 800;
            this.SCREEN_HEIGHT = 800;
            this.start = {
                x: 200,
                y: 200,
                rotation: 0,
                fuel: 500
            };
            this.target = {
                x: 600,
                y: 600,
                left: 600 - 40,
                right: 600 + 40,
                minVel: 0.15,
                minAng: 5
            };
            this.view = {
                x: 0,
                y: 0,
                scale: 1,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };
            //display/debug
            this.simSteps = 128;
            this.simDisplay = 50;
            this.simColor = "#7F7F7F";
            this.bestSteps = 4;
            this.bestDisplay = 5;
            this.bestColor = "#FFFFFF";
            this.bestExtraTime = 320;
            this.discreteThurst = true;
            this.logElapsed = false;
            this.watch = undefined;
            //fitness
            this.evoOptions = {
                population: 100,
                elitism: 0.3,
                randomBehaviour: 0.1,
                mutationRate: 0.2,
                mutationRange: 0.5,
                nbChild: 2,
                network: {
                    inputs: 6,
                    hiddens: [22, 22],
                    outputs: 2,
                    randomClamped: function () { return Math.random() * 8 - 4; }
                }
            };
            //state        
            this.bestCounter = 0;
            this.lastLoopTime = Date.now();
            this.stats = {
                generations: 0,
                landed: 0,
                best: 0,
                average: 0,
                population: 0,
                crashed: 0,
                worst: 0,
                scores: []
            };
            this.loop = function () {
                var start = Date.now();
                var elapsed = start - _this.lastLoopTime;
                requestAnimationFrame(_this.loop);
                while (Date.now() - start < 9) {
                    if (!_this.update(_this.evoLanders, _this.evoNetworks, _this.evo)) {
                        _this.evolve();
                        _this.resetLanders(_this.evoLanders, _this.evoNetworks);
                    }
                }
                for (var j = 0; j < _this.bestSteps; j++) {
                    var stillActive = _this.update(_this.bestLanders, _this.bestNetworks, undefined);
                    if (!stillActive) {
                        _this.bestCounter++;
                        if (_this.bestCounter >= _this.bestExtraTime)
                            stillActive = false;
                    }
                    if (!stillActive) {
                        _this.getBest(_this.evoNetworks, _this.bestNetworks, _this.bestDisplay);
                        _this.resetLanders(_this.bestLanders, _this.bestNetworks);
                        _this.bestCounter = 0;
                    }
                }
                var updateTime = Date.now() - start;
                start = Date.now();
                _this.render();
                var renderTime = Date.now() - start;
                if (_this.logElapsed) {
                    console.log({
                        elapsed: start - _this.lastLoopTime,
                        updateTime: updateTime,
                        renderTime: renderTime
                    });
                }
                _this.lastLoopTime = Date.now();
                if (_this.watch) {
                    console.log(_this.watch());
                }
            };
            this.update = function (landers, networks, evo) {
                var activeLanders = false;
                for (var i = 0, len = landers.length; i < len; i++) {
                    var l = landers[i];
                    if (l.active) {
                        _this.calcFunc(l, networks[i]);
                    }
                    l.update();
                    if (l.active) {
                        //check collision
                        if (l.bottom >= _this.target.y) {
                            if ((l.left > _this.target.left) && (l.right < _this.target.right)) {
                                if ((Math.abs(l.rotation) <= _this.target.minAng) && (l.vel.y <= _this.target.minVel)) {
                                    l.land();
                                }
                                else {
                                    l.crash();
                                }
                            }
                            else {
                                l.crash();
                            }
                        }
                        if (evo && !l.active) {
                            var score = _this.scoreFunc(l);
                            _this.stats.scores.push({
                                score: score,
                                landed: l.landed,
                                crashed: l.crashed,
                                data: _this.statFunc(l)
                            });
                            evo.networkScore(networks[i], score);
                        }
                    }
                    if (l.active) {
                        activeLanders = true;
                    }
                }
                return activeLanders;
            };
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
            document.body.appendChild(this.canvas);
            this.canvas.width = this.SCREEN_WIDTH;
            this.canvas.height = this.SCREEN_HEIGHT;
            this.canvas.style.backgroundColor = "#000000";
            this.renderer = new nnlunar.LanderRenderer();
            this.evo = new nnpoc.Neuroevolution(this.evoOptions);
            this.evoLanders = [];
            this.bestLanders = [];
            this.bestNetworks = [];
            this.evolve();
            this.resetLanders(this.evoLanders, this.evoNetworks);
            this.getBest(this.evoNetworks, this.bestNetworks, 0);
            this.resetLanders(this.bestLanders, this.bestNetworks);
            this.loop();
        }
        LunarGameRaw.prototype.statFunc = function (l) {
            return {
                x: l.pos.x,
                y: l.pos.y,
                r: l.rotation,
                f: l.fuel,
                vx: l.vel.x,
                vy: l.vel.y,
            };
        };
        LunarGameRaw.prototype.calcFunc = function (l, n) {
            var result = n.calculate([
                nnpoc.lerpInv(l.pos.x, 0, 800),
                nnpoc.lerpInv(l.pos.y, 0, 800),
                nnpoc.lerpInv(l.rotation, -90, 90),
                nnpoc.lerpInv(l.vel.x, -0.35, 0.35),
                nnpoc.lerpInv(l.vel.y, -0.35, 0.35),
                nnpoc.lerpInv(l.fuel, 0, this.start.fuel)
            ]);
            if (this.discreteThurst) {
                if (result[0] > 0.5)
                    l.thrust(1);
            }
            else {
                l.thrust(result[0]);
            }
            l.setRotation(nnpoc.lerp(result[1], -90, 90));
        };
        LunarGameRaw.prototype.scoreFunc = function (l) {
            var score = 0;
            var dx = (l.pos.x - this.target.x) / this.SCREEN_WIDTH;
            var dvy = l.vel.y / 0.35;
            var dr = l.rotation / 90;
            var df = (this.start.fuel - l.fuel) / this.start.fuel;
            if (l.crashed)
                score += 4;
            score += dx * dx;
            score += dvy * dvy;
            score += dr * dr;
            score += df * df;
            return score;
        };
        LunarGameRaw.prototype.evolve = function () {
            var _this = this;
            this.stats.scores.sort(function (a, b) { return a.score - b.score; });
            this.stats.landed = 0;
            this.stats.crashed = 0;
            this.stats.best = Infinity;
            this.stats.worst = -Infinity;
            this.stats.average = 0;
            this.stats.population = this.stats.scores.length;
            this.stats.scores.forEach(function (s) {
                if (s.landed)
                    _this.stats.landed++;
                if (s.crashed)
                    _this.stats.crashed++;
                if (_this.stats.best > s.score)
                    _this.stats.best = s.score;
                if (_this.stats.worst < s.score)
                    _this.stats.worst = s.score;
                _this.stats.average += s.score;
            });
            if (this.stats.scores.length > 0)
                this.stats.average /= this.stats.scores.length;
            console.log(this.stats);
            this.stats.generations++;
            this.stats.scores = [];
            this.evoNetworks = this.evo.nextGeneration();
        };
        LunarGameRaw.prototype.resetLanders = function (landers, networks) {
            for (var i = 0; i < networks.length; i++) {
                var l = landers[i];
                if (!l) {
                    l = new nnlunar.Lander();
                    landers.push(l);
                }
                l.reset();
                l.pos.x = this.start.x;
                l.pos.y = this.start.y;
                l.rotation = this.start.rotation;
                l.fuel = this.start.fuel;
            }
            if (landers.length > networks.length)
                landers.splice(networks.length, landers.length - networks.length);
        };
        LunarGameRaw.prototype.getBest = function (soure, dest, amount) {
            for (var i = 0, l = Math.min(amount, soure.length); i < l; i++) {
                dest[i] = soure[i].clone();
            }
            if (dest.length > soure.length)
                dest.splice(soure.length, dest.length - soure.length);
        };
        LunarGameRaw.prototype.render = function () {
            var c = this.context;
            var view = this.view;
            c.clearRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
            c.save();
            c.translate(view.x, view.y);
            c.scale(view.scale, view.scale);
            //draw start
            c.strokeStyle = "#FF0000";
            c.beginPath();
            c.arc(this.start.x, this.start.y, 1, 0, 90);
            c.stroke();
            //draw langscape
            c.strokeStyle = "#FFFFFF";
            c.beginPath();
            c.moveTo(0, this.target.y);
            c.lineTo(this.SCREEN_WIDTH, this.target.y);
            c.stroke();
            c.strokeStyle = "#00FF00";
            c.lineWidth = 5;
            c.beginPath();
            c.moveTo(this.target.left, this.target.y);
            c.lineTo(this.target.right, this.target.y);
            c.stroke();
            for (var i = 0, len = Math.min(this.evoLanders.length, this.simDisplay); i < len; i++) {
                this.renderer.render(this.evoLanders[i], c, view.scale, this.simColor);
            }
            for (var i = 0, len = Math.min(this.bestLanders.length, this.bestDisplay); i < len; i++) {
                this.renderer.render(this.bestLanders[i], c, view.scale, this.bestColor);
            }
            c.restore();
        };
        return LunarGameRaw;
    }());
    nnlunar.LunarGameRaw = LunarGameRaw;
    var Tracker = (function () {
        function Tracker() {
        }
        Tracker.track = function (key, value) {
            var tracker = Tracker.values[key];
            if (!tracker) {
                Tracker.values[key] = tracker = {
                    min: value,
                    max: value
                };
                console.log(key, tracker);
            }
            else {
                if (tracker.min > value) {
                    tracker.min = value;
                    console.log(key, tracker);
                }
                if (tracker.max < value) {
                    tracker.max = value;
                    console.log(key, tracker);
                }
            }
        };
        Tracker.values = {};
        return Tracker;
    }());
})(nnlunar || (nnlunar = {}));
var nnlunar;
(function (nnlunar) {
    function clamp(value, min, max) {
        return (value < min) ? min : (value > max) ? max : value;
    }
    nnlunar.clamp = clamp;
})(nnlunar || (nnlunar = {}));
var nnlunar;
(function (nnlunar) {
    var Vector2 = (function () {
        function Vector2(x, y) {
            this.x = x || 0;
            this.y = y || 0;
        }
        Vector2.prototype.reset = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        Vector2.prototype.toString = function (decPlaces) {
            decPlaces = decPlaces || 3;
            var scalar = Math.pow(10, decPlaces);
            return "[" + Math.round(this.x * scalar) / scalar + ", " + Math.round(this.y * scalar) / scalar + "]";
        };
        Vector2.prototype.clone = function () {
            return new Vector2(this.x, this.y);
        };
        Vector2.prototype.copyTo = function (v) {
            v.x = this.x;
            v.y = this.y;
        };
        Vector2.prototype.copyFrom = function (v) {
            this.x = v.x;
            this.y = v.y;
        };
        Vector2.prototype.magnitude = function () {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        };
        Vector2.prototype.magnitudeSquared = function () {
            return (this.x * this.x) + (this.y * this.y);
        };
        Vector2.prototype.normalise = function () {
            var m = this.magnitude();
            this.x = this.x / m;
            this.y = this.y / m;
            return this;
        };
        Vector2.prototype.reverse = function () {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        };
        Vector2.prototype.plusEq = function (v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        };
        Vector2.prototype.plusNew = function (v) {
            return new Vector2(this.x + v.x, this.y + v.y);
        };
        Vector2.prototype.minusEq = function (v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        };
        Vector2.prototype.minusNew = function (v) {
            return new Vector2(this.x - v.x, this.y - v.y);
        };
        Vector2.prototype.multiplyEq = function (scalar) {
            this.x *= scalar;
            this.y *= scalar;
            return this;
        };
        Vector2.prototype.multiplyNew = function (scalar) {
            var returnvec = this.clone();
            return returnvec.multiplyEq(scalar);
        };
        Vector2.prototype.divideEq = function (scalar) {
            this.x /= scalar;
            this.y /= scalar;
            return this;
        };
        Vector2.prototype.divideNew = function (scalar) {
            var returnvec = this.clone();
            return returnvec.divideEq(scalar);
        };
        Vector2.prototype.dot = function (v) {
            return (this.x * v.x) + (this.y * v.y);
        };
        Vector2.prototype.angle = function (useRadians) {
            return Math.atan2(this.y, this.x) * (useRadians ? 1 : Vector2.TO_DEGREES);
        };
        Vector2.prototype.rotate = function (angle, useRadians) {
            var cosRY = Math.cos(angle * (useRadians ? 1 : Vector2.TO_RADIANS));
            var sinRY = Math.sin(angle * (useRadians ? 1 : Vector2.TO_RADIANS));
            Vector2.temp.copyFrom(this);
            this.x = (Vector2.temp.x * cosRY) - (Vector2.temp.y * sinRY);
            this.y = (Vector2.temp.x * sinRY) + (Vector2.temp.y * cosRY);
            return this;
        };
        Vector2.prototype.equals = function (v) {
            return ((this.x == v.x) && (this.y == v.x));
        };
        Vector2.prototype.isCloseTo = function (v, tolerance) {
            if (this.equals(v))
                return true;
            Vector2.temp.copyFrom(this);
            Vector2.temp.minusEq(v);
            return (Vector2.temp.magnitudeSquared() < tolerance * tolerance);
        };
        Vector2.prototype.rotateAroundPoint = function (point, angle, useRadians) {
            Vector2.temp.copyFrom(this);
            Vector2.temp.minusEq(point);
            Vector2.temp.rotate(angle, useRadians);
            Vector2.temp.plusEq(point);
            this.copyFrom(Vector2.temp);
        };
        Vector2.prototype.isMagLessThan = function (distance) {
            return (this.magnitudeSquared() < distance * distance);
        };
        Vector2.prototype.isMagGreaterThan = function (distance) {
            return (this.magnitudeSquared() > distance * distance);
        };
        Vector2.TO_DEGREES = 180 / Math.PI;
        Vector2.TO_RADIANS = Math.PI / 180;
        Vector2.temp = new Vector2(0, 0);
        return Vector2;
    }());
    nnlunar.Vector2 = Vector2;
})(nnlunar || (nnlunar = {}));
var nnpoc;
(function (nnpoc) {
    var Color = (function () {
        function Color() {
        }
        Color.hsvToRgb = function (h, v, s) {
            var c = v * s;
            var hp = h / 60;
            var x = c * (1 - Math.abs((hp % 2) - 1));
            var r1, g1, b1;
            if (hp < 0) {
                r1 = 0;
                g1 = 0;
                b1 = 0;
            }
            else if (hp < 1) {
                r1 = c;
                g1 = x;
                b1 = 0;
            }
            else if (hp < 2) {
                r1 = x;
                g1 = c;
                b1 = 0;
            }
            else if (hp < 3) {
                r1 = 0;
                g1 = c;
                b1 = x;
            }
            else if (hp < 4) {
                r1 = 0;
                g1 = x;
                b1 = c;
            }
            else if (hp < 5) {
                r1 = x;
                g1 = 0;
                b1 = c;
            }
            else if (hp < 6) {
                r1 = c;
                g1 = 0;
                b1 = x;
            }
            var m = v - c;
            var r = r1 + m;
            var g = g1 + m;
            var b = b1 + m;
            return 'rgb(' + Math.floor(r * 255) + ',' + Math.floor(g * 255) + ',' + Math.floor(b * 255) + ')';
        };
        Color.getValueColor = function (value) {
            var h = 240 - (value || 0) * 240;
            return Color.hsvToRgb(h, 1, 1);
        };
        return Color;
    }());
    nnpoc.Color = Color;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Edge = (function () {
        function Edge() {
        }
        return Edge;
    }());
    nnpoc.Edge = Edge;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var FuncTrainer = (function () {
        function FuncTrainer(targetFunc, points) {
            this.FuncMin = 0;
            this.FuncMax = 0;
            this.Points = points;
            this.setFunc(targetFunc);
            this.NEvo = new nnpoc.Neuroevolution({
                population: 50,
                elitism: 0.2,
                randomBehaviour: 0.2,
                mutationRate: 0.1,
                mutationRange: 0.5,
                nbChild: 1,
                network: {
                    inputs: 2,
                    hiddens: [3, 3],
                    outputs: 1,
                    randomClamped: function () { return Math.random() * 8 - 4; }
                }
            });
            this.train();
        }
        FuncTrainer.prototype.reset = function () {
            this.NEvo.reset();
            this.train();
        };
        FuncTrainer.prototype.setFunc = function (targetFunc) {
            var _this = this;
            this.TargetFunc = targetFunc;
            this.FuncMin = Infinity;
            this.FuncMax = -Infinity;
            this.Points.forEach(function (p) {
                var z = _this.TargetFunc(p.x, p.y);
                if (z < _this.FuncMin)
                    _this.FuncMin = z;
                if (z > _this.FuncMax)
                    _this.FuncMax = z;
            });
        };
        FuncTrainer.prototype.getBest = function () {
            return this.Networks[0].network;
        };
        FuncTrainer.prototype.calc = function (x, y) {
            var z = this.getBest().calculate([x, y])[0];
            return nnpoc.lerp(z, this.FuncMin, this.FuncMax);
        };
        FuncTrainer.prototype.train = function () {
            var _this = this;
            this.Networks = [];
            var networks = this.NEvo.nextGeneration();
            networks.forEach(function (network, i) {
                var score = 0;
                _this.Points.forEach(function (p) {
                    var tv = _this.TargetFunc(p.x, p.y);
                    var nv = nnpoc.lerp(network.calculate([p.x, p.y])[0], _this.FuncMin, _this.FuncMax);
                    score += (tv - nv) * (tv - nv);
                });
                _this.NEvo.networkScore(network, score);
                _this.Networks.push({
                    network: network,
                    score: score
                });
            });
            this.Networks.sort(function (a, b) { return a.score - b.score; });
        };
        return FuncTrainer;
    }());
    nnpoc.FuncTrainer = FuncTrainer;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Graph = (function () {
        function Graph() {
        }
        Graph.init3d = function (elementId) {
            return new vis.Graph3d(document.getElementById(elementId), undefined, {
                style: 'surface',
            });
        };
        Graph.initOverhead = function (elementId) {
            return new vis.Graph3d(document.getElementById(elementId), undefined, {
                style: 'surface',
                showPerspective: false,
                cameraPosition: { horizontal: 0.0, vertical: 3.14 },
                zMin: -1,
                zMax: 1,
            });
        };
        Graph.initNetwork = function (elementId) {
            return new vis.Network(document.getElementById(elementId), undefined, {
                physics: {
                    enabled: false
                },
                layout: {
                    hierarchical: {
                        direction: "LR",
                        sortMethod: "directed"
                    }
                }
            });
        };
        Graph.SetBounds = function (graph, zMin, zMax) {
            if (zMax - zMin < 1) {
                zMax += 0.5;
                zMin -= 0.5;
            }
            graph.setOptions({
                zMin: zMin,
                zMax: zMax,
            });
        };
        Graph.calcNetworkData = function (network, points) {
            var data = [];
            points.forEach(function (p) {
                var z = network.calculate([p.x, p.y])[0];
                data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            });
            return data;
        };
        Graph.calcNetworkDataExpand = function (network, points, min, max) {
            var data = [];
            points.forEach(function (p) {
                var z = network.calculate([p.x, p.y])[0];
                z = nnpoc.lerp(z, min, max);
                data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            });
            return data;
        };
        Graph.mapToDecision = function (data, cutoff, high, low) {
            var result = [];
            data.forEach(function (p) {
                result.push({
                    x: p.x,
                    y: p.y,
                    z: p.z > cutoff ? high : low
                });
            });
            return result;
        };
        Graph.map3d = function (data, func) {
            var result = [];
            data.forEach(function (p) {
                result.push(func(p));
            });
            return result;
        };
        Graph.calcData = function (func, points) {
            var data = [];
            points.forEach(function (p) {
                var z = func(p.x, p.y);
                data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            });
            return data;
        };
        Graph.buildNodes = function (network) {
            var nodes = [];
            var edges = [];
            network.layers.forEach(function (l, li) {
                l.neurons.forEach(function (n, ni) {
                    var id = li + "_" + ni;
                    nodes.push({
                        id: id,
                        label: (n.value || 0).toFixed(2),
                        color: nnpoc.Color.getValueColor(n.value || 0)
                    });
                    if (n.edges) {
                        n.edges.forEach(function (e, ei) {
                            var fromID = li - 1 + "_" + ei;
                            var edgeID = li + "_" + ni + "_" + ei;
                            edges.push({
                                id: edgeID,
                                from: fromID,
                                to: id,
                                label: (e.weight || 0).toFixed(2),
                                color: nnpoc.Color.getValueColor(nnpoc.lerpInv(e.weight, -4, 4))
                            });
                        });
                    }
                });
            });
            return {
                nodes: nodes,
                edges: edges
            };
        };
        return Graph;
    }());
    nnpoc.Graph = Graph;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Layer = (function () {
        function Layer() {
        }
        Layer.prototype.populate = function (nNeurons, nInputs, random) {
            this.neurons = [];
            for (var i = 0; i < nNeurons; i++) {
                var n = new nnpoc.Neuron();
                n.populate(nInputs, random);
                this.neurons.push(n);
            }
        };
        return Layer;
    }());
    nnpoc.Layer = Layer;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Network = (function () {
        function Network() {
        }
        Network.prototype.activation = function (value) {
            return (1 / (1 + Math.exp(-value)));
        };
        Network.prototype.populate = function (options) {
            this.layers = [];
            var layer = new nnpoc.Layer();
            layer.populate(options.inputs, 0, options.randomClamped);
            layer.neurons.push(new nnpoc.Neuron()); //add bias
            this.layers.push(layer);
            if (options.hiddens) {
                for (var i = 0; i < options.hiddens.length; i++) {
                    layer = new nnpoc.Layer();
                    layer.populate(options.hiddens[i], this.layers[i].neurons.length, options.randomClamped);
                    layer.neurons.push(new nnpoc.Neuron()); //add bias
                    this.layers.push(layer);
                }
            }
            layer = new nnpoc.Layer();
            layer.populate(options.outputs, this.layers[this.layers.length - 1].neurons.length, options.randomClamped);
            this.layers.push(layer);
        };
        Network.prototype.calculate = function (inputs) {
            var layer = this.layers[0];
            for (var i = 0; i < inputs.length; i++) {
                layer.neurons[i].value = inputs[i];
            }
            layer.neurons[layer.neurons.length - 1].value = 1;
            var prevLayer = layer;
            for (var i = 1; i < this.layers.length; i++) {
                layer = this.layers[i];
                prevLayer = this.layers[i - 1];
                for (var j = 0; j < layer.neurons.length; j++) {
                    var neuron = layer.neurons[j];
                    if (neuron.edges) {
                        var sum = 0;
                        for (var k = 0; k < prevLayer.neurons.length; k++) {
                            sum += prevLayer.neurons[k].value * neuron.edges[k].weight;
                        }
                        neuron.value = this.activation(sum);
                    }
                    else {
                        neuron.value = 1;
                    }
                }
            }
            var out = [];
            for (var i = 0; i < layer.neurons.length; i++) {
                out.push(layer.neurons[i].value);
            }
            return out;
        };
        Network.prototype.getData = function () {
            var data = {
                neurons: [],
                weights: []
            };
            this.layers.forEach(function (l) {
                data.neurons.push(l.neurons.length);
                l.neurons.forEach(function (n) {
                    if (n.edges) {
                        n.edges.forEach(function (e) {
                            data.weights.push(e.weight);
                        });
                    }
                });
            });
            return data;
        };
        Network.prototype.setData = function (data) {
            var _this = this;
            var previousNeurons = 0;
            var index = 0;
            this.layers = [];
            data.neurons.forEach(function (neurons, i) {
                var layer = new nnpoc.Layer();
                layer.populate(neurons, previousNeurons, undefined);
                //remove edges for the biases.
                if (i < data.neurons.length - 1)
                    layer.neurons[layer.neurons.length - 1].edges = undefined;
                layer.neurons.forEach(function (neuron) {
                    if (neuron.edges) {
                        neuron.edges.forEach(function (edge) {
                            edge.weight = data.weights[index];
                            index++;
                        });
                    }
                });
                _this.layers.push(layer);
                previousNeurons = neurons;
            });
        };
        Network.prototype.clone = function () {
            var n = new Network();
            n.setData(this.getData());
            return n;
        };
        return Network;
    }());
    nnpoc.Network = Network;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Neuroevolution = (function () {
        function Neuroevolution(options) {
            this.options = options;
        }
        Neuroevolution.prototype.reset = function () {
            this.genomes = undefined;
        };
        Neuroevolution.prototype.nextGeneration = function () {
            if (!this.genomes)
                return this.generateFirstGeneration();
            else
                return this.generateNextGeneration();
        };
        Neuroevolution.prototype.generateFirstGeneration = function () {
            this.genomes = [];
            var out = [];
            for (var i = 0; i < this.options.population; i++) {
                var n = new nnpoc.Network();
                n.populate(this.options.network);
                out.push(n);
            }
            return out;
        };
        Neuroevolution.prototype.generateNextGeneration = function () {
            var nexts = [];
            this.genomes.sort(function (a, b) { return a.score - b.score; });
            for (var i_1 = 0, l = Math.round(this.options.elitism * this.options.population); i_1 < l; i_1++) {
                if (nexts.length < this.options.population) {
                    var n = new nnpoc.Network();
                    n.setData(this.genomes[i_1].network);
                    nexts.push(n);
                }
            }
            for (var i_2 = 0, l = Math.round(this.options.randomBehaviour * this.options.population); i_2 < l; i_2++) {
                if (nexts.length < this.options.population) {
                    var n = new nnpoc.Network();
                    n.populate(this.options.network);
                    nexts.push(n);
                }
            }
            var max = 0;
            while (nexts.length < this.options.population) {
                for (var i = 0; i < max; i++) {
                    var childs = this.breed(this.genomes[i], this.genomes[max], (this.options.nbChild > 0 ? this.options.nbChild : 1));
                    for (var c in childs) {
                        var n = new nnpoc.Network();
                        n.setData(childs[c].network);
                        nexts.push(n);
                        if (nexts.length >= this.options.population) {
                            break;
                        }
                    }
                }
                max++;
                if (max >= this.genomes.length - 1) {
                    max = 0;
                }
            }
            this.genomes = [];
            return nexts;
        };
        Neuroevolution.prototype.breed = function (g1, g2, nbChilds) {
            var datas = [];
            for (var nb = 0; nb < nbChilds; nb++) {
                var data = JSON.parse(JSON.stringify(g1));
                for (var i in g2.network.weights) {
                    if (Math.random() <= 0.5) {
                        data.network.weights[i] = g2.network.weights[i];
                    }
                }
                for (var i in data.network.weights) {
                    if (Math.random() <= this.options.mutationRate) {
                        data.network.weights[i] += Math.random() * this.options.mutationRange * 2 - this.options.mutationRange;
                    }
                }
                datas.push(data);
            }
            return datas;
        };
        Neuroevolution.prototype.networkScore = function (network, score) {
            this.genomes.push({
                network: network.getData(),
                score: score
            });
        };
        return Neuroevolution;
    }());
    nnpoc.Neuroevolution = Neuroevolution;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Neuron = (function () {
        function Neuron() {
        }
        Neuron.prototype.populate = function (nInputs, random) {
            if (!nInputs)
                return;
            this.edges = [];
            for (var i = 0; i < nInputs; i++) {
                var edge = new nnpoc.Edge();
                if (random)
                    edge.weight = random();
                else
                    edge.weight = 0;
                this.edges.push(edge);
            }
        };
        return Neuron;
    }());
    nnpoc.Neuron = Neuron;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    /** converts a value between min and max to value between 0 and 1 */
    function lerpInv(value, min, max) {
        return ((value || 0) - min) / (max - min);
    }
    nnpoc.lerpInv = lerpInv;
    /** converts a value between 0 and 1 to a value between min and max */
    function lerp(value, min, max) {
        return (value || 0) * (max - min) + min;
    }
    nnpoc.lerp = lerp;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Points = (function () {
        function Points() {
        }
        Points.createPoints2d = function (min, max, resolution) {
            var points = [];
            var step = Math.pow(2, -resolution);
            for (var x = min; x <= max; x += step) {
                for (var y = min; y <= max; y += step) {
                    points.push({ x: x, y: y });
                }
            }
            return points;
        };
        return Points;
    }());
    nnpoc.Points = Points;
})(nnpoc || (nnpoc = {}));
var nnviz;
(function (nnviz) {
    "use strict";
    var m = angular.module("nnviz", [
        'monospaced.mousewheel'
    ]);
})(nnviz || (nnviz = {}));
var nnviz;
(function (nnviz) {
    var NNEvoController = (function () {
        function NNEvoController($scope, $interval) {
            this.$scope = $scope;
            this.$interval = $interval;
            this.TargetFuncString = "2 * x^2 + sin(y)";
            this.Points = nnpoc.Points.createPoints2d(-1, 1, 3);
            this.Generations = 0;
            this.TargetFunc = Parser.parse(this.TargetFuncString).toJSFunction(["x", "y"]);
            this.Trainer = new nnpoc.FuncTrainer(this.TargetFunc, this.Points);
            this.Network = this.Trainer.getBest();
            this.initGraphs();
            this.updateGraphBounds();
            this.drawTarget();
            this.drawNetwork();
        }
        NNEvoController.prototype.initGraphs = function () {
            this.Graph3dTarget = nnpoc.Graph.init3d("graph3dTarget");
            this.Graph3dNetwork = nnpoc.Graph.init3d("graph3dNetwork");
            this.Graph2dTarget = nnpoc.Graph.initOverhead("graph2dTarget");
            this.Graph2dNetwork = nnpoc.Graph.initOverhead("graph2dNetwork");
            this.GraphNetwork = nnpoc.Graph.initNetwork("graphNetwork");
        };
        NNEvoController.prototype.updateGraphBounds = function () {
            nnpoc.Graph.SetBounds(this.Graph3dTarget, this.Trainer.FuncMin, this.Trainer.FuncMax);
            nnpoc.Graph.SetBounds(this.Graph3dNetwork, this.Trainer.FuncMin, this.Trainer.FuncMax);
        };
        NNEvoController.prototype.drawTarget = function () {
            var _this = this;
            var data = nnpoc.Graph.calcData(function (x, y) { return _this.TargetFunc(x, y); }, this.Points);
            var data2d = nnpoc.Graph.mapToDecision(data, 0, 1, -1);
            this.Graph3dTarget.setData(data);
            this.Graph2dTarget.setData(data2d);
        };
        NNEvoController.prototype.drawNetwork = function () {
            var data = nnpoc.Graph.calcNetworkDataExpand(this.Network, this.Points, this.Trainer.FuncMin, this.Trainer.FuncMax);
            var data2d = nnpoc.Graph.mapToDecision(data, 0, 1, -1);
            this.Graph3dNetwork.setData(data);
            this.Graph2dNetwork.setData(data2d);
            this.Network.calculate([0, 0]);
            this.GraphNetwork.setData(nnpoc.Graph.buildNodes(this.Network));
        };
        NNEvoController.prototype.reset = function () {
            this.Generations = 0;
            this.Trainer.reset();
            this.Network = this.Trainer.getBest();
            this.drawNetwork();
        };
        NNEvoController.prototype.updateFunc = function () {
            this.Errors = null;
            try {
                this.TargetFunc = Parser.parse(this.TargetFuncString).toJSFunction(["x", "y"]);
                this.TargetFunc(0, 0);
            }
            catch (ex) {
                this.TargetFunc = null;
                this.Errors = ex.message;
                return;
            }
            this.Trainer.setFunc(this.TargetFunc);
            this.updateGraphBounds();
            this.drawTarget();
            this.drawNetwork();
        };
        NNEvoController.prototype.train = function () {
            var _this = this;
            if (this.TrainStop) {
                this.$interval.cancel(this.TrainStop);
                this.TrainStop = undefined;
                return;
            }
            this.TrainStop = this.$interval(function () {
                _this.Generations++;
                _this.Trainer.train();
                _this.Network = _this.Trainer.getBest();
                _this.drawNetwork();
            }, 250);
        };
        NNEvoController.prototype.selectNetwork = function (network) {
            this.Network = network;
            this.drawNetwork();
        };
        return NNEvoController;
    }());
    nnviz.NNEvoController = NNEvoController;
    angular
        .module("nnviz")
        .controller("NNEvoController", NNEvoController);
})(nnviz || (nnviz = {}));
var nnviz;
(function (nnviz) {
    var NNInteractController = (function () {
        function NNInteractController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.NetworkOptions = {
                inputs: 2,
                hiddens: [2],
                outputs: 1,
                randomClamped: function () { return Math.round(((Math.random() * 2 - 1) * 4) * 10) / 10; }
            };
            this.TestInput = [0, 0];
            this.Points = nnpoc.Points.createPoints2d(-1, 1, 3);
            this.onGraphNetworkSelect = function (params) {
                if (params.edges && params.edges.length == 1) {
                    var edgeID = params.edges[0];
                    var ids = edgeID.split("_");
                    var layerIndex = parseInt(ids[0]);
                    var neuronIndex = parseInt(ids[1]);
                    var edgeIndex = parseInt(ids[2]);
                    _this.SelectedEdge = _this.Network.layers[layerIndex].neurons[neuronIndex].edges[edgeIndex];
                    _this.$scope.$apply();
                }
                else if (_this.SelectedEdge) {
                    _this.SelectedEdge = null;
                    _this.$scope.$apply();
                }
            };
            this.Network = new nnpoc.Network();
            this.initGraphs();
            this.randomize();
        }
        NNInteractController.prototype.initGraphs = function () {
            var _this = this;
            this.Graph3d = nnpoc.Graph.init3d("graph3d");
            this.Graph2dNormal = nnpoc.Graph.initOverhead("graph2dNormal");
            this.GraphNetwork = nnpoc.Graph.initNetwork("graphNetwork");
            this.GraphNetwork.on("select", function (params) {
                _this.onGraphNetworkSelect(params);
            });
        };
        NNInteractController.prototype.randomize = function () {
            this.Network.populate(this.NetworkOptions);
            this.redraw();
        };
        NNInteractController.prototype.redraw = function () {
            var data = nnpoc.Graph.calcNetworkData(this.Network, this.Points);
            var normal = nnpoc.Graph.mapToDecision(data, 0.5, 0.8, 0.2);
            this.Graph3d.setData(data);
            this.Graph2dNormal.setData(normal);
            this.Network.calculate(this.TestInput);
            this.GraphNetwork.setData(nnpoc.Graph.buildNodes(this.Network));
        };
        NNInteractController.prototype.onWheel = function ($event, $delta, $deltaX, $deltaY) {
            if (this.SelectedEdge) {
                this.SelectedEdge.weight += -0.1 * $deltaY;
                this.redraw();
            }
        };
        return NNInteractController;
    }());
    nnviz.NNInteractController = NNInteractController;
    angular
        .module("nnviz")
        .controller("NNInteractController", NNInteractController);
})(nnviz || (nnviz = {}));
//# sourceMappingURL=nnpoc.js.map