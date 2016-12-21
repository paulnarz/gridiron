module nnviz {
    export class NNEvoController {
        TargetFunc = (x: number, y: number): number => { return x * y + 2 * x + -3 * y - 1; };

        Points = nnpoc.Points.createPoints2d(-1, 1, 3);

        Graph3d: any;
        Graph3dData: { x: number, y: number, z: number }[];
        Graph3dOptions: any = {
            style: 'surface',
        };

        constructor(
            private $scope: ng.IScope
        ) {
            this.initGraphs();
            this.calcData();
            this.redrawPlot();
        }

        calcData(): void {
            this.Graph3dData = [];

            this.Points.forEach(p => {
                var z = this.TargetFunc(p.x, p.y);

                this.Graph3dData.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            });
        }

        initGraphs(): void {
            this.Graph3d = new vis.Graph3d(
                document.getElementById('graph3d'),
                this.Graph3dData,
                this.Graph3dOptions);
        }

        redrawPlot(): void {
            this.Graph3d.setData(this.Graph3dData);
        }
    }

    angular
        .module("nnviz")
        .controller("NNEvoController", NNEvoController);
}