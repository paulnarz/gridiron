module nnpoc {
    export class Layer {
        neurons: Neuron[];        

        populate(nNeurons: number, nInputs: number, random: () => number): void {
            this.neurons = [];
            for (var i = 0; i < nNeurons; i++) {
                var n = new Neuron();
                n.populate(nInputs, random);
                this.neurons.push(n);
            }
        }
    }
}