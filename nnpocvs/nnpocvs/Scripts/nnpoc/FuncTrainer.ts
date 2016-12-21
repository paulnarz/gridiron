module nnpoc {
    export class FuncTrainer {
        TargetFunc: Func2d;
        Points: Point2d[];
        FuncMin: number = 0;
        FuncMax: number = 0;
        Best: Network;
        NEvo: Neuroevolution;
        Options: NetworkOptions = {
            Inputs: 2,
            Hiddens: [2],
            Outputs: 1
        }

        constructor(targetFunc: Func2d, points: Point2d[]) {
            this.TargetFunc = targetFunc;
            this.Points = points;

            //start with a random best.
            this.Best = new Network();
            this.Best.populate(this.Options);
            this.initFunc();

            this.NEvo = new Neuroevolution();            
        }

        initFunc(): void {
            this.FuncMin = Infinity;
            this.FuncMax = -Infinity;

            this.Points.forEach(p => {
                var z = this.TargetFunc(p.x, p.y);
                if (z < this.FuncMin)
                    this.FuncMin = z;
                if (z > this.FuncMax)
                    this.FuncMax = z;
            });            
        }

        getBest(): Network {
            return this.Best;
        }

        calc(x: number, y: number): number {            
            var z = this.Best.calculate([x, y])[0];
            return MathH.expand(z, this.FuncMin, this.FuncMax);            
        }

        train(): void {
            this.Best.populate(this.Options);
        }
    }
}