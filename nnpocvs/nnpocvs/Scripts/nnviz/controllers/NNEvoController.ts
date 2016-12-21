module nnviz {
    export class NNEvoController {
        TargetFunc = (x: number, y: number): number => { return x * y + 2 * x + -3 * y - 1; };
        Points = nnpoc.Points.createPoints2d(-1, 1, 3);
        Trainer: nnpoc.FuncTrainer;

        Graph3dTarget: any;
        Graph3dBest: any;
        GraphNetwork: any;

        constructor(
            private $scope: ng.IScope
        ) {
            this.Trainer = new nnpoc.FuncTrainer(this.TargetFunc, this.Points);

            this.initGraphs();
            this.drawTarget();
            this.drawBest();
        }

        initGraphs(): void {
            this.Graph3dTarget = nnpoc.Graph.init3d("graph3dTarget", nnpoc.Graph.SurfaceGraph);
            this.Graph3dBest = nnpoc.Graph.init3d("graph3dBest", nnpoc.Graph.SurfaceGraph);
            this.GraphNetwork = nnpoc.Graph.initNetwork("graphNetwork", nnpoc.Graph.NetworkGraph);
        }

        drawTarget(): void {
            this.Graph3dTarget.setData(nnpoc.Graph.calcData((x, y) => { return this.TargetFunc(x, y); }, this.Points));
        }

        drawBest(): void {
            this.Graph3dBest.setData(nnpoc.Graph.calcData((x, y) => { return this.Trainer.calc(x, y); }, this.Points));
            this.GraphNetwork.setData(nnpoc.Graph.buildNodes(this.Trainer.Best));
        }

        train(): void {
            this.Trainer.train();
            this.drawBest();
        }
    }

    angular
        .module("nnviz")
        .controller("NNEvoController", NNEvoController);
}