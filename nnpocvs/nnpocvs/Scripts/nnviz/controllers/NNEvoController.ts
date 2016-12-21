module nnviz {
    export class NNEvoController {
        TargetFunc = (x: number, y: number): number => { return x * y + 2 * x + -3 * y - 1; };
        Points = nnpoc.Points.createPoints2d(-1, 1, 3);
        Network: nnpoc.Network;
        Trainer: nnpoc.FuncTrainer;

        Graph3dTarget: any;
        Graph3dBest: any;
        Graph2dTarget: any;
        Graph2dBest: any;
        GraphNetwork: any;

        constructor(
            private $scope: ng.IScope
        ) {
            this.Trainer = new nnpoc.FuncTrainer(this.TargetFunc, this.Points);
            this.Network = this.Trainer.getBest();

            this.initGraphs();
            this.drawTarget();
            this.drawBest();
        }

        initGraphs(): void {
            this.Graph3dTarget = nnpoc.Graph.init3d("graph3dTarget", nnpoc.Graph.SurfaceGraph());
            this.Graph3dBest = nnpoc.Graph.init3d("graph3dBest", nnpoc.Graph.SurfaceGraph(this.Trainer.FuncMin, this.Trainer.FuncMax));
            this.Graph2dTarget = nnpoc.Graph.init3d("graph2dTarget", nnpoc.Graph.OverHead(-1, 1));
            this.Graph2dBest = nnpoc.Graph.init3d("graph2dBest", nnpoc.Graph.OverHead(-1, 1));
            this.GraphNetwork = nnpoc.Graph.initNetwork("graphNetwork", nnpoc.Graph.NetworkGraph);
        }

        drawTarget(): void {
            var data = nnpoc.Graph.calcData((x, y) => { return this.TargetFunc(x, y); }, this.Points);
            var data2d = nnpoc.Graph.mapToDecision(data, 0, 1, -1);
            this.Graph3dTarget.setData(data);
            this.Graph2dTarget.setData(data2d);
        }

        drawBest(): void {
            var data = nnpoc.Graph.calcData((x, y) => { return this.Trainer.calc(x, y); }, this.Points);
            var data2d = nnpoc.Graph.mapToDecision(data, 0, 1, -1);
            this.Graph3dBest.setData(data);
            this.Graph2dBest.setData(data2d);            
            this.GraphNetwork.setData(nnpoc.Graph.buildNodes(this.Network));
        }

        train(): void {
            this.Trainer.train();
            this.Network = this.Trainer.getBest();
            this.drawBest();
        }
    }

    angular
        .module("nnviz")
        .controller("NNEvoController", NNEvoController);
}