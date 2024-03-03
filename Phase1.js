//Cria todas as variaveis anteriormente devido à estruturação de cenas
var cowboy1;
var cowboy2;
var teclado;
var daley = 50;
var daley1 = 50;
var daley2 = 50;
var daley3 = 50;
var daley4 = 50;
var daley5 = 50;
var tiro;
var keys;
var tiro1;
var characterShoots = false;
var characterShoots1 = false;
var vida1 = 3;
var vida2 = 3;
var vida1txt;
var vida2txt;
var wintxt;

class Phase1 extends Phaser.Scene {
  constructor() {
    super({ key: "Phase1" });
  }

  //Carrega imagens
  preload() {
    this.load.image("fundoGame", "assets/fundoGame.png");
    this.load.image("tiro", "assets/tiro.png");
    this.load.image("coracao", "assets/coracao.png");
    this.load.spritesheet("cowboy", "assets/cowboys.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.add.image(400, 300, "fundoGame");

    vida1txt = this.add.text(10, 10, "Vidas: " + 3, {
      fontSize: "24px",
      fill: "#ffffff",
    });
    vida2txt = this.add.text(650, 10, "Vidas: " + 3, {
      fontSize: "24px",
      fill: "#ffffff",
    });

    //Animacoes cowboy1
    cowboy1 = this.physics.add
      .sprite(115, 500, "cowboy")
      .setScale(2)
      .setSize(10, 10);
    this.anims.create({
      key: "respira",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers("cowboy", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "atira",
      frameRate: 20,
      frames: this.anims.generateFrameNumbers("cowboy", {
        start: 4,
        end: 6,
      }),
    });

    //Animacoes cowboy2
    cowboy2 = this.physics.add
      .sprite(685, 500, "cowboy")
      .setScale(2)
      .setSize(10, 10);
    this.anims.create({
      key: "respira1",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers("cowboy", {
        start: 16,
        end: 19,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "atira1",
      frameRate: 20,
      frames: this.anims.generateFrameNumbers("cowboy", {
        start: 20,
        end: 22,
      }),
    });

    //inverte a imagem do cowboy2
    cowboy2.flipX = true;
    //cria a variavel teclado para usar as setas
    teclado = this.input.keyboard.createCursorKeys();
    //animacao default
    cowboy1.play("respira", true);
    cowboy2.play("respira1", true);

    keys = this.input.keyboard.addKeys("W,A,S,D");
    // -> { W: Key, A: Key, S: Key, D: Key
  }
  update() {
    //Uma serie de delays para facilitar o codigo, usados para as logicas de tiro e contagem de vida
    daley -= 1;
    daley1 -= 1;
    daley2 -= 1;
    daley3 -= 1;
    daley4 -= 1;
    daley5 -= 1;

    //movimentacao cowboy1

    if ((cowboy1.y > 390) & (cowboy1.y < 580) & (daley <= 0)) {
      if (keys.W.isDown) {
        cowboy1.play("respira", true);
        cowboy1.setVelocityY(-100);
      } else if (keys.S.isDown) {
        cowboy1.play("respira", true);
        cowboy1.setVelocityY(100);
      } else {
        cowboy1.setVelocityY(0);
      }
    } else {
      cowboy1.setVelocityY(0);
    }
    //movimentacao cowboy2
    if ((cowboy2.y > 390) & (cowboy2.y < 580) & (daley2 <= 0)) {
      if (teclado.up.isDown) {
        cowboy2.play("respira1", true);
        cowboy2.setVelocityY(-100);
      } else if (teclado.down.isDown) {
        cowboy2.play("respira1", true);
        cowboy2.setVelocityY(100);
      } else {
        cowboy2.setVelocityY(0);
      }
    } else {
      cowboy2.setVelocityY(0);
    }

    //codigo simples para resolver problema do cowboy saindo da tela
    cowboy1.y = Math.round(cowboy1.y);
    if (cowboy1.y <= 390) {
      cowboy1.y = 391;
    }
    if (cowboy1.y > 570) {
      cowboy1.y = 569;
    }
    if (cowboy2.y > 570) {
      cowboy2.y = 569;
    }
    if (cowboy2.y <= 390) {
      cowboy2.y = 391;
    }

    //Funcao de tiro do cowboy 1
    if (keys.D.isDown & (daley1 <= 0)) {
      cowboy1.play("atira", true);

      tiro = this.physics.add.image(cowboy1.x + 5, cowboy1.y + 13, "tiro");
      tiro.setVelocityX(450);
      daley = 80;
      daley1 = 300;
      characterShoots = true;
    }
    //funcao de tiro do cowboy 2
    if (teclado.left.isDown & (daley3 <= 0)) {
      cowboy2.play("atira1", true);
      tiro1 = this.physics.add.image(cowboy2.x - 5, cowboy2.y + 13, "tiro");
      tiro1.setVelocityX(-450);
      tiro1.flipX = true;
      daley2 = 80;
      daley3 = 300;
      characterShoots1 = true;
    }
    //delay para cowboy atirar enquanto sobe ou desce
    if (daley1 === 30) {
      cowboy1.play("respira", true);
    }
    if (daley3 === 30) {
      cowboy2.play("respira1", true);
    }

    //CODIGO DA LOGICA DE VIDAS COWBOY1
    if (
      characterShoots &&
      daley4 < 0 &&
      tiro &&
      cowboy2 &&
      Phaser.Geom.Intersects.RectangleToRectangle(
        tiro.getBounds(),
        cowboy2.getBounds()
      )
    ) {
      daley4 = 50;
      vida2 -= 1;
      vida2txt.destroy();
      vida2txt = this.add.text(650, 10, "Vidas: " + vida2, {
        fontSize: "24px",
        fill: "#ffffff",
      });
      if (vida2 <= 0) {
        wintxt = this.add.text(0, 200, "Player 1 Vence", {
          fontSize: "95px",
          fill: "#ffffff",
        });
        this.scene.pause();

        // Pausa a fisica
        this.physics.pause();

        // Pause animacoes
        this.tweens.pauseAll();
      }
    }
    //CODIGO DA LOGICA DE VIDAS COWBOY2

    if (
      characterShoots1 &&
      daley5 < 0 &&
      tiro1 &&
      cowboy1 &&
      Phaser.Geom.Intersects.RectangleToRectangle(
        tiro1.getBounds(),
        cowboy1.getBounds()
      )
    ) {
      daley5 = 50;
      vida1 -= 1;
      vida1txt.destroy();
      vida1txt = this.add.text(10, 10, "Vidas: " + vida1, {
        fontSize: "24px",
        fill: "#ffffff",
      });
      if (vida1 <= 0) {
        wintxt = this.add.text(0, 200, "Player 2 Vence", {
          fontSize: "95px",
          fill: "#ffffff",
        });
        this.scene.pause();

        // Pausa a fisica
        this.physics.pause();

        // pausa as animacoes
        this.tweens.pauseAll();
      }
    }
  }
}
