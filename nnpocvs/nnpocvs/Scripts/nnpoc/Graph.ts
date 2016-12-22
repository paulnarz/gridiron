module nnpoc {
    export class Graph {
        static NetworkGraph = {
            physics: {
                enabled: false
            },
            layout: {
                hierarchical: {
                    direction: "LR",
                    sortMethod: "directed"
                }
            }
        };        

        static SurfaceGraph(zMin?: number, zMax?: number): any {
            return {
                style: 'surface',
                zMin: zMin,
                zMax: zMax,
            };
        }

        static OverHead(zMin?: number, zMax?: number): any {
            return {
                style: 'surface',
                zMin: zMin,
                zMax: zMax,
                showPerspective: false,
                cameraPosition: { horizontal: 0.0, vertical: 3.14 }
            };
        }

        static init3d(elementId: string, options: any): any {
            return new vis.Graph3d(document.getElementById(elementId), undefined, options);
        }

        static initNetwork(elementId: string, options: any): any {
            return new vis.Network(document.getElementById(elementId), undefined, options);
        }

        static calcNetworkData(network: Network, points: Point2d[]): Point3d[] {
            var data = [];

            points.forEach(p => {
                var z = network.calculate([ p.x, p.y ])[0];                

                data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            });

            return data;
        }

        static calcNetworkDataExpand(network: Network, points: Point2d[], min: number, max: number): Point3d[] {
            var data = [];

            points.forEach(p => {
                var z = network.calculate([p.x, p.y])[0];
                z = MathH.expand(z, min, max);

                data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            });

            return data;
        }

        static mapToDecision(data: Point3d[], cutoff: number, high: number, low: number): Point3d[] {
            var result = [];

            data.forEach(p => {
                result.push({
                    x: p.x,
                    y: p.y,
                    z: p.z > cutoff ? high : low
                });
            });

            return result;
        }

        static map3d(data: Point3d[], func: (p: Point3d) => Point3d): Point3d[] {
            var result = [];

            data.forEach(p => {
                result.push(func(p));
            });

            return result;
        }

        static calcData(func: Func2d, points: Point2d[]): Point3d[] {
            var data = [];

            points.forEach(p => {
                var z = func(p.x, p.y);

                data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            });

            return data;
        }

        static buildNodes(network: Network): any {
            var nodes = [];
            var edges = [];

            network.layers.forEach((l, li) => {
                l.neurons.forEach((n, ni) => {
                    var id = li + "_" + ni;

                    nodes.push({
                        id: id,
                        label: (n.value || 0).toFixed(2),
                        color: nnpoc.Color.getValueColor(n.value || 0)
                    });

                    if (n.edges) {
                        n.edges.forEach((e, ei) => {
                            var fromID = li - 1 + "_" + ei;
                            var edgeID = li + "_" + ni + "_" + ei;
                            edges.push({
                                id: edgeID,
                                from: fromID,
                                to: id,
                                label: (e.weight || 0).toFixed(2),
                                color: nnpoc.Color.getValueColor(nnpoc.MathH.normalize(e.weight, -4, 4))
                            });
                        })
                    }
                })
            });

            return {
                nodes: nodes,
                edges: edges
            };
        }
    }
}