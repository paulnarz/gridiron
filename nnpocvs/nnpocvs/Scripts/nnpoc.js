var nnlunar;
(function (nnlunar) {
    (function (Keys) {
        Keys[Keys["BACKSPACE"] = 8] = "BACKSPACE";
        Keys[Keys["TAB"] = 9] = "TAB";
        Keys[Keys["ENTER"] = 13] = "ENTER";
        Keys[Keys["SHIFT"] = 16] = "SHIFT";
        Keys[Keys["CTRL"] = 17] = "CTRL";
        Keys[Keys["ALT"] = 18] = "ALT";
        Keys[Keys["PAUSE"] = 19] = "PAUSE";
        Keys[Keys["CAPS_LOCK"] = 20] = "CAPS_LOCK";
        Keys[Keys["ESCAPE"] = 27] = "ESCAPE";
        Keys[Keys["SPACE"] = 32] = "SPACE";
        Keys[Keys["PAGE_UP"] = 33] = "PAGE_UP";
        Keys[Keys["PAGE_DOWN"] = 34] = "PAGE_DOWN";
        Keys[Keys["END"] = 35] = "END";
        Keys[Keys["HOME"] = 36] = "HOME";
        Keys[Keys["LEFT_ARROW"] = 37] = "LEFT_ARROW";
        Keys[Keys["UP_ARROW"] = 38] = "UP_ARROW";
        Keys[Keys["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
        Keys[Keys["DOWN_ARROW"] = 40] = "DOWN_ARROW";
        Keys[Keys["INSERT"] = 45] = "INSERT";
        Keys[Keys["DELETE"] = 46] = "DELETE";
        Keys[Keys["KEY_0"] = 48] = "KEY_0";
        Keys[Keys["KEY_1"] = 49] = "KEY_1";
        Keys[Keys["KEY_2"] = 50] = "KEY_2";
        Keys[Keys["KEY_3"] = 51] = "KEY_3";
        Keys[Keys["KEY_4"] = 52] = "KEY_4";
        Keys[Keys["KEY_5"] = 53] = "KEY_5";
        Keys[Keys["KEY_6"] = 54] = "KEY_6";
        Keys[Keys["KEY_7"] = 55] = "KEY_7";
        Keys[Keys["KEY_8"] = 56] = "KEY_8";
        Keys[Keys["KEY_9"] = 57] = "KEY_9";
        Keys[Keys["KEY_A"] = 65] = "KEY_A";
        Keys[Keys["KEY_B"] = 66] = "KEY_B";
        Keys[Keys["KEY_C"] = 67] = "KEY_C";
        Keys[Keys["KEY_D"] = 68] = "KEY_D";
        Keys[Keys["KEY_E"] = 69] = "KEY_E";
        Keys[Keys["KEY_F"] = 70] = "KEY_F";
        Keys[Keys["KEY_G"] = 71] = "KEY_G";
        Keys[Keys["KEY_H"] = 72] = "KEY_H";
        Keys[Keys["KEY_I"] = 73] = "KEY_I";
        Keys[Keys["KEY_J"] = 74] = "KEY_J";
        Keys[Keys["KEY_K"] = 75] = "KEY_K";
        Keys[Keys["KEY_L"] = 76] = "KEY_L";
        Keys[Keys["KEY_M"] = 77] = "KEY_M";
        Keys[Keys["KEY_N"] = 78] = "KEY_N";
        Keys[Keys["KEY_O"] = 79] = "KEY_O";
        Keys[Keys["KEY_P"] = 80] = "KEY_P";
        Keys[Keys["KEY_Q"] = 81] = "KEY_Q";
        Keys[Keys["KEY_R"] = 82] = "KEY_R";
        Keys[Keys["KEY_S"] = 83] = "KEY_S";
        Keys[Keys["KEY_T"] = 84] = "KEY_T";
        Keys[Keys["KEY_U"] = 85] = "KEY_U";
        Keys[Keys["KEY_V"] = 86] = "KEY_V";
        Keys[Keys["KEY_W"] = 87] = "KEY_W";
        Keys[Keys["KEY_X"] = 88] = "KEY_X";
        Keys[Keys["KEY_Y"] = 89] = "KEY_Y";
        Keys[Keys["KEY_Z"] = 90] = "KEY_Z";
        Keys[Keys["LEFT_META"] = 91] = "LEFT_META";
        Keys[Keys["RIGHT_META"] = 92] = "RIGHT_META";
        Keys[Keys["SELECT"] = 93] = "SELECT";
        Keys[Keys["NUMPAD_0"] = 96] = "NUMPAD_0";
        Keys[Keys["NUMPAD_1"] = 97] = "NUMPAD_1";
        Keys[Keys["NUMPAD_2"] = 98] = "NUMPAD_2";
        Keys[Keys["NUMPAD_3"] = 99] = "NUMPAD_3";
        Keys[Keys["NUMPAD_4"] = 100] = "NUMPAD_4";
        Keys[Keys["NUMPAD_5"] = 101] = "NUMPAD_5";
        Keys[Keys["NUMPAD_6"] = 102] = "NUMPAD_6";
        Keys[Keys["NUMPAD_7"] = 103] = "NUMPAD_7";
        Keys[Keys["NUMPAD_8"] = 104] = "NUMPAD_8";
        Keys[Keys["NUMPAD_9"] = 105] = "NUMPAD_9";
        Keys[Keys["MULTIPLY"] = 106] = "MULTIPLY";
        Keys[Keys["ADD"] = 107] = "ADD";
        Keys[Keys["SUBTRACT"] = 109] = "SUBTRACT";
        Keys[Keys["DECIMAL"] = 110] = "DECIMAL";
        Keys[Keys["DIVIDE"] = 111] = "DIVIDE";
        Keys[Keys["F1"] = 112] = "F1";
        Keys[Keys["F2"] = 113] = "F2";
        Keys[Keys["F3"] = 114] = "F3";
        Keys[Keys["F4"] = 115] = "F4";
        Keys[Keys["F5"] = 116] = "F5";
        Keys[Keys["F6"] = 117] = "F6";
        Keys[Keys["F7"] = 118] = "F7";
        Keys[Keys["F8"] = 119] = "F8";
        Keys[Keys["F9"] = 120] = "F9";
        Keys[Keys["F10"] = 121] = "F10";
        Keys[Keys["F11"] = 122] = "F11";
        Keys[Keys["F12"] = 123] = "F12";
        Keys[Keys["NUM_LOCK"] = 144] = "NUM_LOCK";
        Keys[Keys["SCROLL_LOCK"] = 145] = "SCROLL_LOCK";
        Keys[Keys["SEMICOLON"] = 186] = "SEMICOLON";
        Keys[Keys["EQUALS"] = 187] = "EQUALS";
        Keys[Keys["COMMA"] = 188] = "COMMA";
        Keys[Keys["DASH"] = 189] = "DASH";
        Keys[Keys["PERIOD"] = 190] = "PERIOD";
        Keys[Keys["FORWARD_SLASH"] = 191] = "FORWARD_SLASH";
        Keys[Keys["GRAVE_ACCENT"] = 192] = "GRAVE_ACCENT";
        Keys[Keys["OPEN_BRACKET"] = 219] = "OPEN_BRACKET";
        Keys[Keys["BACK_SLASH"] = 220] = "BACK_SLASH";
        Keys[Keys["CLOSE_BRACKET"] = 221] = "CLOSE_BRACKET";
        Keys[Keys["SINGLE_QUOTE"] = 222] = "SINGLE_QUOTE";
    })(nnlunar.Keys || (nnlunar.Keys = {}));
    var Keys = nnlunar.Keys;
})(nnlunar || (nnlunar = {}));
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
            this.crashed = 0;
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
            this.scale = 1;
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
            this.scale = 0.7;
            this.thrustBuild = 0;
            this.bouncing = 0;
            this.landed = false;
            this.crashed = 0;
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
        Lander.prototype.crash = function (crash) {
            //console.log("crash", this.pos.toString(), this.vel.toString(), this.rotation);         
            this.landed = false;
            this.crashed = crash;
            this.active = false;
            this.exploding = true;
            this.explodingCounter = 0;
            this.thrustBuild = 0;
        };
        Lander.prototype.land = function () {
            //console.log("land", this.pos.toString(), this.vel.toString(), this.rotation);
            this.landed = true;
            this.crashed = 0;
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
    var Landscape = (function () {
        function Landscape() {
            this.points = [];
            this.lines = [];
            this.stars = [];
            this.availableZones = [];
            this.zoneCombis = [];
            this.currentCombi = 0;
            this.zoneInfos = [];
            this.landscale = 1.75;
            this.flickerProgress = 0;
            this.counter = 0;
            this.setupData();
            this.rightedge = this.tileWidth = this.points[this.points.length - 1].x * this.landscale;
            for (var i = 0; i < this.points.length; i++) {
                var p = this.points[i];
                p.x *= this.landscale;
                p.y *= this.landscale;
                p.y -= this.landscale * 250;
            }
            for (var i = 1; i < this.points.length; i++) {
                var p1 = this.points[i - 1];
                var p2 = this.points[i];
                this.lines.push(new LandscapeLine(p1, p2));
            }
            for (var i = 0; i < this.lines.length; i++) {
                if (Math.random() < 0.1) {
                    var line = this.lines[i];
                    var star = {
                        x: line.p1.x,
                        y: Math.random() * 600
                    };
                    if ((star.y < line.p1.y) && (star.y < line.p2.y)) {
                        this.stars.push(star);
                    }
                }
            }
        }
        Landscape.prototype.render = function (c, view) {
            var offset = 0;
            while (view.left - offset > this.rightedge) {
                offset += this.rightedge;
            }
            while (view.left - offset < 0) {
                offset -= this.rightedge;
            }
            var startOffset = offset;
            var i = 0;
            while (this.lines[i].p2.x + offset < view.left) {
                i++;
                if (i > this.lines.length) {
                    i = 0;
                    offset += this.rightedge;
                }
            }
            c.beginPath();
            var line = this.lines[i];
            var offsetY = 0;
            if (Math.random() < 0.3) {
                offset += (0.2 / view.scale);
                offsetY = (0.2 / view.scale);
            }
            c.moveTo(line.p1.x + offset, line.p1.y + offsetY);
            var zoneInfoIndex = 0;
            while ((line = this.lines[i]).p1.x + offset < view.right) {
                var point = line.p2;
                c.lineTo(point.x + offset, point.y);
                if ((this.counter % 20 > 10) && (line.multiplier != 1)) {
                    var infoBox;
                    if (!this.zoneInfos[zoneInfoIndex]) {
                        infoBox = this.zoneInfos[zoneInfoIndex] = new InfoBox(1, 50);
                        document.body.appendChild(infoBox.domElement);
                    }
                    else {
                        infoBox = this.zoneInfos[zoneInfoIndex];
                        infoBox.show();
                    }
                    infoBox.setText(line.multiplier + 'x');
                    infoBox.setX(((((line.p2.x - line.p1.x) / 2) + line.p1.x + offset) * view.scale) + view.x);
                    infoBox.setY(((line.p2.y + 2) * view.scale) + view.y);
                    zoneInfoIndex++;
                }
                i++;
                if (i >= this.lines.length) {
                    i = 0;
                    offset += this.rightedge;
                }
            }
            var flickerAmount = Math.sin(this.counter * 0.8) * 0.5 + 0.5;
            if (flickerAmount > 0.5) {
                c.lineWidth = 2 / view.scale;
                var channel = Math.round((flickerAmount - 0.5) * (100));
                c.strokeStyle = "rgb(" + channel + "," + channel + "," + channel + ")";
                c.stroke();
            }
            c.strokeStyle = 'white';
            c.lineWidth = 1 / view.scale * (flickerAmount * 0.2 + 0.8);
            c.lineJoin = 'bevel';
            c.stroke();
            for (var i = zoneInfoIndex; i < this.zoneInfos.length; i++) {
                this.zoneInfos[i].hide();
            }
            i = 0;
            offset = startOffset;
            while (this.stars[i].x + offset < view.left) {
                i++;
                if (i >= this.stars.length) {
                    i = 0;
                    offset += this.rightedge;
                }
            }
            c.beginPath();
            var star;
            while ((star = this.stars[i]).x + offset < view.right) {
                var starx = star.x + offset;
                var stary = star.y;
                while (view.bottom < stary)
                    stary -= 600;
                c.rect(starx, stary, (1 / view.scale), (1 / view.scale));
                if (stary - 600 > view.top) {
                    stary -= 600;
                    c.rect(starx, stary, (1 / view.scale), (1 / view.scale));
                }
                i++;
                if (i >= this.stars.length) {
                    i = 0;
                    offset += this.rightedge;
                }
            }
            c.stroke();
        };
        Landscape.prototype.setZones = function () {
            for (var i = 0; i < this.lines.length; i++) {
                this.lines[i].multiplier = 1;
            }
            var combi = this.zoneCombis[this.currentCombi];
            for (var i = 0; i < combi.length; i++) {
                var zonenumber = combi[i];
                var zone = this.availableZones[zonenumber];
                var line = this.lines[zone.lineNum];
                line.multiplier = zone.multiplier;
            }
            this.currentCombi++;
            if (this.currentCombi >= this.zoneCombis.length)
                this.currentCombi = 0;
        };
        Landscape.prototype.checkLanderscapeCollision = function (lander) {
            var lines = this.lines, right = lander.right % this.tileWidth, left = lander.left % this.tileWidth;
            while (right < 0) {
                right += this.tileWidth;
                left += this.tileWidth;
            }
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                if (!((right < line.p1.x) || (left > line.p2.x))) {
                    lander.altitude = line.p1.y - lander.bottom;
                    //if (line.landable) {
                    //    if (lander.bottom >= line.p1.y) {
                    //        if ((left > line.p1.x) && (right < line.p2.x)) {
                    //            if ((lander.rotation == 0) && (lander.vel.y < 0.15)) {
                    //                setLanded(line);
                    //            } else {
                    //                setCrashed();
                    //            }
                    //        } else {
                    //            setCrashed();
                    //        }
                    //    }
                    //} else
                    if ((lander.bottom > line.p2.y) || (lander.bottom > line.p1.y)) {
                        lander.bottomRight.x = right;
                        lander.bottomLeft.x = left;
                        if (this.pointIsLessThanLine(lander.bottomLeft, line.p1, line.p2) || this.pointIsLessThanLine(lander.bottomRight, line.p1, line.p2)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        Landscape.prototype.pointIsLessThanLine = function (point, linepoint1, linepoint2) {
            var dist = (point.x - linepoint1.x) / (linepoint2.x - linepoint1.x);
            var yhitpoint = linepoint1.y + ((linepoint2.y - linepoint1.y) * dist);
            return ((dist > 0) && (dist < 1) && (yhitpoint <= point.y));
        };
        Landscape.prototype.setupData = function () {
            var points = this.points;
            var availableZones = this.availableZones;
            var zoneCombis = this.zoneCombis;
            points.push(new nnlunar.Vector2(0.5, 355.55));
            points.push(new nnlunar.Vector2(5.45, 355.55));
            points.push(new nnlunar.Vector2(6.45, 359.4));
            points.push(new nnlunar.Vector2(11.15, 359.4));
            points.push(new nnlunar.Vector2(12.1, 363.65));
            points.push(new nnlunar.Vector2(14.6, 363.65));
            points.push(new nnlunar.Vector2(15.95, 375.75));
            points.push(new nnlunar.Vector2(19.25, 388));
            points.push(new nnlunar.Vector2(19.25, 391.9));
            points.push(new nnlunar.Vector2(21.65, 400));
            points.push(new nnlunar.Vector2(28.85, 404.25));
            points.push(new nnlunar.Vector2(30.7, 412.4));
            points.push(new nnlunar.Vector2(33.05, 416.7));
            points.push(new nnlunar.Vector2(37.9, 420.5));
            points.push(new nnlunar.Vector2(42.7, 420.5));
            points.push(new nnlunar.Vector2(47.4, 416.65));
            points.push(new nnlunar.Vector2(51.75, 409.5));
            points.push(new nnlunar.Vector2(56.55, 404.25));
            points.push(new nnlunar.Vector2(61.3, 400));
            points.push(new nnlunar.Vector2(63.65, 396.15));
            points.push(new nnlunar.Vector2(68, 391.9));
            points.push(new nnlunar.Vector2(70.3, 388));
            points.push(new nnlunar.Vector2(75.1, 386.1));
            points.push(new nnlunar.Vector2(79.85, 379.95));
            points.push(new nnlunar.Vector2(84.7, 378.95));
            points.push(new nnlunar.Vector2(89.05, 375.65));
            points.push(new nnlunar.Vector2(93.75, 375.65));
            points.push(new nnlunar.Vector2(98.5, 376.55));
            points.push(new nnlunar.Vector2(103.2, 379.95));
            points.push(new nnlunar.Vector2(104.3, 383.8));
            points.push(new nnlunar.Vector2(107.55, 388));
            points.push(new nnlunar.Vector2(108.95, 391.9));
            points.push(new nnlunar.Vector2(112.4, 396.15));
            points.push(new nnlunar.Vector2(113.3, 400));
            points.push(new nnlunar.Vector2(117.1, 404.25));
            points.push(new nnlunar.Vector2(121.95, 404.25));
            points.push(new nnlunar.Vector2(125.3, 396.3));
            points.push(new nnlunar.Vector2(128.6, 394.2));
            points.push(new nnlunar.Vector2(132.45, 396.15));
            points.push(new nnlunar.Vector2(135.75, 399.9));
            points.push(new nnlunar.Vector2(138.15, 408.15));
            points.push(new nnlunar.Vector2(144.7, 412.4));
            points.push(new nnlunar.Vector2(146.3, 424.8));
            points.push(new nnlunar.Vector2(149.55, 436.65));
            points.push(new nnlunar.Vector2(149.55, 441.05));
            points.push(new nnlunar.Vector2(154.35, 444.85));
            points.push(new nnlunar.Vector2(163.45, 444.85));
            points.push(new nnlunar.Vector2(168.15, 441.05));
            points.push(new nnlunar.Vector2(172.95, 436.75));
            points.push(new nnlunar.Vector2(175.45, 432.9));
            points.push(new nnlunar.Vector2(179.7, 428.6));
            points.push(new nnlunar.Vector2(181.95, 424.8));
            points.push(new nnlunar.Vector2(186.7, 422.5));
            points.push(new nnlunar.Vector2(189.15, 412.4));
            points.push(new nnlunar.Vector2(191.55, 404.35));
            points.push(new nnlunar.Vector2(196.35, 402.4));
            points.push(new nnlunar.Vector2(200.7, 398.1));
            points.push(new nnlunar.Vector2(205.45, 391.9));
            points.push(new nnlunar.Vector2(210.15, 383.8));
            points.push(new nnlunar.Vector2(212.55, 375.75));
            points.push(new nnlunar.Vector2(216.85, 371.8));
            points.push(new nnlunar.Vector2(219.3, 367.55));
            points.push(new nnlunar.Vector2(220.65, 363.65));
            points.push(new nnlunar.Vector2(224, 359.4));
            points.push(new nnlunar.Vector2(228.8, 359.4));
            points.push(new nnlunar.Vector2(233.55, 355.55));
            points.push(new nnlunar.Vector2(237.85, 348.45));
            points.push(new nnlunar.Vector2(242.65, 343.2));
            points.push(new nnlunar.Vector2(245, 335.15));
            points.push(new nnlunar.Vector2(247.35, 322.8));
            points.push(new nnlunar.Vector2(247.3, 314.5));
            points.push(new nnlunar.Vector2(248.35, 306.55));
            points.push(new nnlunar.Vector2(252.2, 296.5));
            points.push(new nnlunar.Vector2(256.55, 294.55));
            points.push(new nnlunar.Vector2(257.95, 290.4));
            points.push(new nnlunar.Vector2(261.25, 285.95));
            points.push(new nnlunar.Vector2(265.95, 285.95));
            points.push(new nnlunar.Vector2(267, 290.25));
            points.push(new nnlunar.Vector2(271.75, 290.25));
            points.push(new nnlunar.Vector2(273.25, 294.55));
            points.push(new nnlunar.Vector2(275.2, 294.55));
            points.push(new nnlunar.Vector2(278.95, 296.5));
            points.push(new nnlunar.Vector2(282.25, 300.3));
            points.push(new nnlunar.Vector2(284.7, 308.45));
            points.push(new nnlunar.Vector2(291.85, 312.65));
            points.push(new nnlunar.Vector2(298.55, 330.8));
            points.push(new nnlunar.Vector2(303.25, 331.8));
            points.push(new nnlunar.Vector2(308, 335.05));
            points.push(new nnlunar.Vector2(309, 338.9));
            points.push(new nnlunar.Vector2(312.35, 343.2));
            points.push(new nnlunar.Vector2(313.8, 347.05));
            points.push(new nnlunar.Vector2(317.05, 351.4));
            points.push(new nnlunar.Vector2(321.9, 351.4));
            points.push(new nnlunar.Vector2(322.85, 363.8));
            points.push(new nnlunar.Vector2(326.6, 375.75));
            points.push(new nnlunar.Vector2(326.6, 379.95));
            points.push(new nnlunar.Vector2(330.9, 379.95));
            points.push(new nnlunar.Vector2(332.4, 383.8));
            points.push(new nnlunar.Vector2(335.8, 388));
            points.push(new nnlunar.Vector2(338.1, 396.15));
            points.push(new nnlunar.Vector2(340.45, 400.1));
            points.push(new nnlunar.Vector2(345.3, 404.25));
            points.push(new nnlunar.Vector2(346.25, 416.65));
            points.push(new nnlunar.Vector2(349.6, 428.7));
            points.push(new nnlunar.Vector2(349.6, 432.85));
            points.push(new nnlunar.Vector2(350.95, 436.75));
            points.push(new nnlunar.Vector2(354.3, 441.05));
            points.push(new nnlunar.Vector2(359, 441.05));
            points.push(new nnlunar.Vector2(361.4, 449.1));
            points.push(new nnlunar.Vector2(363.95, 453));
            points.push(new nnlunar.Vector2(368.2, 457.2));
            points.push(new nnlunar.Vector2(372.9, 461));
            points.push(new nnlunar.Vector2(410.2, 461));
            points.push(new nnlunar.Vector2(412.55, 449.1));
            points.push(new nnlunar.Vector2(417.4, 441.05));
            points.push(new nnlunar.Vector2(419.7, 432.9));
            points.push(new nnlunar.Vector2(422.05, 432.9));
            points.push(new nnlunar.Vector2(425.45, 424.8));
            points.push(new nnlunar.Vector2(428.8, 422.35));
            points.push(new nnlunar.Vector2(433.45, 416.65));
            points.push(new nnlunar.Vector2(438.25, 415.15));
            points.push(new nnlunar.Vector2(442.6, 412.4));
            points.push(new nnlunar.Vector2(447.4, 412.4));
            points.push(new nnlunar.Vector2(448.8, 416.65));
            points.push(new nnlunar.Vector2(454.55, 430.55));
            points.push(new nnlunar.Vector2(455.5, 434.8));
            points.push(new nnlunar.Vector2(459.25, 438.6));
            points.push(new nnlunar.Vector2(462.6, 440.9));
            points.push(new nnlunar.Vector2(466, 444.85));
            points.push(new nnlunar.Vector2(468.35, 452.9));
            points.push(new nnlunar.Vector2(475.55, 457.3));
            points.push(new nnlunar.Vector2(484.7, 457.3));
            points.push(new nnlunar.Vector2(494.7, 458.2));
            points.push(new nnlunar.Vector2(503.75, 461.1));
            points.push(new nnlunar.Vector2(522.2, 461.1));
            points.push(new nnlunar.Vector2(524.75, 453));
            points.push(new nnlunar.Vector2(527.1, 441.05));
            points.push(new nnlunar.Vector2(527.1, 432.9));
            points.push(new nnlunar.Vector2(531.9, 432.9));
            points.push(new nnlunar.Vector2(534.15, 424.8));
            points.push(new nnlunar.Vector2(538.6, 420.5));
            points.push(new nnlunar.Vector2(540.9, 416.65));
            points.push(new nnlunar.Vector2(542.35, 412.5));
            points.push(new nnlunar.Vector2(545.7, 408));
            points.push(new nnlunar.Vector2(550.45, 408));
            points.push(new nnlunar.Vector2(552.85, 398.1));
            points.push(new nnlunar.Vector2(554.75, 389.95));
            points.push(new nnlunar.Vector2(559.55, 388));
            points.push(new nnlunar.Vector2(564.35, 391.9));
            points.push(new nnlunar.Vector2(573.35, 391.9));
            points.push(new nnlunar.Vector2(578.1, 388));
            points.push(new nnlunar.Vector2(579.55, 379.95));
            points.push(new nnlunar.Vector2(582.9, 369.4));
            points.push(new nnlunar.Vector2(587.75, 367.55));
            points.push(new nnlunar.Vector2(588.65, 363.8));
            points.push(new nnlunar.Vector2(592.05, 359.5));
            points.push(new nnlunar.Vector2(596.85, 355.55));
            availableZones.push(new LandingZone(0, 4));
            availableZones.push(new LandingZone(13, 3));
            availableZones.push(new LandingZone(25, 4));
            availableZones.push(new LandingZone(34, 4));
            availableZones.push(new LandingZone(63, 5));
            availableZones.push(new LandingZone(75, 4));
            availableZones.push(new LandingZone(106, 5));
            availableZones.push(new LandingZone(111, 2));
            availableZones.push(new LandingZone(121, 5));
            availableZones.push(new LandingZone(133, 2));
            availableZones.push(new LandingZone(148, 3));
            zoneCombis.push([2, 3, 7, 9]);
            zoneCombis.push([7, 8, 9, 10]);
            zoneCombis.push([2, 3, 7, 9]);
            zoneCombis.push([1, 4, 7, 9]);
            zoneCombis.push([0, 5, 7, 9]);
            zoneCombis.push([6, 7, 8, 9]);
            zoneCombis.push([1, 4, 7, 9]);
        };
        return Landscape;
    }());
    nnlunar.Landscape = Landscape;
    var LandscapeLine = (function () {
        function LandscapeLine(p1, p2) {
            this.p1 = p1;
            this.p2 = p2;
            this.landable = (p1.y == p2.y);
            this.multiplier = 1;
        }
        return LandscapeLine;
    }());
    var LandingZone = (function () {
        function LandingZone(lineNum, multi) {
            this.lineNum = lineNum;
            this.multiplier = multi;
        }
        return LandingZone;
    }());
    var InfoBox = (function () {
        function InfoBox(align, width) {
            this.align = align;
            this.width = width;
        }
        InfoBox.prototype.hide = function () {
        };
        return InfoBox;
    }());
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
            this.discreteThurst = false;
            this.world = {
                x: 0,
                y: 0,
                width: 800,
                height: 800,
                floor: 500,
            };
            this.start = {
                x: -250,
                y: -250,
                rotation: 0,
                fuel: 1000
            };
            this.target = {
                x: -50,
                y: 245,
                width: 30,
                height: 5,
                minVel: 0.15,
                minAng: 1
            };
            this.wall = undefined;
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
            this.simDelay = 10;
            this.simDisplay = 0;
            this.simColor = "#7F7F7F";
            this.updateTimeStep = 2.50;
            this.bestDisplay = 5;
            this.bestColor = "#FFFFFF";
            this.bestExtraTime = 3000;
            this.logSimTime = false;
            this.logRenderTime = false;
            this.watch = undefined;
            //fitness
            this.evoOptions = {
                population: 100,
                elitism: 0.2,
                randomBehaviour: 0.2,
                mutationRate: 0.2,
                mutationRange: 0.5,
                nbChild: 2,
                network: {
                    inputs: 8,
                    hiddens: [8, 8],
                    outputs: 2,
                    randomClamped: function () { return Math.random() * 8 - 4; }
                }
            };
            //state        
            this.SCREEN_WIDTH = window.innerWidth;
            this.SCREEN_HEIGHT = window.innerHeight;
            this.bestTime = 0;
            this.lastSimTime = Date.now();
            this.lastRenderTime = Date.now();
            this.updateTime = 0;
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
            this.simulate = function () {
                var start = Date.now();
                var elapsed = start - _this.lastSimTime;
                _this.lastSimTime = start;
                setTimeout(_this.simulate, _this.simDelay);
                var sims = 0;
                while (Date.now() - start < _this.simDelay) {
                    if (!_this.updateLanders(_this.evoLanders, _this.evoNetworks, _this.evo)) {
                        _this.evolve();
                        _this.resetLanders(_this.evoLanders, _this.evoNetworks);
                        if (!_this.bestLanders)
                            _this.bestLanders = [];
                    }
                    sims++;
                }
                if (_this.logSimTime) {
                    var simTime = Date.now() - start;
                    console.log({
                        start: start,
                        elapsed: elapsed,
                        simTime: simTime,
                        sims: sims
                    });
                }
                if (_this.watch) {
                    console.log(_this.watch());
                }
            };
            this.updateLanders = function (landers, networks, evo) {
                var activeLanders = false;
                var tleft = _this.target.x - _this.target.width / 2;
                var tright = _this.target.x + _this.target.width / 2;
                var ttop = _this.target.y - _this.target.height / 2;
                for (var i = 0, len = landers.length; i < len; i++) {
                    var l = landers[i];
                    if (l.active) {
                        _this.calcFunc(l, networks[i]);
                    }
                    var bp = l.bottom;
                    l.update();
                    if (l.active) {
                        //check collision
                        if (l.bottom >= ttop
                            && bp < ttop
                            && l.left > tleft
                            && l.right < tright) {
                            if ((Math.abs(l.rotation) <= _this.target.minAng) && (l.vel.y <= _this.target.minVel)) {
                                l.land();
                            }
                            else {
                                l.crash(1);
                            }
                        }
                        else if (_this.landscape.checkLanderscapeCollision(l)) {
                            l.crash(1);
                        }
                        else if (l.bottom >= _this.world.floor) {
                            l.crash(1);
                        }
                        else if (_this.wall) {
                            if (l.right > _this.wall.left
                                && l.left < _this.wall.right
                                && l.bottom > _this.wall.top
                                && l.top < _this.wall.bottom) {
                                l.crash(1);
                            }
                        }
                        if (evo && !l.active) {
                            var score = _this.scoreFunc(l);
                            _this.stats.scores.push({
                                score: score,
                                landed: l.landed,
                                crashed: !!l.crashed,
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
            this.render = function () {
                var start = Date.now();
                var elapsed = start - _this.lastRenderTime;
                _this.updateTime += elapsed;
                var updates = 0;
                while (_this.updateTime > _this.updateTimeStep) {
                    updates++;
                    _this.update();
                    _this.updateTime -= _this.updateTimeStep;
                }
                requestAnimationFrame(_this.render);
                var c = _this.context;
                var view = _this.view;
                c.clearRect(0, 0, _this.SCREEN_WIDTH, _this.SCREEN_HEIGHT);
                c.save();
                c.translate(view.x, view.y);
                c.scale(view.scale, view.scale);
                _this.landscape.render(c, view);
                //draw start
                c.strokeStyle = "#00FF00";
                c.beginPath();
                c.arc(_this.start.x, _this.start.y, 1, 0, 90);
                c.stroke();
                //draw langscape
                if (_this.wall) {
                    c.strokeStyle = "#FFFFFF";
                    c.lineWidth = 1;
                    c.beginPath();
                    c.moveTo(_this.wall.left, _this.wall.top);
                    c.lineTo(_this.wall.right, _this.wall.top);
                    c.lineTo(_this.wall.right, _this.wall.bottom);
                    c.lineTo(_this.wall.left, _this.wall.bottom);
                    c.closePath();
                    c.stroke();
                }
                c.strokeStyle = "#FFFFFF";
                c.beginPath();
                c.moveTo(_this.view.left, _this.world.floor);
                c.lineTo(_this.view.right, _this.world.floor);
                c.stroke();
                c.fillStyle = c.strokeStyle = "#00FF00";
                c.fillRect(_this.target.x - _this.target.width / 2, _this.target.y - _this.target.height / 2, _this.target.width, _this.target.height);
                for (var i = 0, len = Math.min(_this.evoLanders.length, _this.simDisplay); i < len; i++) {
                    _this.renderer.render(_this.evoLanders[i], c, view.scale, _this.simColor);
                }
                if (_this.bestLanders) {
                    for (var i = 0, len = Math.min(_this.bestLanders.length, _this.bestDisplay); i < len; i++) {
                        _this.renderer.render(_this.bestLanders[i], c, view.scale, _this.bestColor);
                    }
                }
                c.restore();
                if (_this.logRenderTime) {
                    var renderTime = Date.now() - start;
                    console.log({
                        noww: Date.now(),
                        elapsed: start - _this.lastRenderTime,
                        renderTime: renderTime,
                        updates: updates
                    });
                }
                _this.lastRenderTime = Date.now();
            };
            this.resizeGame = function () {
                var newWidth = window.innerWidth;
                var newHeight = window.innerHeight;
                if ((_this.SCREEN_WIDTH == newWidth) && (_this.SCREEN_HEIGHT == newHeight))
                    return;
                _this.SCREEN_WIDTH = _this.canvas.width = newWidth;
                _this.SCREEN_HEIGHT = _this.canvas.height = newHeight;
                _this.updateView();
            };
            this.onKeyDown = function (ev) {
                //console.log(ev.keyCode, Keys[ev.keyCode]);
                if (ev.keyCode == nnlunar.Keys.SPACE)
                    _this.resetBest();
                else if (ev.keyCode == nnlunar.Keys.EQUALS)
                    _this.updateTimeStep /= 2;
                else if (ev.keyCode == nnlunar.Keys.DASH)
                    _this.updateTimeStep *= 2;
                else if (ev.keyCode == nnlunar.Keys.KEY_Q)
                    _this.simDisplay = _this.simDisplay ? 0 : _this.evoLanders.length;
            };
            this.onMouseDown = function (ev) {
                var pos = _this.getMousePos(ev);
                var tleft = _this.target.x - _this.target.width / 2;
                var tright = _this.target.x + _this.target.width / 2;
                var ttop = _this.target.y - _this.target.height / 2;
                var tbottom = _this.target.y + _this.target.height / 2;
                if (pos.x > tleft && pos.x < tright && pos.y > ttop && pos.y < tbottom)
                    _this.dragging = _this.target;
            };
            this.onMouseMove = function (ev) {
                if (_this.dragging) {
                    var pos = _this.getMousePos(ev);
                    _this.dragging.x = pos.x;
                    _this.dragging.y = pos.y;
                }
            };
            this.onMouseUp = function (ev) {
                _this.dragging = null;
            };
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
            document.body.appendChild(this.canvas);
            this.canvas.width = this.SCREEN_WIDTH;
            this.canvas.height = this.SCREEN_HEIGHT;
            this.canvas.style.backgroundColor = "#000000";
            this.updateView();
            window.addEventListener('resize', this.resizeGame);
            window.addEventListener('orientationchange', this.resizeGame);
            this.canvas.addEventListener('mousedown', this.onMouseDown);
            this.canvas.addEventListener('mousemove', this.onMouseMove);
            this.canvas.addEventListener('mouseup', this.onMouseUp);
            document.addEventListener('keydown', this.onKeyDown);
            this.renderer = new nnlunar.LanderRenderer();
            this.landscape = new nnlunar.Landscape();
            this.evo = new nnpoc.Neuroevolution(this.evoOptions);
            this.evoLanders = [];
            this.bestNetworks = [];
            this.evolve();
            this.resetLanders(this.evoLanders, this.evoNetworks);
            this.simulate();
            this.render();
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
                nnpoc.lerpInv(l.pos.x, 0, this.world.width),
                nnpoc.lerpInv(l.pos.y, 0, this.world.height),
                nnpoc.lerpInv(this.target.x - l.pos.x, 0, this.world.width),
                nnpoc.lerpInv(this.target.y - l.pos.y, 0, this.world.height),
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
            var dx = (l.pos.x - this.target.x) / this.world.width;
            var dy = (l.pos.y - this.target.y) / this.world.height;
            var dvy = l.vel.y / 0.35;
            var dr = l.rotation / 90;
            var df = (this.start.fuel - l.fuel) / this.start.fuel;
            score += l.crashed; // * 32;
            score += dx * dx; // * 8;
            score += dy * dy; // * 8;
            score += dvy * dvy; // * 2;
            score += dr * dr; // * 2;
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
        LunarGameRaw.prototype.update = function () {
            if (!this.bestLanders)
                return;
            var stillActive = this.updateLanders(this.bestLanders, this.bestNetworks, undefined);
            if (!stillActive) {
                if (!this.bestTime) {
                    this.bestTime = Date.now();
                }
                if (this.bestLanders.length == 0 || this.bestLanders[0].crashed || Date.now() - this.bestTime > this.bestExtraTime) {
                    this.resetBest();
                }
            }
        };
        LunarGameRaw.prototype.resetBest = function () {
            this.getBest(this.evoNetworks, this.bestNetworks, this.bestDisplay);
            this.resetLanders(this.bestLanders, this.bestNetworks);
            this.bestTime = 0;
        };
        LunarGameRaw.prototype.updateView = function () {
            this.view.scale = this.SCREEN_HEIGHT / this.world.height;
            this.view.x = -this.world.x * this.view.scale + this.SCREEN_WIDTH / 2;
            this.view.y = -this.world.y * this.view.scale + this.SCREEN_HEIGHT / 2;
            this.view.left = -this.view.x / this.view.scale;
            this.view.top = -this.view.y / this.view.scale;
            this.view.right = this.view.left + (this.SCREEN_WIDTH / this.view.scale);
            this.view.bottom = this.view.top + (this.SCREEN_HEIGHT / this.view.scale);
            this.canvasRect = this.canvas.getBoundingClientRect();
        };
        LunarGameRaw.prototype.getMousePos = function (ev) {
            if (!this.canvasRect)
                this.canvasRect = this.canvas.getBoundingClientRect();
            var x = (ev.clientX - this.canvasRect.left - this.view.x) / this.view.scale;
            var y = (ev.clientY - this.canvasRect.top - this.view.y) / this.view.scale;
            return new nnlunar.Vector2(x, y);
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