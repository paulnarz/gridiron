﻿module nnlunar {
    export class LunarGameRaw {
        //world       
        discreteThurst = false;
        world = {
            x: 0,
            y: 0,
            width: 800,
            height: 800,
            floor: 500,
        }
        start = {
            x: -250,
            y: -250,
            rotation: 0,
            fuel: 1000
        };
        target = {
            x: -50,
            y: 245,
            width: 30,
            height: 5,
            minVel: 0.15,
            minAng: 1
        };
        wall: Rectangle = undefined;
        view: View = {
            x: 0,
            y: 0,
            scale: 1,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };

        //display/debug                
        simDelay = 10;        
        simDisplay = 0;
        simColor = "#7F7F7F";
        updateTimeStep = 2.50;
        bestDisplay = 5;
        bestColor = "#FFFFFF";
        bestExtraTime = 3000;
        logSimTime = false;
        logRenderTime = false;
        watch: () => void = undefined;
        statFunc(l: Lander): any {
            return {
                x: l.pos.x,
                y: l.pos.y,
                r: l.rotation,
                f: l.fuel,
                vx: l.vel.x,
                vy: l.vel.y,
            }
        }

        //fitness
        evoOptions: nnpoc.NeuroevolutionOptions = {
            population: 100,
            elitism: 0.2,
            randomBehaviour: 0.2,
            mutationRate: 0.2,
            mutationRange: 0.5,
            nbChild: 2,
            network: {
                inputs: 8,
                hiddens: [ 8, 8 ],
                outputs: 2,
                randomClamped: () => { return Math.random() * 8 - 4; }
            }
        };

        calcFunc(l: Lander, n: nnpoc.Network): void {
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
        }

        scoreFunc(l: Lander): number {
            var score = 0;
            var dx = (l.pos.x - this.target.x) / this.world.width;
            var dy = (l.pos.y - this.target.y) / this.world.height;
            var dvy = l.vel.y / 0.35;
            var dr = l.rotation / 90;
            var df = (this.start.fuel - l.fuel) / this.start.fuel;

            score += l.crashed;// * 32;
            score += dx * dx;// * 8;
            score += dy * dy;// * 8;
            score += dvy * dvy;// * 2;
            score += dr * dr;// * 2;
            score += df * df;
            return score;
        }

        //state        
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        canvasRect: ClientRect;
        dragging: any;        
        bestTime = 0;
        lastSimTime = Date.now();
        lastRenderTime = Date.now();
        updateTime = 0;
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        renderer: LanderRenderer;
        landscape: Landscape;
        evo: nnpoc.Neuroevolution;
        evoLanders: Lander[];
        evoNetworks: nnpoc.Network[];
        bestLanders: Lander[];
        bestNetworks: nnpoc.Network[];
        stats = {
            generations: 0,
            landed: 0,
            best: 0,
            average: 0,
            population: 0,
            crashed: 0,
            worst: 0,
            scores: [] as {
                score: number,
                landed: boolean,
                crashed: boolean,
                data: {}
            }[]
        };

        constructor() {
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

            this.renderer = new LanderRenderer();
            this.landscape = new Landscape();
            this.evo = new nnpoc.Neuroevolution(this.evoOptions);
            this.evoLanders = [];
            this.bestNetworks = [];
            this.evolve();
            this.resetLanders(this.evoLanders, this.evoNetworks);

            this.simulate();
            this.render();
        }

        evolve(): void {
            this.stats.scores.sort((a, b) => { return a.score - b.score; });
            this.stats.landed = 0;
            this.stats.crashed = 0;
            this.stats.best = Infinity;
            this.stats.worst = -Infinity;
            this.stats.average = 0;
            this.stats.population = this.stats.scores.length;

            this.stats.scores.forEach(s => {
                if (s.landed)
                    this.stats.landed++;
                if (s.crashed)
                    this.stats.crashed++;
                if (this.stats.best > s.score)
                    this.stats.best = s.score;
                if (this.stats.worst < s.score)
                    this.stats.worst = s.score;
                this.stats.average += s.score;
            });

            if (this.stats.scores.length > 0)
                this.stats.average /= this.stats.scores.length;

            console.log(this.stats);

            this.stats.generations++;
            this.stats.scores = [];
            this.evoNetworks = this.evo.nextGeneration();
        }

        resetLanders(landers: Lander[], networks: nnpoc.Network[]): void {
            for (let i = 0; i < networks.length; i++) {
                var l = landers[i];
                if (!l) {
                    l = new Lander();
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
        }

        getBest(soure: nnpoc.Network[], dest: nnpoc.Network[], amount: number): void {
            for (let i = 0, l = Math.min(amount, soure.length); i < l; i++) {
                dest[i] = soure[i].clone();
            }

            if (dest.length > soure.length)
                dest.splice(soure.length, dest.length - soure.length);
        }

        simulate = (): void => {
            var start = Date.now();
            var elapsed = start - this.lastSimTime;
            this.lastSimTime = start;

            setTimeout(this.simulate, this.simDelay);

            var sims = 0;
            while (Date.now() - start < this.simDelay) {
                if (!this.updateLanders(this.evoLanders, this.evoNetworks, this.evo)) {
                    this.evolve();
                    this.resetLanders(this.evoLanders, this.evoNetworks);
                    if (!this.bestLanders)
                        this.bestLanders = [];
                }
                sims++;
            }

            if (this.logSimTime) {
                var simTime = Date.now() - start;

                console.log({
                    start: start,
                    elapsed: elapsed,
                    simTime: simTime,
                    sims: sims
                });
            }

            if (this.watch) {
                console.log(this.watch());
            }
        }

        update(): void {
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
        }

        resetBest(): void {
            this.getBest(this.evoNetworks, this.bestNetworks, this.bestDisplay);
            this.resetLanders(this.bestLanders, this.bestNetworks);
            this.bestTime = 0;
        }

        updateLanders = (landers: Lander[], networks: nnpoc.Network[], evo: nnpoc.Neuroevolution): boolean => {
            var activeLanders = false;
            var tleft = this.target.x - this.target.width / 2;
            var tright = this.target.x + this.target.width / 2;
            var ttop = this.target.y - this.target.height / 2;

            for (let i = 0, len = landers.length; i < len; i++) {
                var l = landers[i];

                if (l.active) {
                    this.calcFunc(l, networks[i]);
                }

                var bp = l.bottom;
                l.update();

                if (l.active) {
                    //check collision
                    if (l.bottom >= ttop
                        && bp < ttop
                        && l.left > tleft
                        && l.right < tright) {
                        if ((Math.abs(l.rotation) <= this.target.minAng) && (l.vel.y <= this.target.minVel)) {
                            l.land();
                        }
                        else {
                            l.crash(1);
                        }
                    }
                    else if (this.landscape.checkLanderscapeCollision(l)) {
                        l.crash(1);
                    }
                    else if (l.bottom >= this.world.floor) {
                        l.crash(1);
                    }
                    else if (this.wall) {
                        if (l.right > this.wall.left
                            && l.left < this.wall.right
                            && l.bottom > this.wall.top
                            && l.top < this.wall.bottom) {
                            l.crash(1)
                        }
                    }

                    if (evo && !l.active) {
                        var score = this.scoreFunc(l);
                        this.stats.scores.push({
                            score: score,
                            landed: l.landed,
                            crashed: !!l.crashed,
                            data: this.statFunc(l)
                        });
                        evo.networkScore(networks[i], score);
                    }
                }

                if (l.active) {
                    activeLanders = true;
                }
            }

            return activeLanders;
        }

        render = (): void => {
            var start = Date.now();
            var elapsed = start - this.lastRenderTime;

            this.updateTime += elapsed;
            var updates = 0;
            while (this.updateTime > this.updateTimeStep) {
                updates++;
                this.update();
                this.updateTime -= this.updateTimeStep;
            }

            requestAnimationFrame(this.render);

            var c = this.context;
            var view = this.view;
            c.clearRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
            c.save();
            c.translate(view.x, view.y);
            c.scale(view.scale, view.scale);

            this.landscape.render(c, view);

            //draw start
            c.strokeStyle = "#00FF00";
            c.beginPath();
            c.arc(this.start.x, this.start.y, 1, 0, 90);
            c.stroke();

            //draw langscape
            if (this.wall) {
                c.strokeStyle = "#FFFFFF";
                c.lineWidth = 1;
                c.beginPath();
                c.moveTo(this.wall.left, this.wall.top);
                c.lineTo(this.wall.right, this.wall.top);
                c.lineTo(this.wall.right, this.wall.bottom);
                c.lineTo(this.wall.left, this.wall.bottom);
                c.closePath();
                c.stroke();
            }

            c.strokeStyle = "#FFFFFF";
            c.beginPath();
            c.moveTo(this.view.left, this.world.floor)
            c.lineTo(this.view.right, this.world.floor);
            c.stroke();

            c.fillStyle = c.strokeStyle = "#00FF00";
            c.fillRect(this.target.x - this.target.width / 2, this.target.y - this.target.height / 2, this.target.width, this.target.height);            

            for (let i = 0, len = Math.min(this.evoLanders.length, this.simDisplay); i < len; i++) {
                this.renderer.render(this.evoLanders[i], c, view.scale, this.simColor);
            }

            if (this.bestLanders) {
                for (let i = 0, len = Math.min(this.bestLanders.length, this.bestDisplay); i < len; i++) {
                    this.renderer.render(this.bestLanders[i], c, view.scale, this.bestColor);
                }
            }

            c.restore();

            if (this.logRenderTime) {
                var renderTime = Date.now() - start;

                console.log({
                    noww: Date.now(),
                    elapsed: start - this.lastRenderTime,
                    renderTime: renderTime,
                    updates: updates
                });
            }
            this.lastRenderTime = Date.now();
        }

        updateView(): void {
            this.view.scale = this.SCREEN_HEIGHT / this.world.height;
            this.view.x = -this.world.x * this.view.scale + this.SCREEN_WIDTH / 2;
            this.view.y = -this.world.y * this.view.scale + this.SCREEN_HEIGHT / 2;
            this.view.left = -this.view.x / this.view.scale;
            this.view.top = -this.view.y / this.view.scale;
            this.view.right = this.view.left + (this.SCREEN_WIDTH / this.view.scale);
            this.view.bottom = this.view.top + (this.SCREEN_HEIGHT / this.view.scale);
            this.canvasRect = this.canvas.getBoundingClientRect();        
        }

        resizeGame = (): void => {
            var newWidth = window.innerWidth;
            var newHeight = window.innerHeight;
            if ((this.SCREEN_WIDTH == newWidth) && (this.SCREEN_HEIGHT == newHeight))
                return;
            this.SCREEN_WIDTH = this.canvas.width = newWidth;
            this.SCREEN_HEIGHT = this.canvas.height = newHeight;
            this.updateView();
        }

        onKeyDown = (ev: KeyboardEvent): any => {
            //console.log(ev.keyCode, Keys[ev.keyCode]);
            if (ev.keyCode == Keys.SPACE)
                this.resetBest();
            else if (ev.keyCode == Keys.EQUALS)
                this.updateTimeStep /= 2;
            else if (ev.keyCode == Keys.DASH)
                this.updateTimeStep *= 2;
            else if (ev.keyCode == Keys.KEY_Q)
                this.simDisplay = this.simDisplay ? 0 : this.evoLanders.length;
        }

        onMouseDown = (ev: MouseEvent): any => {
            var pos = this.getMousePos(ev);
            var tleft = this.target.x - this.target.width / 2;
            var tright = this.target.x + this.target.width / 2;
            var ttop = this.target.y - this.target.height / 2;
            var tbottom = this.target.y + this.target.height / 2;

            if (pos.x > tleft && pos.x < tright && pos.y > ttop && pos.y < tbottom)
                this.dragging = this.target;
        }

        onMouseMove = (ev: MouseEvent): any => {
            if (this.dragging) {
                var pos = this.getMousePos(ev);
                this.dragging.x = pos.x;
                this.dragging.y = pos.y;
            }
        }

        onMouseUp = (ev: MouseEvent): any => {
            this.dragging = null;
        }

        getMousePos(ev: MouseEvent): Vector2 {
            if (!this.canvasRect)
                this.canvasRect = this.canvas.getBoundingClientRect();

            var x = (ev.clientX - this.canvasRect.left - this.view.x) / this.view.scale ;
            var y = (ev.clientY - this.canvasRect.top - this.view.y) / this.view.scale;

            return new Vector2(x, y);
        }
    }

    class Tracker {
        static values: {
            [key: string]: {
                min: number,
                max: number
            }
        } = {};

        static track(key: string, value: number) {
            var tracker = Tracker.values[key];

            if (!tracker) {
                Tracker.values[key] = tracker = {
                    min: value,
                    max: value
                }
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
        }
    }

    interface Rectangle {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }
}