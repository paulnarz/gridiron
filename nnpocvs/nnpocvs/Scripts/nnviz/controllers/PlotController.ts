﻿module nnviz {
    declare var vis: any;

    export class PlotController {
        Network: nnpoc.Network;
        Points: { x: number, y: number }[];

        Graph3d: any;
        Graph3dData: { x: number, y: number, z: number }[];
        Graph3dOptions: any = {
            style: 'surface',
            zMin: 0,
            zMax: 1,
        };

        Graph2dNormal: any;
        Graph2dNormalData: { x: number, y: number, z: number }[];
        Graph2dNormalOptions: any = {
            style: 'surface',
            zMin: 0,
            zMax: 1,
            showPerspective: false,
            cameraPosition: { horizontal: 0.0, vertical: 3.14 }
        };

        GraphNetwork: any;
        GraphNetworkData: any;
        GraphNetworkOptions: any = {
            layout: {
                hierarchical: {
                    direction: "LR",
                    sortMethod: "directed"
                }
            }                                    
        };

        constructor(
        ) {
            this.Network = new nnpoc.Network();
            this.createPoints(-1, 1, Math.pow(2, -3));
            this.initGraphs();

            this.randomize();
        }

        createPoints(min: number, max: number, step: number): void {
            this.Points = [];

            for (var x = min; x <= max; x += step) {
                for (var y = min; y <= max; y += step) {
                    this.Points.push({ x: x, y: y });
                }
            }
        }

        randomize(): void {
            this.Network.populate(2, [2], 1);            
            this.calcData();
            this.redrawPlot();

            this.Network.calculate([0, 0]);
            this.redrawNetwork();            
        }

        calcData(): void {
            this.Graph3dData = [];
            this.Graph2dNormalData = [];

            this.Points.forEach(p => {
                var result = this.Network.calculate([
                    p.x,
                    p.y
                ]);

                var z = result[0];

                this.Graph3dData.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });

                this.Graph2dNormalData.push({
                    x: p.x,
                    y: p.y,
                    z: z > 0.5 ? 1 : 0
                });
            });

            this.redrawNetwork();
        }

        initGraphs(): void {
            this.Graph3d = new vis.Graph3d(
                document.getElementById('graph3d'),
                this.Graph3dData,
                this.Graph3dOptions);

            this.Graph2dNormal = new vis.Graph3d(
                document.getElementById('graph2dNormal'),
                this.Graph2dNormalData,
                this.Graph2dNormalOptions);

            this.GraphNetwork = new vis.Network(
                document.getElementById('graphNetwork'),
                this.GraphNetworkData,
                this.GraphNetworkOptions);
        }

        redrawPlot(): void {
            this.Graph3d.setData(this.Graph3dData);
            this.Graph2dNormal.setData(this.Graph2dNormalData);            
        }

        redrawNetwork(): void {
            var nodes = [];
            var edges = [];            
            var nextID = 1;
            var idLookUp = {};

            this.Network.layers.forEach((l, i) => {
                l.neurons.forEach((n, j) => {
                    var id = i + "_" + j;
                    idLookUp[id] = nextID++;

                    nodes.push({
                        id: idLookUp[id],
                        label: (n.value || 0).toFixed(2),
                        color: this.getValueColor(n.value || 0)                        
                    });

                    if (n.weights) {
                        n.weights.forEach((w, k) => {
                            var fromID = i - 1 + "_" + k;
                            edges.push({
                                from: idLookUp[fromID],
                                to: idLookUp[id],                                                          
                                label: w.toFixed(2),
                                color: this.getWeightColor(w)
                            });
                        })
                    }
                })
            });
            
            this.GraphNetworkData = {
                nodes: nodes,
                edges: edges
            };            

            this.GraphNetwork.setData(this.GraphNetworkData);
        }

        getValueColor(value: number): string {
            var h = 240 - value * 240;
            return this.hsvToRgb(h, 1, 1);
        }

        getWeightColor(value: number): string {            
            var h = 240 - ((value + 4) / 8) * 240;        
            return this.hsvToRgb(h, 1, 1);
        }

        hsvToRgb(h: number, v: number, s: number): string {
            var c = v * s;
            var hp = h / 60;
            var x = c * (1 - Math.abs((hp % 2) - 1));
            var r1, g1, b1;
            if (hp < 0) {
                r1 = 0; g1 = 0; b1 = 0;                
            } else if (hp < 1) {
                r1 = c; g1 = x; b1 = 0;                
            } else if (hp < 2) {
                r1 = x; g1 = c; b1 = 0;                
            } else if (hp < 3) {
                r1 = 0; g1 = c; b1 = x;                
            } else if (hp < 4) {
                r1 = 0; g1 = x; b1 = c;                
            } else if (hp < 5) {
                r1 = x; g1 = 0; b1 = c;                
            } else if (hp < 6) {
                r1 = c; g1 = 0; b1 = x;                
            }

            var m = v - c;
            var r = r1 + m;
            var g = g1 + m;
            var b = b1 + m;

            return 'rgb(' + Math.floor(r * 255) + ',' + Math.floor(g * 255) + ',' + Math.floor(b * 255) + ')';
        }
    }

    angular
        .module("nnviz")
        .controller("PlotController", PlotController);
}