// Coin prefab
class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
      scene.add.existing(this);
      //this.sfxShot = scene.sound.add('sfx-shot');
    }

    update(){

    }

    // reset rocket "to ground"
    reset() {

    }
}