var nnpoc;
(function (nnpoc) {
    var Color = (function () {
        function Color() {
        }
        Color.hsvToRgb = function (h, v, s) {
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
        Color.getValueColor = function (value) {
            var h = 240 - (value || 0) * 240;
            return Color.hsvToRgb(h, 1, 1);
        };
        return Color;
    }());
    nnpoc.Color = Color;
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
    var FuncTrainer = (function () {
        function FuncTrainer(targetFunc, points) {
            this.FuncMin = 0;
            this.FuncMax = 0;
            this.Options = {
                Inputs: 2,
                Hiddens: [2],
                Outputs: 1
            };
            this.TargetFunc = targetFunc;
            this.Points = points;
            //start with a random best.
            this.Best = new nnpoc.Network();
            this.Best.populate(this.Options);
            this.initFunc();
            this.NEvo = new nnpoc.Neuroevolution();
        }
        FuncTrainer.prototype.initFunc = function () {
            var _this = this;
            this.FuncMin = Infinity;
            this.FuncMax = -Infinity;
            this.Points.forEach(function (p) {
                var z = _this.TargetFunc(p.x, p.y);
                if (z < _this.FuncMin)
                    _this.FuncMin = z;
                if (z > _this.FuncMax)
                    _this.FuncMax = z;
            });
        };
        FuncTrainer.prototype.calc = function (x, y) {
            var z = this.Best.calculate([x, y])[0];
            return nnpoc.MathH.expand(z, this.FuncMin, this.FuncMax);
        };
        FuncTrainer.prototype.train = function () {
            this.Best.populate(this.Options);
        };
        return FuncTrainer;
    }());
    nnpoc.FuncTrainer = FuncTrainer;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Graph = (function () {
        function Graph() {
        }
        Graph.init3d = function (elementId, options) {
            return new vis.Graph3d(document.getElementById(elementId), undefined, options);
        };
        Graph.initNetwork = function (elementId, options) {
            return new vis.Network(document.getElementById(elementId), undefined, options);
        };
        Graph.calcNetworkData = function (network, points) {
            var data = [];
            points.forEach(function (p) {
                var z = network.calculate([p.x, p.y])[0];
                data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            });
            return data;
        };
        Graph.map3d = function (data, func) {
            var result = [];
            data.forEach(function (p) {
                result.push(func(p));
            });
            return result;
        };
        Graph.calcData = function (func, points) {
            var data = [];
            points.forEach(function (p) {
                var z = func(p.x, p.y);
                data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            });
            return data;
        };
        Graph.buildNodes = function (network) {
            var nodes = [];
            var edges = [];
            network.layers.forEach(function (l, li) {
                l.neurons.forEach(function (n, ni) {
                    var id = li + "_" + ni;
                    nodes.push({
                        id: id,
                        label: (n.value || 0).toFixed(2),
                        color: nnpoc.Color.getValueColor(n.value || 0)
                    });
                    if (n.edges) {
                        n.edges.forEach(function (e, ei) {
                            var fromID = li - 1 + "_" + ei;
                            var edgeID = li + "_" + ni + "_" + ei;
                            edges.push({
                                id: edgeID,
                                from: fromID,
                                to: id,
                                label: e.weight.toFixed(2),
                                color: nnpoc.Color.getValueColor(nnpoc.MathH.normalize(e.weight, -4, 4))
                            });
                        });
                    }
                });
            });
            return {
                nodes: nodes,
                edges: edges
            };
        };
        Graph.NetworkGraph = {
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
        Graph.SurfaceGraph = {
            style: 'surface'
        };
        Graph.SurfaceGraphZeroOne = {
            style: 'surface',
            zMin: 0,
            zMax: 1,
        };
        Graph.OverHead = {
            style: 'surface',
            zMin: 0,
            zMax: 1,
            showPerspective: false,
            cameraPosition: { horizontal: 0.0, vertical: 3.14 }
        };
        return Graph;
    }());
    nnpoc.Graph = Graph;
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
    var MathH = (function () {
        function MathH() {
        }
        MathH.normalize = function (value, min, max) {
            return ((value || 0) + min) / (max - min);
        };
        MathH.expand = function (value, min, max) {
            return (value || 0) * (max - min) + min;
        };
        return MathH;
    }());
    nnpoc.MathH = MathH;
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
    var Neuroevolution = (function () {
        function Neuroevolution() {
        }
        Neuroevolution.prototype.restart = function () {
        };
        Neuroevolution.prototype.nextGeneration = function () {
            var networks = [];
            return networks;
        };
        return Neuroevolution;
    }());
    nnpoc.Neuroevolution = Neuroevolution;
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
            this.Trainer = new nnpoc.FuncTrainer(this.TargetFunc, this.Points);
            this.initGraphs();
            this.drawTarget();
            this.drawBest();
        }
        NNEvoController.prototype.initGraphs = function () {
            this.Graph3dTarget = nnpoc.Graph.init3d("graph3dTarget", nnpoc.Graph.SurfaceGraph);
            this.Graph3dBest = nnpoc.Graph.init3d("graph3dBest", nnpoc.Graph.SurfaceGraph);
            this.GraphNetwork = nnpoc.Graph.initNetwork("graphNetwork", nnpoc.Graph.NetworkGraph);
        };
        NNEvoController.prototype.drawTarget = function () {
            var _this = this;
            this.Graph3dTarget.setData(nnpoc.Graph.calcData(function (x, y) { return _this.TargetFunc(x, y); }, this.Points));
        };
        NNEvoController.prototype.drawBest = function () {
            var _this = this;
            this.Graph3dBest.setData(nnpoc.Graph.calcData(function (x, y) { return _this.Trainer.calc(x, y); }, this.Points));
            this.GraphNetwork.setData(nnpoc.Graph.buildNodes(this.Trainer.Best));
        };
        NNEvoController.prototype.train = function () {
            this.Trainer.train();
            this.drawBest();
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
        NNInteractController.prototype.initGraphs = function () {
            var _this = this;
            this.Graph3d = nnpoc.Graph.init3d("graph3d", nnpoc.Graph.SurfaceGraphZeroOne);
            this.Graph2dNormal = nnpoc.Graph.init3d("graph2dNormal", nnpoc.Graph.OverHead);
            this.GraphNetwork = nnpoc.Graph.initNetwork("graphNetwork", nnpoc.Graph.NetworkGraph);
            this.GraphNetwork.on("select", function (params) {
                _this.onGraphNetworkSelect(params);
            });
        };
        NNInteractController.prototype.randomize = function () {
            this.Network.populate(this.NetworkOptions);
            this.redraw();
        };
        NNInteractController.prototype.redraw = function () {
            var data = nnpoc.Graph.calcNetworkData(this.Network, this.Points);
            var normal = nnpoc.Graph.map3d(data, (function (p) {
                return {
                    x: p.x,
                    y: p.y,
                    z: p.z > 0.5 ? 0.8 : 0.2
                };
            }));
            this.Graph3d.setData(data);
            this.Graph2dNormal.setData(normal);
            this.Network.calculate(this.TestInput);
            this.GraphNetwork.setData(nnpoc.Graph.buildNodes(this.Network));
        };
        NNInteractController.prototype.onWheel = function ($event, $delta, $deltaX, $deltaY) {
            if (this.SelectedEdge) {
                this.SelectedEdge.weight += -0.1 * $deltaY;
                this.redraw();
            }
        };
        return NNInteractController;
    }());
    nnviz.NNInteractController = NNInteractController;
    angular
        .module("nnviz")
        .controller("NNInteractController", NNInteractController);
})(nnviz || (nnviz = {}));
//# sourceMappingURL=nnpoc.js.map