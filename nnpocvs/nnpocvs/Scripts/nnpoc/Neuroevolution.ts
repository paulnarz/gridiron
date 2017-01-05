module nnpoc {
    export interface NeuroevolutionOptions {
        population: number;
        elitism: number;
        randomBehaviour: number;
        mutationRate: number;
        mutationRange: number;
        nbChild: number;
        network: NetworkOptions;
    }

    export class Neuroevolution {
        private genomes: Genome[];

        constructor(private options: NeuroevolutionOptions) {
        }

        reset(): void {
            this.genomes = undefined;
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
            var nexts: Network[] = [];

            this.genomes.sort((a, b) => a.score - b.score);

            for (let i = 0, l = Math.round(this.options.elitism * this.options.population); i < l ; i++) {
                if (nexts.length < this.options.population) {
                    var n = new Network();                    
                    n.setData(this.genomes[i].network);
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

            var max = 0;
            while (nexts.length < this.options.population) {
                for (var i = 0; i < max; i++) {
                    var childs = this.breed(this.genomes[i], this.genomes[max], (this.options.nbChild > 0 ? this.options.nbChild : 1));                    
                    for (var c in childs) {
                        var n = new Network();
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
        }

        breed(g1: Genome, g2: Genome, nbChilds: number): Genome[] {
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
        }

        networkScore(network: Network, score: number) {
            this.genomes.push({
                network: network.getData(),
                score: score
            });
        }
    }
}