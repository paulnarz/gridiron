module nnlunar {
    export class LunarGameRaw {
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        lander: Lander;
        SCREEN_WIDTH = 800;
        SCREEN_HEIGHT = 800;
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
            this.lander = new Lander();

            this.lander.reset();
            this.lander.pos.x = this.SCREEN_WIDTH / 2;
            this.lander.pos.y = this.SCREEN_HEIGHT / 2;
            this.lander.fuel = 100;

            this.loop();
        }

        loop = (): void => {            
            requestAnimationFrame(this.loop);
            this.lander.setRotation(0);
            this.lander.thrust(1);
            this.lander.update();
            this.render();
        }

        render(): void {
            var c = this.context;
            var view = this.view;
            c.clearRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
            c.save();
            c.translate(view.x, view.y);
            c.scale(view.scale, view.scale);
            this.lander.render(c, view.scale);
            c.restore();                                            
        }
    }
}