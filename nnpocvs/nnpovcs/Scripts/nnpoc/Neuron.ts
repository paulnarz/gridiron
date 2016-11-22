module nnpoc {
    export class Neuron {
        value: number;
        weights: number[];

        populate(nInputs: number, random: () => number): void {
            if (!nInputs)
                return;

            this.weights = [];
            for (var i = 0; i < nInputs; i++) {
                this.weights.push(random());
            }
        }
    }
}