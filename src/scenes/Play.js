let highScore = 0;

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
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
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add raider (p1)
        //this.raider = new Raider(this, game.config.width/4, game.config.height - borderUISize - borderPadding * 8, 'raider').setOrigin(0.5, 0).setScale(1.5);
        this.player = this.physics.add.sprite(game.config.width/4, game.config.height - borderUISize - borderPadding * 7, 'raider', 7).setScale(1.5)
        this.player.anims.play('walk-right', true);
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(1000);
        this.axe = this.physics.add.sprite(this.player.x, this.player.y, 'axe').setScale(1.5).setOrigin(0.5, 0).setVisible(false).setActive(false);
        // add spaceships (x3)
        // define keys
        keyATTACK = this.input.activePointer;

        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        // initialize score
        this.p1Score = 0;
        // display score
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
            fixedWidth: 100
        }

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
        this.originalTime = game.settings.gameTimer;
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.highScoreText = this.add.text(borderUISize + 467, borderUISize + borderPadding*2, highScore, highScoreConfig);
        this.timerText = this.add.text(borderUISize + 278, borderUISize + borderPadding*4.3, 0, timeConfig);
        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
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

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true;
        }, null, this);
    }

    update() {
        if (keyATTACK.isDown) {
            this.throwAxe();
        }
        if (this.axe.x > game.config.width - borderUISize - 15) {
            this.axe.setActive(false).setVisible(false);
            this.axe.setVelocityX(0);
        }
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            game.settings.gameTimer = this.originalTime; // set timer back to original time
            this.scene.restart()
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }

        if (Phaser.Input.Keyboard.JustDown(keyJUMP)) {
            this.player.setVelocityY(-500);
        }

        this.background.tilePositionX -= 4;
        /*
        if(!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship04)
        }
        */
        if(highScore < this.p1Score)
        {
            highScore = this.p1Score;
        }
    }

    throwAxe()
    {
        if (!this.axe.active) {
            this.axe.setPosition(this.player.x, this.player.y);
            this.axe.setVisible(true);
            this.axe.setActive(true);
            this.axe.setVelocityX(400);
            this.axe.setAngularVelocity(100);
        }
    }
    /*
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } else {
          return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');            // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset();                        // reset ship position
          ship.alpha = 1;                      // make ship visible again
          boom.destroy();                      // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        if(this.p1Score > this.highScore)
        {
            highScore = this.p1Score;
            this.highScoreText.text = this.p1Score;
        }
        let explosionNum = Math.floor(Math.random() * 5);
        if(explosionNum === 0)
        {
            this.sound.play('sfx-explosion'); 
        }
        else if(explosionNum === 1)
        {
            this.sound.play('sfx-explosion2'); 
        }
        else if(explosionNum === 2)
        {
            this.sound.play('sfx-explosion3'); 
        }
        else if(explosionNum === 3)
        {
            this.sound.play('sfx-explosion4'); 
        }
        else
        {
            this.sound.play('sfx-explosion5');   
        }  
    }
        */
}