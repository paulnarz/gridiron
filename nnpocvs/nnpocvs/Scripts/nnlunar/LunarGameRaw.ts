module nnlunar {
    export class LunarGameRaw {
        SCREEN_WIDTH = 800;
        SCREEN_HEIGHT = 800;
        simulationMul = 128;

        start = {
            x: 200,
            y: 200,
            rotation: 0,
            fuel: 500
        };

        target = {
            x: 600,
            y: 600,
            left: 600 - 40,
            right: 600 + 40,
            minVel: 0.15,
            minAng: 5
        };

        calcFunc(l: Lander, n: nnpoc.Network): void {
            var result = n.calculate([
                nnpoc.lerpInv(l.pos.x, 0, 800),
                nnpoc.lerpInv(l.pos.y, this.start.y, this.target.y),
                nnpoc.lerpInv(l.rotation, -90, 90),
                nnpoc.lerpInv(l.vel.x, -0.35, 0.35),
                nnpoc.lerpInv(l.vel.y, -0.35, 0.35),
                nnpoc.lerpInv(l.fuel, 0, this.start.fuel)
            ]);
            l.thrust(result[0]);
            l.setRotation(nnpoc.lerp(result[1], -90, 90));
        }

        scoreFunc(l: Lander): number {
            var score = 0;
            if (l.crashed)
                score += 6;
            var dx = (l.pos.x - this.target.x) / 800;
            var dvy = l.vel.y / 0.35;
            var dr = l.rotation / 90;

            score += dx * dx;
            score += dvy * dvy;
            score += dr * dr;
            return score;
        }

        statFunc(l: Lander): any {
            return {
                landed: l.landed,
                crashed: l.crashed,
                x: l.pos.x,
                y: l.pos.y,
                r: l.rotation,
                f: l.fuel,
                vx: l.vel.x,
                vy: l.vel.y,
            }
        }

        evoOptions: nnpoc.NeuroevolutionOptions = {
            population: 100,
            elitism: 0.2,
            randomBehaviour: 0.2,
            mutationRate: 0.1,
            mutationRange: 0.5,
            nbChild: 1,
            network: {
                inputs: 6,
                hiddens: [8, 8, 8],
                outputs: 2,
                randomClamped: () => { return Math.random() * 8 - 4; }
            }
        };

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        renderer: LanderRenderer;
        landers: Lander[];
        evo: nnpoc.Neuroevolution;
        networks: nnpoc.Network[];
        view = {
            x: 0,
            y: 0,
            scale: 1,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };

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
                data: any
            }[]
        };

        constructor() {
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
            document.body.appendChild(this.canvas);
            this.canvas.width = this.SCREEN_WIDTH;
            this.canvas.height = this.SCREEN_HEIGHT;
            this.canvas.style.backgroundColor = "#000000";
            this.renderer = new LanderRenderer();
            this.evo = new nnpoc.Neuroevolution(this.evoOptions);

            this.landers = [];
            this.reset();
            this.loop();
        }

        reset(): void {
            this.stats.scores.sort((a, b) => { return a.score - b.score; });
            this.stats.landed = 0;
            this.stats.crashed = 0;
            this.stats.best = Infinity;
            this.stats.worst = -Infinity;
            this.stats.average = 0;
            this.stats.population = this.stats.scores.length;

            this.stats.scores.forEach(s => {
                if (s.data.landed)
                    this.stats.landed++;
                if (s.data.crashed)
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
            this.networks = this.evo.nextGeneration();

            for (let i = 0; i < this.networks.length; i++) {
                var l = this.landers[i];
                if (!l) {
                    l = new Lander();
                    this.landers.push(l);
                }

                l.reset();
                l.pos.x = this.start.x;
                l.pos.y = this.start.y;
                l.rotation = this.start.rotation;
                l.fuel = this.start.fuel;
            }

            if (this.landers.length > this.networks.length)
                this.landers.splice(this.networks.length, this.landers.length - this.networks.length);
        }

        loop = (): void => {
            requestAnimationFrame(this.loop);

            for (let j = 0; j < this.simulationMul; j++) {
                this.update();
            }

            this.render();
        }

        update = (): void => {
            var allAreDead = true;

            for (let i = 0, len = this.landers.length; i < len; i++) {
                var l = this.landers[i];

                if (l.active) {
                    this.calcFunc(l, this.networks[i]);
                }

                l.update();

                if (l.active) {
                    //check collision
                    if (l.bottom >= this.target.y) {
                        if ((l.left > this.target.left) && (l.right < this.target.right)) {
                            if ((Math.abs(l.rotation) <= this.target.minAng) && (l.vel.y <= this.target.minVel)) {
                                l.land();
                            }
                            else {
                                l.crash();
                            }
                        }
                        else {
                            l.crash();
                        }

                        var score = this.scoreFunc(l);
                        this.stats.scores.push({ score: score, data: this.statFunc(l) });
                        this.evo.networkScore(this.networks[i], score);
                    }
                }

                if (l.active) {
                    allAreDead = false;
                }
            }

            if (allAreDead)
                this.reset();
        }

        render(): void {
            var c = this.context;
            var view = this.view;
            c.clearRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
            c.save();
            c.translate(view.x, view.y);
            c.scale(view.scale, view.scale);

            //draw start
            c.strokeStyle = 'white';
            c.beginPath();
            c.arc(this.start.x, this.start.y, 1, 0, 90);
            c.stroke();

            //draw langscape
            c.strokeStyle = 'grey';
            c.beginPath();
            c.moveTo(0, this.target.y)
            c.lineTo(this.SCREEN_WIDTH, this.target.y);
            c.stroke();

            c.strokeStyle = 'green';
            c.lineWidth = 5;
            c.beginPath();
            c.moveTo(this.target.left, this.target.y)
            c.lineTo(this.target.right, this.target.y);
            c.stroke();

            for (let i = 0, len = this.landers.length; i < len; i++) {
                this.renderer.render(this.landers[i], c, view.scale);
            }

            c.restore();
        }
    }
}