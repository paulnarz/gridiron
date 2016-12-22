module nnpoc {
    export interface NetworkOptions {
        inputs: number;
        hiddens: number[];
        outputs: number;
        randomClamped: () => number;
    }
}