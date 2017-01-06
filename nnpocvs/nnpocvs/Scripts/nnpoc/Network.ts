module nnpoc {
    export interface NetworkData {
        neurons: number[],
        weights: number[]
    }

    export class Network {
        layers: Layer[];

        activation(value: number): number {
            return (1 / (1 + Math.exp(-value)));
        }

        populate(options: NetworkOptions): void {
            this.layers = [];

            var layer = new Layer();
            layer.populate(options.inputs, 0, options.randomClamped);
            layer.neurons.push(new Neuron()); //add bias
            this.layers.push(layer);

            if (options.hiddens) {
                for (var i = 0; i < options.hiddens.length; i++) {
                    layer = new Layer();
                    layer.populate(options.hiddens[i], this.layers[i].neurons.length, options.randomClamped);
                    layer.neurons.push(new Neuron()); //add bias
                    this.layers.push(layer);
                }
            }

            layer = new Layer();
            layer.populate(options.outputs, this.layers[this.layers.length - 1].neurons.length, options.randomClamped);
            this.layers.push(layer);
        }

        calculate(inputs: number[]): number[] {
            var layer = this.layers[0];

            for (let i = 0; i < inputs.length; i++) {
                layer.neurons[i].value = inputs[i];
            }

            layer.neurons[layer.neurons.length - 1].value = 1;

            var prevLayer = layer;
            for (let i = 1; i < this.layers.length; i++) {
                layer = this.layers[i];
                prevLayer = this.layers[i - 1];
                for (let j = 0; j < layer.neurons.length; j++) {
                    var neuron = layer.neurons[j];

                    if (neuron.edges) {
                        var sum = 0;
                        for (let k = 0; k < prevLayer.neurons.length; k++) {
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
            for (let i = 0; i < layer.neurons.length; i++) {
                out.push(layer.neurons[i].value);
            }

            return out;
        }

        getData(): NetworkData {
            var data: NetworkData = {
                neurons: [],
                weights: []
            };

            this.layers.forEach(l => {
                data.neurons.push(l.neurons.length);
                l.neurons.forEach(n => {
                    if (n.edges) {
                        n.edges.forEach(e => {
                            data.weights.push(e.weight);
                        });
                    }
                });
            });

            return data;
        }

        setData(data: NetworkData): void {
            var previousNeurons = 0;
            var index = 0;
            this.layers = [];

            data.neurons.forEach((neurons, i) => {
                var layer = new Layer();
                layer.populate(neurons, previousNeurons, undefined);          
                //remove edges for the biases.
                if (i < data.neurons.length - 1)                          
                    layer.neurons[layer.neurons.length - 1].edges = undefined;
                layer.neurons.forEach(neuron => {
                    if (neuron.edges) {
                        neuron.edges.forEach(edge => {
                            edge.weight = data.weights[index];
                            index++;
                        });
                    }
                });                
                this.layers.push(layer);
                previousNeurons = neurons;
            });
        }

        clone(): Network {
            var n = new Network();
            n.setData(this.getData());
            return n;
        }
    }
}