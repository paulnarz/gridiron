module nnpoc {
    export class Neuron {
        value: number;
        edges: Edge[];

        populate(nInputs: number, random: () => number): void {
            if (!nInputs)
                return; 
            this.edges = [];
            for (var i = 0; i < nInputs; i++) {
                var edge = new Edge();                
                if (random)
                    edge.weight = random();
                else
                    edge.weight = 0;
                this.edges.push(edge);
            }
        }
    }
}