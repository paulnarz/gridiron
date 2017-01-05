module nnlunar {
    export class LunarGameRaw {
        SCREEN_WIDTH = 800;
        SCREEN_HEIGHT = 800;
        simulationMul = 16;                
        start = new Vector2(400, 200);
        startingFuel = 100;        
        target = {
            left: 340,
            right: 460,
            y: 600,
            minVel: 0.15,
            minAng: 5
        };

        evoOptions: nnpoc.NeuroevolutionOptions = {
            population: 50,
            elitism: 0.2,
            randomBehaviour: 0.2,
            mutationRate: 0.1,
            mutationRange: 0.5,
            nbChild: 1,
            network: {
                inputs: 3,
                hiddens: [3, 3],
                outputs: 1,
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
            for (let i = 0; i < this.evoOptions.population; i++) {
                this.landers.push(new Lander());
            }

            this.reset();
            this.loop();
        }

        reset(): void {
            this.networks = this.evo.nextGeneration();            

            console.log(this.networks.length, this.landers.length);            

            for (let i = 0; i < this.networks.length; i++) {
                var l = this.landers[i];                
                if (!l) {
                    l = new Lander();
                    this.landers.push(l);
                }

                l.reset();
                l.pos.x = this.start.x;
                l.pos.y = this.start.y;
                l.fuel = this.startingFuel;                
            }
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
                    var network = this.networks[i];
                    var result = network.calculate([
                        nnpoc.lerpInv(l.pos.y, 0, 200),
                        nnpoc.lerpInv(l.vel.y, -0.35, 0.35),
                        nnpoc.lerpInv(l.fuel, 0, this.startingFuel)                        
                    ]);
                    var power = clamp(result[0], 0, 1);
                    l.thrust(power);
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

                        var score = l.vel.y * l.vel.y + l.rotation * l.rotation;
                        console.log(score, l.vel.y, l.rotation, l.fuel);
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