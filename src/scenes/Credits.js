class Credits extends Phaser.Scene {
  constructor() {
      super("creditsScene");
  }

  preload() {
  }

  create() {
      let menuConfig = {
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

      this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
      // display menu text
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'CREDITS', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'Music and sounds from Pixabay', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#00FF00';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press -> to return to menu', menuConfig).setOrigin(0.5);
      // define keys
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }
  update() {
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        game.settings = {
          gameTimer: Infinity  
        }
        this.sound.play('select');
        this.scene.start('menuScene');    
      }
  }
}