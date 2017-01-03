module nnlunar {
    export class LunarGamePhaser {
        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, "content", {
                preload: this.preload,
                create: this.create                
            });
        }


        preload(): void {
            console.log("preload");            
        }

        create(): void {
            console.log("create");
        }
    }
}