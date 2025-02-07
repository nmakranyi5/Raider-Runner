// Rocket prefab
class Barricade extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
      scene.add.existing(this);
      scene.physics.add.existing(this);

      this.setVelocityX(-200);
      this.setImmovable(true);
      this.setCollideWorldBounds(false);
    }

    update(){
    }

    reset() {
    }
}