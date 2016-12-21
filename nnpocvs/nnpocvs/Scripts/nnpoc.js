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
            return Math.round(((Math.random() * 2 - 1) * 4) * 10) / 10;
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
                    if (neuron.edges) {
                        var sum = 0;
                        for (var k = 0; k < prevLayer.neurons.length; k++) {
                            sum += prevLayer.neurons[k].value * neuron.edges[k].weight;
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
    var Edge = (function () {
        function Edge() {
        }
        return Edge;
    }());
    nnpoc.Edge = Edge;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Neuron = (function () {
        function Neuron() {
        }
        Neuron.prototype.populate = function (nInputs, random) {
            if (!nInputs)
                return;
            this.edges = [];
            for (var i = 0; i < nInputs; i++) {
                var edge = new nnpoc.Edge();
                edge.weight = random();
                this.edges.push(edge);
            }
        };
        return Neuron;
    }());
    nnpoc.Neuron = Neuron;
})(nnpoc || (nnpoc = {}));
var nnviz;
(function (nnviz) {
    "use strict";
    var m = angular.module("nnviz", [
        'monospaced.mousewheel'
    ]);
})(nnviz || (nnviz = {}));
var nnviz;
(function (nnviz) {
    var PlotController = (function () {
        function PlotController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.Graph3dOptions = {
                style: 'surface',
                zMin: 0,
                zMax: 1,
            };
            this.Graph2dNormalOptions = {
                style: 'surface',
                zMin: 0,
                zMax: 1,
                showPerspective: false,
                cameraPosition: { horizontal: 0.0, vertical: 3.14 }
            };
            this.GraphNetworkOptions = {
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
            this.onGraphNetworkSelect = function (params) {
                if (params.edges && params.edges.length == 1) {
                    var edgeID = params.edges[0];
                    var ids = edgeID.split("_");
                    var layerIndex = parseInt(ids[0]);
                    var neuronIndex = parseInt(ids[1]);
                    var edgeIndex = parseInt(ids[2]);
                    _this.SelectedEdge = _this.Network.layers[layerIndex].neurons[neuronIndex].edges[edgeIndex];
                    _this.$scope.$apply();
                }
                else if (_this.SelectedEdge) {
                    _this.SelectedEdge = null;
                    _this.$scope.$apply();
                }
            };
            this.Network = new nnpoc.Network();
            this.createPoints(-1, 1, Math.pow(2, -3));
            this.initGraphs();
            this.randomize();
        }
        PlotController.prototype.createPoints = function (min, max, step) {
            this.Points = [];
            for (var x = min; x <= max; x += step) {
                for (var y = min; y <= max; y += step) {
                    this.Points.push({ x: x, y: y });
                }
            }
        };
        PlotController.prototype.randomize = function () {
            this.Network.populate(2, [2], 1);
            this.calcData();
            this.redrawPlot();
            this.Network.calculate([0, 0]);
            this.redrawNetwork();
        };
        PlotController.prototype.calcData = function () {
            var _this = this;
            this.Graph3dData = [];
            this.Graph2dNormalData = [];
            this.Points.forEach(function (p) {
                var result = _this.Network.calculate([
                    p.x,
                    p.y
                ]);
                var z = result[0];
                _this.Graph3dData.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
                _this.Graph2dNormalData.push({
                    x: p.x,
                    y: p.y,
                    z: z > 0.5 ? 1 : 0
                });
            });
        };
        PlotController.prototype.initGraphs = function () {
            var _this = this;
            this.Graph3d = new vis.Graph3d(document.getElementById('graph3d'), this.Graph3dData, this.Graph3dOptions);
            this.Graph2dNormal = new vis.Graph3d(document.getElementById('graph2dNormal'), this.Graph2dNormalData, this.Graph2dNormalOptions);
            this.GraphNetwork = new vis.Network(document.getElementById('graphNetwork'), this.GraphNetworkData, this.GraphNetworkOptions);
            this.GraphNetwork.on("select", function (params) {
                _this.onGraphNetworkSelect(params);
            });
        };
        PlotController.prototype.redrawPlot = function () {
            this.Graph3d.setData(this.Graph3dData);
            this.Graph2dNormal.setData(this.Graph2dNormalData);
        };
        PlotController.prototype.redrawNetwork = function () {
            var _this = this;
            var nodes = [];
            var edges = [];
            this.Network.layers.forEach(function (l, i) {
                l.neurons.forEach(function (n, j) {
                    var id = i + "_" + j;
                    nodes.push({
                        id: id,
                        label: (n.value || 0).toFixed(2),
                        color: _this.getValueColor(n.value || 0)
                    });
                    if (n.edges) {
                        n.edges.forEach(function (e, k) {
                            var fromID = i - 1 + "_" + k;
                            var edgeID = i + "_" + j + "_" + k;
                            edges.push({
                                id: edgeID,
                                from: fromID,
                                to: id,
                                label: e.weight.toFixed(2),
                                color: _this.getWeightColor(e.weight)
                            });
                        });
                    }
                });
            });
            this.GraphNetworkData = {
                nodes: nodes,
                edges: edges
            };
            this.GraphNetwork.setData(this.GraphNetworkData);
        };
        PlotController.prototype.onWheel = function ($event, $delta, $deltaX, $deltaY) {
            if (this.SelectedEdge) {
                console.log($deltaY);
                this.SelectedEdge.weight += -0.1 * $deltaY;
                this.onEdgeChange();
            }
        };
        PlotController.prototype.onEdgeChange = function () {
            this.calcData();
            this.redrawPlot();
            this.redrawNetwork();
        };
        PlotController.prototype.getValueColor = function (value) {
            var h = 240 - value * 240;
            return this.hsvToRgb(h, 1, 1);
        };
        PlotController.prototype.getWeightColor = function (value) {
            var h = 240 - ((value + 4) / 8) * 240;
            return this.hsvToRgb(h, 1, 1);
        };
        PlotController.prototype.hsvToRgb = function (h, v, s) {
            var c = v * s;
            var hp = h / 60;
            var x = c * (1 - Math.abs((hp % 2) - 1));
            var r1, g1, b1;
            if (hp < 0) {
                r1 = 0;
                g1 = 0;
                b1 = 0;
            }
            else if (hp < 1) {
                r1 = c;
                g1 = x;
                b1 = 0;
            }
            else if (hp < 2) {
                r1 = x;
                g1 = c;
                b1 = 0;
            }
            else if (hp < 3) {
                r1 = 0;
                g1 = c;
                b1 = x;
            }
            else if (hp < 4) {
                r1 = 0;
                g1 = x;
                b1 = c;
            }
            else if (hp < 5) {
                r1 = x;
                g1 = 0;
                b1 = c;
            }
            else if (hp < 6) {
                r1 = c;
                g1 = 0;
                b1 = x;
            }
            var m = v - c;
            var r = r1 + m;
            var g = g1 + m;
            var b = b1 + m;
            return 'rgb(' + Math.floor(r * 255) + ',' + Math.floor(g * 255) + ',' + Math.floor(b * 255) + ')';
        };
        return PlotController;
    }());
    nnviz.PlotController = PlotController;
    angular
        .module("nnviz")
        .controller("PlotController", PlotController);
})(nnviz || (nnviz = {}));
//# sourceMappingURL=nnpoc.js.map