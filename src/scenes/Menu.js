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
      // load audio
      this.load.audio('sfx-select', './assets/sfx-select.wav')

      // load spritesheet
      this.load.spritesheet('explosion', './assets/explosion.png', {
          frameWidth: 64,
          frameHeight: 32,
          startFrame: 0,
          endFrame: 9
      })
  }

  create() {
      // animation configuration
      this.anims.create({
        key: 'idle',
        frameRate: 0,
        repeat: -1,
        frames: this.anims.generateFrameNumbers('raider', {
            start: 7,
            end: 7
        })
      })

      this.anims.create({
          key: 'explode',
          frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
          frameRate: 30
      })

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
      menuConfig.backgroundColor = '#00FF00';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press -> to begin', menuConfig).setOrigin(0.5);
      // define keys
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }
  update() {
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        game.settings = {
          gameTimer: Infinity  
        }
        this.sound.play('sfx-select');
        this.scene.start('playScene');    
      }
  }
}