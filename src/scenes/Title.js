class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('background', './assets/background.png');
        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
    }

    create() {
        let titleConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
          top: 5,
          bottom: 5,
          },
          fixedWidth: 0
        }
        // animation configuration
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        // display title text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'RAIDER RUNNER', titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press SPACE to continue', titleConfig).setOrigin(0.5);
        titleConfig.backgroundColor = '#00FF00';
        titleConfig.color = '#000';
        console.log(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.sound.play('sfx-select');
          this.scene.start('menuScene');    
        }
    }
}