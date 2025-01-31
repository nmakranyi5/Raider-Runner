class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }

  preload() {
      // load images/tile sprites
      this.load.image('rocket', './assets/rocket.png');
      this.load.image('spaceship', './assets/spaceship.png');
      this.load.image('spaceship2', './assets/spaceship2.png');
      this.load.image('starfield', './assets/starfield.png');
      this.load.image('starfield2', './assets/starfield2.png');
      // load audio
      this.load.audio('sfx-select', './assets/sfx-select.wav')
      this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
      this.load.audio('sfx-explosion2', './assets/sfx-explosion2.wav')
      this.load.audio('sfx-explosion3', './assets/sfx-explosion3.wav')
      this.load.audio('sfx-explosion4', './assets/sfx-explosion4.wav')
      this.load.audio('sfx-explosion5', './assets/sfx-explosion5.wav')
      this.load.audio('sfx-shot', './assets/sfx-shot.wav')
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
      // display menu text
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Welcome to Raider Runner!', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'Use SPACE bar to jump', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#00FF00';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press -> to begin', menuConfig).setOrigin(0.5);
      // define keys
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }
  update() {
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // easy mode
        game.settings = {
          gameTimer: Infinity    
        }
        this.sound.play('sfx-select');
        this.scene.start('playScene');    
      }
  }
}