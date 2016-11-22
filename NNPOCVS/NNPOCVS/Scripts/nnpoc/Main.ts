module nnpoc {
    declare var vis: any;

    class Main {
        static main() {
            var points = Main.createPoints(-1, 1, Math.pow(2, -4));

            var network = new Network();
            network.populate(1, [ 2 ], 1);
            network.layers[1].neurons[0].weights            

            network.layers[1].neurons[0].weights[0] = 1;
            network.layers[1].neurons[0].weights[1] = 0;

            network.layers[1].neurons[1].weights[0] = 0;
            network.layers[1].neurons[1].weights[1] = 0;

            network.layers[2].neurons[0].weights[0] = 1;
            network.layers[2].neurons[0].weights[1] = 1;
            network.layers[2].neurons[0].weights[2] = 0;
            
            console.log(network.layers[1].neurons[0].weights);
            console.log(network.layers[1].neurons[1].weights);
            console.log(network.layers[2].neurons[0].weights);            

            var data = [];
            var out = "";
            points.forEach(p => {
                //var result = network.calculate([p.x, p.y, p.x * p.y, p.x * p.x, p.y * p.y]);
                var result = network.calculate([p.x ]);
                out += p.x + "\t" + p.y + "\t" + result[0] + "\n";
                var z = result[0];
                //z = z > 0.5 ? 0.8 : 0.2;

                data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            })
            //console.log(out);

            network.calculate([1]);
            console.log(network);

            Main.plot(data);
        }

        static plot(data: any[]) {
            
            var options = {
                width: '100%',
                height: '600px',
                style: 'surface',
                showPerspective: false,
                showGrid: true,
                showShadow: false,
                keepAspectRatio: true,
                verticalRatio: 0.5,
                zMin: -1,
                zMax: 1,
                cameraPosition: { horizontal: 0.0, vertical: 3.14 } //top
                //cameraPosition: { horizontal: 0.0, vertical: 0 } //side
            };

            var graph;

            graph = document.getElementById('graph');
            options.cameraPosition = undefined;
            if (graph)      
                new vis.Graph3d(graph, data, options);

            graph = document.getElementById('graphTop');
            options.cameraPosition = { horizontal: 0.0, vertical: 3.14 };
            if (graph)
                new vis.Graph3d(graph, data, options);

            graph = document.getElementById('graphSide');
            options.cameraPosition = { horizontal: 0.0, vertical: 0 };
            options.showPerspective = false;
            if (graph)
                new vis.Graph3d(graph, data, options);                        
        }

        static createPoints(min: number, max: number, step: number): { x: number, y: number }[] {
            var points = [];

            for (var x = min; x <= max; x += step) {
                for (var y = min; y <= max; y += step) {
                    points.push({ x: x, y: y });
                }
            }

            return points;
        }
    }

    window.onload = Main.main;
}