const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: "193940",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false,
		}
	},
	scene: [scene1, Phase1]//Adicionar cenas
};

const game = new Phaser.Game(config);
