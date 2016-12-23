module nnviz {
    export class NNEvoController {
        TargetFuncString: string = "2 * x^2 + sin(y)";
        TargetFunc: nnpoc.Func2d;
        Errors: string;
        Points = nnpoc.Points.createPoints2d(-1, 1, 3);
        Network: nnpoc.Network;
        Trainer: nnpoc.FuncTrainer;
        TrainStop: ng.IPromise<void>;
        Generations: number = 0;

        Graph3dTarget: any;
        Graph3dNetwork: any;
        Graph2dTarget: any;
        Graph2dNetwork: any;
        GraphNetwork: any;

        constructor(
            private $scope: ng.IScope,
            private $interval: ng.IIntervalService
        ) {
            this.TargetFunc = Parser.parse(this.TargetFuncString).toJSFunction(["x", "y"]) as nnpoc.Func2d;
            this.Trainer = new nnpoc.FuncTrainer(this.TargetFunc, this.Points);
            this.Network = this.Trainer.getBest();

            this.initGraphs();
            this.updateGraphBounds();
            this.drawTarget();
            this.drawNetwork();
        }

        initGraphs(): void {
            this.Graph3dTarget = nnpoc.Graph.init3d("graph3dTarget");
            this.Graph3dNetwork = nnpoc.Graph.init3d("graph3dNetwork");
            this.Graph2dTarget = nnpoc.Graph.initOverhead("graph2dTarget");
            this.Graph2dNetwork = nnpoc.Graph.initOverhead("graph2dNetwork");
            this.GraphNetwork = nnpoc.Graph.initNetwork("graphNetwork");
        }

        updateGraphBounds(): void {
            nnpoc.Graph.SetBounds(this.Graph3dTarget, this.Trainer.FuncMin, this.Trainer.FuncMax);
            nnpoc.Graph.SetBounds(this.Graph3dNetwork, this.Trainer.FuncMin, this.Trainer.FuncMax);
        }

        drawTarget(): void {
            var data = nnpoc.Graph.calcData((x, y) => { return this.TargetFunc(x, y); }, this.Points);
            var data2d = nnpoc.Graph.mapToDecision(data, 0, 1, -1);
            this.Graph3dTarget.setData(data);
            this.Graph2dTarget.setData(data2d);
        }

        drawNetwork(): void {
            var data = nnpoc.Graph.calcNetworkDataExpand(this.Network, this.Points, this.Trainer.FuncMin, this.Trainer.FuncMax);
            var data2d = nnpoc.Graph.mapToDecision(data, 0, 1, -1);
            this.Graph3dNetwork.setData(data);
            this.Graph2dNetwork.setData(data2d);
            this.Network.calculate([0, 0]);
            this.GraphNetwork.setData(nnpoc.Graph.buildNodes(this.Network));
        }

        reset(): void {
            if (this.TrainStop) {
                this.$interval.cancel(this.TrainStop);
                this.TrainStop = undefined;
            }
            this.Generations = 0;
            this.Trainer.reset();
            this.Network = this.Trainer.getBest();
            this.drawNetwork();
        }

        train(): void {
            if (this.TrainStop) {
                this.$interval.cancel(this.TrainStop);
                this.TrainStop = undefined;
                return;
            }

            this.Errors = null;

            try {
                this.TargetFunc = Parser.parse(this.TargetFuncString).toJSFunction(["x", "y"]) as nnpoc.Func2d;
                this.TargetFunc(0, 0);
            }
            catch (ex) {
                this.Errors = ex.message;
                return;
            }

            this.Trainer.setFunc(this.TargetFunc);
            this.updateGraphBounds();
            this.drawTarget();
            this.drawNetwork();

            this.TrainStop = this.$interval(() => {
                this.Generations++;
                this.Trainer.train();
                this.Network = this.Trainer.getBest();
                this.drawNetwork();
            }, 250);
        }

        selectNetwork(network: nnpoc.Network): void {
            this.Network = network;
            this.drawNetwork();
        }
    }

    angular
        .module("nnviz")
        .controller("NNEvoController", NNEvoController);
}