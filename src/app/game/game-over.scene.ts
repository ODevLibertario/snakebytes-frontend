import Phaser from 'phaser';
import Point = Phaser.Geom.Point;
import Group = Phaser.GameObjects.Group;
import GameObject = Phaser.GameObjects.GameObject;
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import {Snake} from "./snake.gameobject";
import {Coin} from "./coin.gameobject";
import TextStyle = Phaser.GameObjects.TextStyle;
import Texture = Phaser.Textures.Texture;




export class GameOverScene extends Phaser.Scene {

  private button: Phaser.GameObjects.Text | undefined
  private gameOverText: Phaser.GameObjects.Text | undefined
  private score: number | undefined

  constructor() {
    super({ key: 'game-over' });
  }

  init (data: any)
  {
    this.score = data.score;
  }

  create() {
    this.gameOverText = this.add.text(this.cameras.main.centerX - 350, this.cameras.main.centerY - 128, 'Game Over, Score: '+this.score);
    this.gameOverText.setFontSize(45)
    this.gameOverText.setColor("white")

    let scene = this.scene

    this.button = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Play Again')
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#F6911D' })
      .setInteractive({ useHandCursor: true })
      .once('pointerdown', function () {
        scene.start('game');
      }, this)
      .on('pointerover', () => this.button?.setStyle({ fill: '#f39c12' }))
      .on('pointerout', () => this.button?.setStyle({ fill: '#FFF' }))

  }

  override update(time: any, delta: any) {

  }
}
