module nnpoc {
    export class Network {
        layers: Layer[];

        activation(value: number): number {
            return (1 / (1 + Math.exp(-value)));
        }

        random(): number {
            return Math.round(((Math.random() * 2 - 1) * 4) * 10) / 10;
        }

        populate(nInputs: number, hiddens: number[], output: number): void {
            this.layers = [];

            var layer = new Layer();
            layer.populate(nInputs, 0, this.random);
            layer.neurons.push(new Neuron()); //add bias
            this.layers.push(layer);


            if (hiddens) {
                for (var i = 0; i < hiddens.length; i++) {
                    layer = new Layer();
                    layer.populate(hiddens[i], this.layers[i].neurons.length, this.random);
                    layer.neurons.push(new Neuron()); //add bias
                    this.layers.push(layer);
                }
            }

            layer = new Layer();
            layer.populate(output, this.layers[this.layers.length - 1].neurons.length, this.random);
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
    }
}