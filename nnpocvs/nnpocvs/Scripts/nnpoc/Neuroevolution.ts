module nnpoc {
    interface NeuroevolutionOptions {
        population: number;
        elitism: number;
        randomBehaviour: number;
        network: NetworkOptions;
    }

    export class Neuroevolution {
        private genomes: Genome[];

        constructor(private options: NeuroevolutionOptions) {
        }

        nextGeneration(): Network[] {
            if (!this.genomes)
                return this.generateFirstGeneration();
            else
                return this.generateNextGeneration();
        }

        generateFirstGeneration(): Network[] {
            this.genomes = [];
            var out = [];
            for (var i = 0; i < this.options.population; i++) {
                var n = new Network();
                n.populate(this.options.network);
                out.push(n);
            }
            return out;
        }

        generateNextGeneration(): Network[] {            
            var nexts = [];

            this.genomes.sort((a, b) => a.score - b.score);

            for (let i = 0, l = Math.round(this.options.elitism * this.options.population); i < l ; i++) {
                if (nexts.length < this.options.population) {
                    var n = new Network();                    
                    n.setData(this.genomes[i].data);
                    nexts.push(n);
                }
            }

            for (let i = 0, l = Math.round(this.options.randomBehaviour * this.options.population); i < l; i++) {                
                if (nexts.length < this.options.population) {
                    var n = new Network();
                    n.populate(this.options.network);
                    nexts.push(n);
                }
            }

            this.genomes = [];            
            return nexts;
        }

        networkScore(network: Network, score: number) {
            this.genomes.push({
                data: network.getData(),
                score: score
            });
        }
    }
}