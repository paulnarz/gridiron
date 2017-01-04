module nnlunar {
    export class LunarGameRaw {
        SCREEN_WIDTH = 800;
        SCREEN_HEIGHT = 800;
        simulationMul = 8;
        populationSize = 50;
        start = new Vector2(400, 200);
        langscape = 600;
        target = {
            left: 340,
            right: 460,
            y: 600,
            minVel: 0.15,
            minAng: 5
        };

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        renderer: LanderRenderer;
        landers: Lander[];
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

            this.landers = [];
            for (let i = 0; i < this.populationSize; i++) {
                var l = new Lander();
                l.reset();
                l.pos.x = this.start.x;
                l.pos.y = this.start.y;
                l.fuel = 100;
                this.landers.push(l);
            }

            this.loop();
        }

        loop = (): void => {
            requestAnimationFrame(this.loop);

            for (let i = 0, len = this.landers.length; i < len; i++) {
                var l = this.landers[i];

                if (l.active) {
                    if (Math.random() < 0.01)
                        l.thrust(1);
                    if (Math.random() < 0.01)
                        l.rotate(1);
                    if (Math.random() < 0.01)
                        l.rotate(-1);

                    for (let j = 0; j < this.simulationMul; j++) {
                        l.update();
                        //check collision
                        if (l.bottom >= this.target.y) {
                            if ((l.left > this.target.left) && (l.right < this.target.right)) {
                                if ((Math.abs(l.rotation) <= this.target.minAng) && (l.vel.y <= this.target.minVel)) {
                                    l.land();
                                } else {
                                    l.crash();
                                }
                            } else {
                                l.crash();
                            }
                        }
                    }
                }
            }

            this.render();
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