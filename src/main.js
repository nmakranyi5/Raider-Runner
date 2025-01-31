// Author: Nikolas Makranyi
// Title: Raider Runner
// Approx. Time: 20 hours

let keySPACE;

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Title, Menu, Play ]
}

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;