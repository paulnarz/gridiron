var nnpoc;
(function (nnpoc) {
    var Layer = (function () {
        function Layer() {
        }
        Layer.prototype.populate = function (nNeurons, nInputs, random) {
            this.neurons = [];
            for (var i = 0; i < nNeurons; i++) {
                var n = new nnpoc.Neuron();
                n.populate(nInputs, random);
                this.neurons.push(n);
            }
        };
        return Layer;
    }());
    nnpoc.Layer = Layer;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Main = (function () {
        function Main() {
        }
        Main.main = function () {
            var points = Main.createPoints(-1, 1, Math.pow(2, -4));
            var network = new nnpoc.Network();
            network.populate(2, [4, 4], 1);
            //network.layers[1].neurons[0].weights[0] = 3;
            //network.layers[1].neurons[0].weights[1] = 0;
            //network.layers[1].neurons[1].weights[0] = -1;
            //network.layers[1].neurons[1].weights[1] = 1;
            //network.layers[2].neurons[0].weights[0] = 1;
            //network.layers[2].neurons[0].weights[1] = -1;
            //network.layers[2].neurons[0].weights[2] = 0;
            //console.log(network.layers[1].neurons[0].weights);
            //console.log(network.layers[1].neurons[1].weights);
            //console.log(network.layers[2].neurons[0].weights);            
            var data = [];
            var out = "";
            points.forEach(function (p) {
                var result = network.calculate([p.x, p.y]);
                out += p.x + "\t" + p.y + "\t" + result[0] + "\n";
                var z = result[0];
                //z = z > 0.5 ? 0.8 : 0.2;
                data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            });
            //console.log(out);
            //network.calculate([1]);
            //console.log(network);
            Main.plot(data);
        };
        Main.plot = function (data) {
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
        };
        Main.createPoints = function (min, max, step) {
            var points = [];
            for (var x = min; x <= max; x += step) {
                for (var y = min; y <= max; y += step) {
                    points.push({ x: x, y: y });
                }
            }
            return points;
        };
        return Main;
    }());
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Network = (function () {
        function Network() {
        }
        Network.prototype.activation = function (value) {
            return (1 / (1 + Math.exp(-value)));
        };
        Network.prototype.random = function () {
            return (Math.random() * 2 - 1) * 4;
        };
        Network.prototype.populate = function (nInputs, hiddens, output) {
            this.layers = [];
            var layer = new nnpoc.Layer();
            layer.populate(nInputs, 0, this.random);
            layer.neurons.push(new nnpoc.Neuron()); //add bias
            this.layers.push(layer);
            if (hiddens) {
                for (var i = 0; i < hiddens.length; i++) {
                    layer = new nnpoc.Layer();
                    layer.populate(hiddens[i], this.layers[i].neurons.length, this.random);
                    layer.neurons.push(new nnpoc.Neuron()); //add bias
                    this.layers.push(layer);
                }
            }
            layer = new nnpoc.Layer();
            layer.populate(output, this.layers[this.layers.length - 1].neurons.length, this.random);
            this.layers.push(layer);
        };
        Network.prototype.calculate = function (inputs) {
            var layer = this.layers[0];
            for (var i = 0; i < inputs.length; i++) {
                layer.neurons[i].value = inputs[i];
            }
            layer.neurons[layer.neurons.length - 1].value = 1;
            var prevLayer = layer;
            for (var i = 1; i < this.layers.length; i++) {
                layer = this.layers[i];
                prevLayer = this.layers[i - 1];
                for (var j = 0; j < layer.neurons.length; j++) {
                    var neuron = layer.neurons[j];
                    if (neuron.weights) {
                        var sum = 0;
                        for (var k = 0; k < prevLayer.neurons.length; k++) {
                            sum += prevLayer.neurons[k].value * neuron.weights[k];
                        }
                        neuron.value = this.activation(sum);
                    }
                    else {
                        neuron.value = 1;
                    }
                }
            }
            var out = [];
            for (var i = 0; i < layer.neurons.length; i++) {
                out.push(layer.neurons[i].value);
            }
            return out;
        };
        return Network;
    }());
    nnpoc.Network = Network;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Neuron = (function () {
        function Neuron() {
        }
        Neuron.prototype.populate = function (nInputs, random) {
            if (!nInputs)
                return;
            this.weights = [];
            for (var i = 0; i < nInputs; i++) {
                this.weights.push(random());
            }
        };
        return Neuron;
    }());
    nnpoc.Neuron = Neuron;
})(nnpoc || (nnpoc = {}));
var nnviz;
(function (nnviz) {
    "use strict";
    var m = angular.module("nnviz", []);
})(nnviz || (nnviz = {}));
var nnviz;
(function (nnviz) {
    var PlotController = (function () {
        function PlotController() {
            this.PlotOtions = {
                style: 'surface',
                zMin: 0,
                zMax: 1,
            };
            this.NPlotOtions = {
                style: 'surface',
                zMin: 0,
                zMax: 1,
                showPerspective: false,
                cameraPosition: { horizontal: 0.0, vertical: 3.14 }
            };
            this.Network = new nnpoc.Network();
            this.Network.populate(2, [2], 1);
            this.createPoints(-1, 1, Math.pow(2, -3));
            this.calcData();
            this.Graph = new vis.Graph3d(document.getElementById('graph'), this.Data, this.PlotOtions);
            this.NGraph = new vis.Graph3d(document.getElementById('ngraph'), this.NData, this.NPlotOtions);
        }
        PlotController.prototype.randomize = function () {
            this.Network.populate(2, [2], 1);
            this.calcData();
            this.redraw();
        };
        PlotController.prototype.createPoints = function (min, max, step) {
            this.Points = [];
            for (var x = min; x <= max; x += step) {
                for (var y = min; y <= max; y += step) {
                    this.Points.push({ x: x, y: y });
                }
            }
        };
        PlotController.prototype.calcData = function () {
            var _this = this;
            this.Data = [];
            this.NData = [];
            this.Points.forEach(function (p) {
                var result = _this.Network.calculate([
                    p.x,
                    p.y
                ]);
                var z = result[0];
                _this.Data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
                _this.NData.push({
                    x: p.x,
                    y: p.y,
                    z: z > 0.5 ? 1 : 0
                });
            });
        };
        PlotController.prototype.redraw = function () {
            this.Graph.setData(this.Data);
            this.NGraph.setData(this.NData);
        };
        return PlotController;
    }());
    nnviz.PlotController = PlotController;
    angular
        .module("nnviz")
        .controller("PlotController", PlotController);
})(nnviz || (nnviz = {}));
//# sourceMappingURL=nnpoc.js.map