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
    var Network = (function () {
        function Network() {
        }
        Network.prototype.activation = function (value) {
            return (1 / (1 + Math.exp(-value)));
        };
        Network.prototype.random = function () {
            return Math.round(((Math.random() * 2 - 1) * 4) * 10) / 10;
        };
        Network.prototype.populate = function (options) {
            this.layers = [];
            var layer = new nnpoc.Layer();
            layer.populate(options.Inputs, 0, this.random);
            layer.neurons.push(new nnpoc.Neuron()); //add bias
            this.layers.push(layer);
            if (options.Hiddens) {
                for (var i = 0; i < options.Hiddens.length; i++) {
                    layer = new nnpoc.Layer();
                    layer.populate(options.Hiddens[i], this.layers[i].neurons.length, this.random);
                    layer.neurons.push(new nnpoc.Neuron()); //add bias
                    this.layers.push(layer);
                }
            }
            layer = new nnpoc.Layer();
            layer.populate(options.Outputs, this.layers[this.layers.length - 1].neurons.length, this.random);
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
var nnpoc;
(function (nnpoc) {
    var Points = (function () {
        function Points() {
        }
        Points.createPoints2d = function (min, max, resolution) {
            var points = [];
            var step = Math.pow(2, -resolution);
            for (var x = min; x <= max; x += step) {
                for (var y = min; y <= max; y += step) {
                    points.push({ x: x, y: y });
                }
            }
            return points;
        };
        return Points;
    }());
    nnpoc.Points = Points;
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
    var NNEvoController = (function () {
        function NNEvoController($scope) {
            this.$scope = $scope;
            this.TargetFunc = function (x, y) { return x * y + 2 * x + -3 * y - 1; };
            this.Points = nnpoc.Points.createPoints2d(-1, 1, 3);
            this.Graph3dOptions = {
                style: 'surface',
            };
            this.initGraphs();
            this.calcData();
            this.redrawPlot();
        }
        NNEvoController.prototype.calcData = function () {
            var _this = this;
            this.Graph3dData = [];
            this.Points.forEach(function (p) {
                var z = _this.TargetFunc(p.x, p.y);
                _this.Graph3dData.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            });
        };
        NNEvoController.prototype.initGraphs = function () {
            this.Graph3d = new vis.Graph3d(document.getElementById('graph3d'), this.Graph3dData, this.Graph3dOptions);
        };
        NNEvoController.prototype.redrawPlot = function () {
            this.Graph3d.setData(this.Graph3dData);
        };
        return NNEvoController;
    }());
    nnviz.NNEvoController = NNEvoController;
    angular
        .module("nnviz")
        .controller("NNEvoController", NNEvoController);
})(nnviz || (nnviz = {}));
var nnviz;
(function (nnviz) {
    var NNInteractController = (function () {
        function NNInteractController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.NetworkOptions = {
                Inputs: 2,
                Hiddens: [2],
                Outputs: 1
            };
            this.TestInput = [0, 0];
            this.Points = nnpoc.Points.createPoints2d(-1, 1, 3);
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
            this.initGraphs();
            this.randomize();
        }
        NNInteractController.prototype.randomize = function () {
            this.Network.populate(this.NetworkOptions);
            this.redraw();
        };
        NNInteractController.prototype.calcData = function () {
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
        NNInteractController.prototype.initGraphs = function () {
            var _this = this;
            this.Graph3d = new vis.Graph3d(document.getElementById('graph3d'), this.Graph3dData, this.Graph3dOptions);
            this.Graph2dNormal = new vis.Graph3d(document.getElementById('graph2dNormal'), this.Graph2dNormalData, this.Graph2dNormalOptions);
            this.GraphNetwork = new vis.Network(document.getElementById('graphNetwork'), this.GraphNetworkData, this.GraphNetworkOptions);
            this.GraphNetwork.on("select", function (params) {
                _this.onGraphNetworkSelect(params);
            });
        };
        NNInteractController.prototype.redrawPlot = function () {
            this.Graph3d.setData(this.Graph3dData);
            this.Graph2dNormal.setData(this.Graph2dNormalData);
        };
        NNInteractController.prototype.redrawNetwork = function () {
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
        NNInteractController.prototype.onWheel = function ($event, $delta, $deltaX, $deltaY) {
            if (this.SelectedEdge) {
                this.SelectedEdge.weight += -0.1 * $deltaY;
                this.redraw();
            }
        };
        NNInteractController.prototype.redraw = function () {
            this.calcData();
            this.redrawPlot();
            this.Network.calculate(this.TestInput);
            this.redrawNetwork();
        };
        NNInteractController.prototype.getValueColor = function (value) {
            var h = 240 - value * 240;
            return this.hsvToRgb(h, 1, 1);
        };
        NNInteractController.prototype.getWeightColor = function (value) {
            var h = 240 - ((value + 4) / 8) * 240;
            return this.hsvToRgb(h, 1, 1);
        };
        NNInteractController.prototype.hsvToRgb = function (h, v, s) {
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
        return NNInteractController;
    }());
    nnviz.NNInteractController = NNInteractController;
    angular
        .module("nnviz")
        .controller("NNInteractController", NNInteractController);
})(nnviz || (nnviz = {}));
//# sourceMappingURL=nnpoc.js.map