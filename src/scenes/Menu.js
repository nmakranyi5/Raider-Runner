class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }

  preload() {
      // load images/tile sprites
      this.load.image('background', './assets/background.png');
      this.load.spritesheet('raider', './assets/spritesheets/raider.png', {
        frameWidth: 48
      })
      this.load.image('axe', './assets/axe.png')
      this.load.image('coin', './assets/coin.png')
      this.load.image('barricade', './assets/barricade.png')
      this.load.image('knight', './assets/knight.png')
      // load audio
      this.load.audio('coinpickup', './assets/audio/coinpickup.wav')
      this.load.audio('knighthit', './assets/audio/knighthit.mp3')
      this.load.audio('barricadehit', './assets/audio/barricadehit.mp3')
      this.load.audio('jump', './assets/audio/jump.mp3')
      this.load.audio('gameplayMusic', './assets/audio/gameplay.mp3')
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
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Welcome to Raider Runner!', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'Use SPACE to jump, LEFTCLICK to attack', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press C for credits', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#00FF00';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding * 5, 'Press -> to begin', menuConfig).setOrigin(0.5);
      // define keys
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
  }
  update() {
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        if (this.music) {
          this.music.stop();
        }
        this.sound.play('select');
        this.scene.start('playScene');    
      }
      if (Phaser.Input.Keyboard.JustDown(keyC)) {
        this.sound.play('select');
        this.scene.start('creditsScene');    
      }
  }
}