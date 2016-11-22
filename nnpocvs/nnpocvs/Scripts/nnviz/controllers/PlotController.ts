module nnviz {
    declare var vis: any;

    export class PlotController {
        Network: nnpoc.Network;
        Points: { x: number, y: number }[];
        Data: { x: number, y: number, z: number }[];
        NData: { x: number, y: number, z: number }[];
        Graph: any;
        NGraph: any;
        PlotOtions: any = {
            style: 'surface',
            zMin: 0,
            zMax: 1,
        };
        NPlotOtions: any = {
            style: 'surface',
            zMin: 0,
            zMax: 1,
            showPerspective: false,
            cameraPosition: { horizontal: 0.0, vertical: 3.14 }
        };

        constructor(
        ) {
            this.Network = new nnpoc.Network();
            this.Network.populate(2, [2], 1);

            this.createPoints(-1, 1, Math.pow(2, -3));
            this.calcData();

            this.Graph = new vis.Graph3d(document.getElementById('graph'), this.Data, this.PlotOtions);
            this.NGraph = new vis.Graph3d(document.getElementById('ngraph'), this.NData, this.NPlotOtions);
        }

        randomize(): void {
            this.Network.populate(2, [2], 1);
            this.calcData();
            this.redraw();
        }

        createPoints(min: number, max: number, step: number): void {
            this.Points = [];

            for (var x = min; x <= max; x += step) {
                for (var y = min; y <= max; y += step) {
                    this.Points.push({ x: x, y: y });
                }
            }
        }

        calcData(): void {
            this.Data = [];
            this.NData = [];

            this.Points.forEach(p => {
                var result = this.Network.calculate([
                    p.x,
                    p.y
                ]);

                var z = result[0];

                this.Data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });

                this.NData.push({
                    x: p.x,
                    y: p.y,
                    z: z > 0.5 ? 1 : 0
                });
            })
        }

        redraw(): void {
            this.Graph.setData(this.Data);
            this.NGraph.setData(this.NData);
        }
    }

    angular
        .module("nnviz")
        .controller("PlotController", PlotController);
}