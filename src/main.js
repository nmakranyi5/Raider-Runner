// Author: Nikolas Makranyi
// Title: Raider Runner
// Approx. Time: 20 hours
// Creative Tilt:
/* An interesting technical feature that my game has is that it allows the player to throw an axe and destroy
obstacles. I thought this was unique, as since the runner is a warrior, I thought allowing the player to
destroy obstacles in their path would be an interesting twist. In particular, I like how I made the axe spin,
which I had to look at documentation to find out how to do. 

For the visual style, since I am not much of an artist, I am not particularily talented at making sprites, but
I am happy with what I made. Since this was my first real time creating sprites like this, I think that for a first
time, I didn't do too badly. I thought that for the raider, the illusion of the player's helment moving was a pretty cool effect.
*/

let keySPACE;

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Title, Menu, Credits, Play ]
}

// reserve keyboard bindings
let keyJUMP, keyRESET, keyLEFT, keyRIGHT, keyATTACK, keyC;

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;