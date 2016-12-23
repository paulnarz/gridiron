module nnviz {
    export class NNInteractController {
        NetworkOptions: nnpoc.NetworkOptions = {
            inputs: 2,
            hiddens: [2],
            outputs: 1,
            randomClamped: () => { return Math.round(((Math.random() * 2 - 1) * 4) * 10) / 10; }
        }
        TestInput: number[] = [0, 0];

        Network: nnpoc.Network;
        Points = nnpoc.Points.createPoints2d(-1, 1, 3);
        SelectedEdge: nnpoc.Edge;

        Graph3d: any;        
        Graph2dNormal: any;        
        GraphNetwork: any;

        constructor(
            private $scope: ng.IScope
        ) {
            this.Network = new nnpoc.Network();
            this.initGraphs();
            this.randomize();
        }

        initGraphs(): void {
            this.Graph3d = nnpoc.Graph.init3d("graph3d");
            this.Graph2dNormal = nnpoc.Graph.initOverhead("graph2dNormal");
            this.GraphNetwork = nnpoc.Graph.initNetwork("graphNetwork");

            this.GraphNetwork.on("select", (params) => {
                this.onGraphNetworkSelect(params);
            });
        }

        randomize(): void {
            this.Network.populate(this.NetworkOptions);
            this.redraw();
        }

        redraw(): void {
            var data = nnpoc.Graph.calcNetworkData(this.Network, this.Points);
            var normal = nnpoc.Graph.mapToDecision(data, 0.5, 0.8, 0.2);

            this.Graph3d.setData(data);
            this.Graph2dNormal.setData(normal);
            this.Network.calculate(this.TestInput);
            this.GraphNetwork.setData(nnpoc.Graph.buildNodes(this.Network));    
        }

        onGraphNetworkSelect = (params: any): void => {
            if (params.edges && params.edges.length == 1) {
                var edgeID = params.edges[0];
                var ids = (edgeID as string).split("_");
                var layerIndex = parseInt(ids[0]);
                var neuronIndex = parseInt(ids[1]);
                var edgeIndex = parseInt(ids[2]);

                this.SelectedEdge = this.Network.layers[layerIndex].neurons[neuronIndex].edges[edgeIndex];
                this.$scope.$apply();
            }
            else if (this.SelectedEdge) {
                this.SelectedEdge = null;
                this.$scope.$apply();
            }
        }

        onWheel($event, $delta, $deltaX, $deltaY): void {
            if (this.SelectedEdge) {
                this.SelectedEdge.weight += -0.1 * $deltaY;
                this.redraw();
            }
        }
    }

    angular
        .module("nnviz")
        .controller("NNInteractController", NNInteractController);
}