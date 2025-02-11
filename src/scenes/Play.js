let highScore = 0;
let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: 'white',
    color: '#843605',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
}

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // creating moving animation
        this.anims.create({
            key: 'walk-right',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('raider', {
                start: 6,
                end: 8
            })
        })

        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // adding ground
        this.ground = this.add.rectangle(game.config.width / 2, game.config.height - borderUISize * 1.5, game.config.width, borderUISize);
        this.physics.add.existing(this.ground, true);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // add raider (player 1)
        this.player = this.physics.add.sprite(game.config.width/4, game.config.height - borderUISize - borderPadding * 7, 'raider', 7).setScale(1.5)
        this.player.anims.play('walk-right', true);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);
        this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.9);
        this.player.setGravityY(1000);

        // adding axe
        this.axe = this.physics.add.sprite(this.player.x, this.player.y, 'axe').setScale(1.5).setOrigin(0.5, 0).setVisible(false).setActive(false);
        this.axe.body.setEnable(false);
        this.lastAxeThrow = 0;

        // define keys
        keyATTACK = this.input.activePointer;
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        // initialize score
        this.p1Score = 0;

        // configs
        let highScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: 'white',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }

        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: 'white',
            color: '#843605',
            align: 'center',
            padding: {
                top: 2,
                right: 4,
            },
            fixedWidth: 100
        }

        // displaying score, high score, and time
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.highScoreText = this.add.text(borderUISize + 467, borderUISize + borderPadding*2, highScore, highScoreConfig);
        this.timerText = this.add.text(game.config.width / 2, borderUISize + borderPadding * 4.3, 0, timeConfig).setOrigin(0.5, 0);

        // GAME OVER flag
        this.gameOver = false;

        // code for displaying the elapsed time
        this.timePassed = 0;
        this.time.addEvent({
            delay: 1000, // update every second
            callback: () => {
                if (this.gameOver === false) {
                    this.timePassed += 1000; // reduce timer by 1 second
                    this.timerText.setText(this.timePassed / 1000); // update text display
                    this.p1Score += 10;
                    this.scoreLeft.setText(this.p1Score);
                }
            },
            loop: true
        });

        // adding background gameplay music
        this.music = this.sound.add('gameplayMusic', {
            loop: true,
            volume: 0.5
        });
        this.music.play();

        // adding event for spawning barricade
        this.time.addEvent({
            delay: Phaser.Math.Between(2500, 3000),
            callback: this.spawnBarricade,
            callbackScope: this,
            loop: true
        });

        // adding event for spawning coin
        this.time.addEvent({
            delay: Phaser.Math.Between(4000, 5000),
            callback: this.spawnCoin,
            callbackScope: this,
            loop: true
        });

        // adding event for spawning knight
        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 2000),
            callback: this.spawnKnight,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        // axe cooldown timer
        if (this.gameOver === false && keyATTACK.isDown) {
            let currentTime = this.time.now;
            if (currentTime - this.lastAxeThrow > 1500) {
                this.throwAxe();
                this.lastAxeThrow = currentTime;
            }
        }

        // disabling the axe after being thrown
        if (this.axe.x > game.config.width - borderUISize - 15) {
            this.axe.setActive(false).setVisible(false);
            this.axe.setVelocityX(0);
            this.axe.body.setEnable(false);
        }

        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            if (this.music) {
                this.music.stop();
            }
            this.scene.restart()
        }

        // if left arrow pressed, stopping the music and going back to menu scene
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            if (this.music) {
                this.music.stop();
            }
            this.scene.start("menuScene")
        }

        // player jumping
        if (Phaser.Input.Keyboard.JustDown(keyJUMP) && this.player.body.touching.down && this.gameOver === false) {
            this.sound.play('jump');
            this.player.setVelocityY(-500);
        }

        // displaying game over text
        if(this.gameOver === true)
        {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.player.setVisible(false);
        }

        // simulating the moving background
        this.background.tilePositionX += 4;

        // updating high score
        if(highScore < this.p1Score)
        {
            highScore = this.p1Score;
        }
    }

    throwAxe() {
        if (!this.axe.active) {
            this.axe.setPosition(this.player.x, this.player.y);
            this.axe.setVisible(true);
            this.axe.setActive(true);
            this.axe.setVelocityX(400);
            this.axe.setAngularVelocity(100);
            this.axe.body.setEnable(true);
        }
    }

    spawnBarricade() {
        if(this.gameOver === false) {
            let x = 800;
            let y = 380;
            let barricade = this.physics.add.sprite(x, y, 'barricade').setScale(2)
            this.physics.add.collider(this.player, barricade, this.handlePlayerObstacleCollision, null, this);
            this.physics.add.collider(this.axe, barricade, this.handleAxeCollision, null, this);
            barricade.body.setSize(barricade.width * 0.6, barricade.height * 0.6);
            barricade.setVelocityX(-200);
            barricade.setImmovable(true);
            barricade.body.allowGravity = false;
    
            if (barricade.x < 100) {
                barricade.destroy();
            }
        }
    }

    spawnKnight() {
        if(this.gameOver === false) {
            let x = 800;
            let y = 380;
            let knight = this.physics.add.sprite(x, y, 'knight').setScale(2)
            this.physics.add.collider(this.player, knight, this.handlePlayerObstacleCollision, null, this);
            this.physics.add.collider(this.axe, knight, this.handleAxeCollision, null, this);
            knight.body.setSize(knight.width * 0.6, knight.height * 0.6);
            knight.setVelocityX(-200);
            knight.setImmovable(true);
            knight.body.allowGravity = false;
    
            if (knight.x < 100) {
                knight.destroy();
            }
        }
    }

    spawnCoin() {
        if(this.gameOver === false) {
            let x = 800;
            let y = 380;
            let coin = this.physics.add.sprite(x, y, 'coin').setScale(2)
            this.physics.add.collider(this.player, coin, this.handlePlayerCoinCollision, null, this);
        
            coin.setVelocityX(-200);
            coin.body.allowGravity = false;
    
            if (coin.x < 100) {
                coin.destroy();
            }
        }
    }

    handlePlayerObstacleCollision(player, obstacle) {
        this.player.setVelocityX(0);
        this.gameOver = true;
    }

    handlePlayerCoinCollision(player, coin) {
        this.sound.play('coinpickup');
        this.p1Score += 50;
        this.player.setVelocityX(0);
        coin.destroy();
    }
    
    handleAxeCollision(axe, obstacle) {
        obstacle.destroy()
        this.sound.play('knighthit');
        this.axe.setActive(false).setVisible(false);
        this.axe.setVelocityX(0);
        this.axe.body.setEnable(false);
    }
}