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
            this.TargetFunc = targetFunc;
            this.Points = points;
            this.initFunc();
            this.NEvo = new nnpoc.Neuroevolution({
                population: 50,
                elitism: 0.2,
                randomBehaviour: 0.2,
                mutationRate: 0.1,
                mutationRange: 0.5,
                nbChild: 1,
                network: {
                    inputs: 2,
                    hiddens: [3, 3],
                    outputs: 1,
                    randomClamped: function () { return Math.random() * 8 - 4; }
                }
            });
            this.train();
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
        FuncTrainer.prototype.getBest = function () {
            return this.Networks[0].network;
        };
        FuncTrainer.prototype.calc = function (x, y) {
            var z = this.getBest().calculate([x, y])[0];
            return nnpoc.MathH.expand(z, this.FuncMin, this.FuncMax);
        };
        FuncTrainer.prototype.train = function () {
            var _this = this;
            this.Networks = [];
            var networks = this.NEvo.nextGeneration();
            networks.forEach(function (network, i) {
                var score = 0;
                _this.Points.forEach(function (p) {
                    var tv = _this.TargetFunc(p.x, p.y);
                    var nv = nnpoc.MathH.expand(network.calculate([p.x, p.y])[0], _this.FuncMin, _this.FuncMax);
                    score += (tv - nv) * (tv - nv);
                });
                _this.NEvo.networkScore(network, score);
                _this.Networks.push({
                    network: network,
                    score: score
                });
            });
            this.Networks.sort(function (a, b) { return a.score - b.score; });
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
        Graph.SurfaceGraph = function (zMin, zMax) {
            return {
                style: 'surface',
                zMin: zMin,
                zMax: zMax,
            };
        };
        Graph.OverHead = function (zMin, zMax) {
            return {
                style: 'surface',
                zMin: zMin,
                zMax: zMax,
                showPerspective: false,
                cameraPosition: { horizontal: 0.0, vertical: 3.14 }
            };
        };
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
        Graph.calcNetworkDataExpand = function (network, points, min, max) {
            var data = [];
            points.forEach(function (p) {
                var z = network.calculate([p.x, p.y])[0];
                z = nnpoc.MathH.expand(z, min, max);
                data.push({
                    x: p.x,
                    y: p.y,
                    z: z
                });
            });
            return data;
        };
        Graph.mapToDecision = function (data, cutoff, high, low) {
            var result = [];
            data.forEach(function (p) {
                result.push({
                    x: p.x,
                    y: p.y,
                    z: p.z > cutoff ? high : low
                });
            });
            return result;
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
                                label: (e.weight || 0).toFixed(2),
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
        Network.prototype.populate = function (options) {
            this.layers = [];
            var layer = new nnpoc.Layer();
            layer.populate(options.inputs, 0, options.randomClamped);
            layer.neurons.push(new nnpoc.Neuron()); //add bias
            this.layers.push(layer);
            if (options.hiddens) {
                for (var i = 0; i < options.hiddens.length; i++) {
                    layer = new nnpoc.Layer();
                    layer.populate(options.hiddens[i], this.layers[i].neurons.length, options.randomClamped);
                    layer.neurons.push(new nnpoc.Neuron()); //add bias
                    this.layers.push(layer);
                }
            }
            layer = new nnpoc.Layer();
            layer.populate(options.outputs, this.layers[this.layers.length - 1].neurons.length, options.randomClamped);
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
        Network.prototype.getData = function () {
            var data = {
                neurons: [],
                weights: []
            };
            this.layers.forEach(function (l) {
                data.neurons.push(l.neurons.length);
                l.neurons.forEach(function (n) {
                    if (n.edges) {
                        n.edges.forEach(function (e) {
                            data.weights.push(e.weight);
                        });
                    }
                });
            });
            return data;
        };
        Network.prototype.setData = function (data) {
            var _this = this;
            var previousNeurons = 0;
            var index = 0;
            this.layers = [];
            data.neurons.forEach(function (neurons, i) {
                var layer = new nnpoc.Layer();
                layer.populate(neurons, previousNeurons, undefined);
                //remove edges for the biases.
                if (i < data.neurons.length - 1)
                    layer.neurons[layer.neurons.length - 1].edges = undefined;
                layer.neurons.forEach(function (neuron) {
                    if (neuron.edges) {
                        neuron.edges.forEach(function (edge) {
                            edge.weight = data.weights[index];
                            index++;
                        });
                    }
                });
                _this.layers.push(layer);
                previousNeurons = neurons;
            });
        };
        return Network;
    }());
    nnpoc.Network = Network;
})(nnpoc || (nnpoc = {}));
var nnpoc;
(function (nnpoc) {
    var Neuroevolution = (function () {
        function Neuroevolution(options) {
            this.options = options;
        }
        Neuroevolution.prototype.nextGeneration = function () {
            if (!this.genomes)
                return this.generateFirstGeneration();
            else
                return this.generateNextGeneration();
        };
        Neuroevolution.prototype.generateFirstGeneration = function () {
            this.genomes = [];
            var out = [];
            for (var i = 0; i < this.options.population; i++) {
                var n = new nnpoc.Network();
                n.populate(this.options.network);
                out.push(n);
            }
            return out;
        };
        Neuroevolution.prototype.generateNextGeneration = function () {
            var nexts = [];
            this.genomes.sort(function (a, b) { return a.score - b.score; });
            for (var i_1 = 0, l = Math.round(this.options.elitism * this.options.population); i_1 < l; i_1++) {
                if (nexts.length < this.options.population) {
                    var n = new nnpoc.Network();
                    n.setData(this.genomes[i_1].network);
                    nexts.push(n);
                }
            }
            for (var i_2 = 0, l = Math.round(this.options.randomBehaviour * this.options.population); i_2 < l; i_2++) {
                if (nexts.length < this.options.population) {
                    var n = new nnpoc.Network();
                    n.populate(this.options.network);
                    nexts.push(n);
                }
            }
            var max = 0;
            while (nexts.length < this.options.population) {
                for (var i = 0; i < max; i++) {
                    var childs = this.breed(this.genomes[i], this.genomes[max], (this.options.nbChild > 0 ? this.options.nbChild : 1));
                    for (var c in childs) {
                        var n = new nnpoc.Network();
                        n.setData(childs[c].network);
                        nexts.push(n);
                        if (nexts.length >= this.options.population) {
                            break;
                        }
                    }
                }
                max++;
                if (max >= this.genomes.length - 1) {
                    max = 0;
                }
            }
            this.genomes = [];
            return nexts;
        };
        Neuroevolution.prototype.breed = function (g1, g2, nbChilds) {
            var datas = [];
            for (var nb = 0; nb < nbChilds; nb++) {
                var data = JSON.parse(JSON.stringify(g1));
                for (var i in g2.network.weights) {
                    if (Math.random() <= 0.5) {
                        data.network.weights[i] = g2.network.weights[i];
                    }
                }
                for (var i in data.network.weights) {
                    if (Math.random() <= this.options.mutationRate) {
                        data.network.weights[i] += Math.random() * this.options.mutationRange * 2 - this.options.mutationRange;
                    }
                }
                datas.push(data);
            }
            return datas;
        };
        Neuroevolution.prototype.networkScore = function (network, score) {
            this.genomes.push({
                network: network.getData(),
                score: score
            });
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
                if (random)
                    edge.weight = random();
                else
                    edge.weight = 0;
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
            this.TargetFunc = function (x, y) { return 2 * x * x - 3 * y * x + y * 4 - 3; };
            this.Points = nnpoc.Points.createPoints2d(-1, 1, 3);
            this.Trainer = new nnpoc.FuncTrainer(this.TargetFunc, this.Points);
            this.Network = this.Trainer.getBest();
            this.Network2 = new nnpoc.Network();
            this.initGraphs();
            this.drawTarget();
            this.drawNetwork();
        }
        NNEvoController.prototype.initGraphs = function () {
            this.Graph3dTarget = nnpoc.Graph.init3d("graph3dTarget", nnpoc.Graph.SurfaceGraph());
            this.Graph3dBest = nnpoc.Graph.init3d("graph3dBest", nnpoc.Graph.SurfaceGraph(this.Trainer.FuncMin, this.Trainer.FuncMax));
            this.Graph2dTarget = nnpoc.Graph.init3d("graph2dTarget", nnpoc.Graph.OverHead(-1, 1));
            this.Graph2dBest = nnpoc.Graph.init3d("graph2dBest", nnpoc.Graph.OverHead(-1, 1));
            this.GraphNetwork = nnpoc.Graph.initNetwork("graphNetwork", nnpoc.Graph.NetworkGraph);
        };
        NNEvoController.prototype.drawTarget = function () {
            var _this = this;
            var data = nnpoc.Graph.calcData(function (x, y) { return _this.TargetFunc(x, y); }, this.Points);
            var data2d = nnpoc.Graph.mapToDecision(data, 0, 1, -1);
            this.Graph3dTarget.setData(data);
            this.Graph2dTarget.setData(data2d);
        };
        NNEvoController.prototype.drawNetwork = function () {
            var data = nnpoc.Graph.calcNetworkDataExpand(this.Network, this.Points, this.Trainer.FuncMin, this.Trainer.FuncMax);
            var data2d = nnpoc.Graph.mapToDecision(data, 0, 1, -1);
            this.Graph3dBest.setData(data);
            this.Graph2dBest.setData(data2d);
            this.Network.calculate([0, 0]);
            this.Network2.setData(this.Network.getData());
            //this.Network2.calculate([0, 0]);
            this.GraphNetwork.setData(nnpoc.Graph.buildNodes(this.Network));
        };
        NNEvoController.prototype.train = function () {
            this.Trainer.train();
            this.Network = this.Trainer.getBest();
            this.drawNetwork();
        };
        NNEvoController.prototype.selectNetwork = function (network) {
            this.Network = network;
            this.drawNetwork();
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
                inputs: 2,
                hiddens: [2],
                outputs: 1,
                randomClamped: function () { return Math.round(((Math.random() * 2 - 1) * 4) * 10) / 10; }
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
            this.Graph3d = nnpoc.Graph.init3d("graph3d", nnpoc.Graph.SurfaceGraph(0, 1));
            this.Graph2dNormal = nnpoc.Graph.init3d("graph2dNormal", nnpoc.Graph.OverHead(0, 1));
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
            var normal = nnpoc.Graph.mapToDecision(data, 0.5, 0.8, 0.2);
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