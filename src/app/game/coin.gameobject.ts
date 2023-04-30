import Phaser, {Scene} from "phaser";

export class Coin extends Phaser.GameObjects.Image {

  constructor(scene: Scene, x: number, y: number){
    super(scene, x, y, 'coin')

    this.setPosition(x * 32, y * 32);
    this.setOrigin(0);

    scene.children.add(this);
  }

  eat(x: number, y: number) {
    this.setPosition(x * 32, y * 32);
  }
}
