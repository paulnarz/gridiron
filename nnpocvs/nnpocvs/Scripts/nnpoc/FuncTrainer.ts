module nnpoc {
    export class FuncTrainer {
        TargetFunc: Func2d;
        Points: Point2d[];
        FuncMin: number = 0;
        FuncMax: number = 0;        
        NEvo: Neuroevolution;        
        Networks: {
            network: Network,
            score: number
        }[];

        constructor(targetFunc: Func2d, points: Point2d[]) {            
            this.Points = points;
            this.setFunc(targetFunc);

            this.NEvo = new Neuroevolution({
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
                    randomClamped: () => { return Math.random() * 8 - 4; }
                }
            });
            this.train();
        }

        reset(): void {
            this.NEvo.reset();
            this.train();
        }

        setFunc(targetFunc: Func2d): void {
            this.TargetFunc = targetFunc;

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
            return this.Networks[0].network;
        }

        calc(x: number, y: number): number {
            var z = this.getBest().calculate([x, y])[0];            
            return MathH.expand(z, this.FuncMin, this.FuncMax);
        }

        train(): void {
            this.Networks = [];
            var networks = this.NEvo.nextGeneration();            

            networks.forEach((network, i) => {
                var score = 0;

                this.Points.forEach(p => {
                    var tv = this.TargetFunc(p.x, p.y);
                    var nv = MathH.expand(network.calculate([p.x, p.y])[0], this.FuncMin, this.FuncMax);
                    score += (tv - nv) * (tv - nv);
                });

                this.NEvo.networkScore(network, score);
                this.Networks.push({
                    network: network,
                    score: score
                });
            });

            this.Networks.sort((a, b) => { return a.score - b.score; });            
        }
    }
}