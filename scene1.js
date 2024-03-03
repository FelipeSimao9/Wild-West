var jogar;

class scene1 extends Phaser.Scene {
    constructor() {
      super({ key: "scene1" });
    }

    preload()
    {
        this.load.image("fundo","assets/fundo.png");
        this.load.image("wildWest", "assets/wildWest.png")
        this.load.image("jogar", "assets/jogar.png")
    }

    create()
    {
        this.add.image(400,300,"fundo")
        this.add.image(400,125,"wildWest")
        jogar = this.add.image(400,200,"jogar")
        
        jogar.setInteractive({ cursor: "pointer" }); // Torna o botão interativo

        jogar.on('pointerdown', () => {
            this.scene.stop('scene1')//Acaba essa cena
            this.scene.start('Phase1')//Comeca a cena x
          // Substitua a linha acima com a lógica que você precisar para iniciar o jogo.
        });

    }

    update()
    {

    }
}