import Phaser from 'phaser';
import Point = Phaser.Geom.Point;
import Group = Phaser.GameObjects.Group;
import GameObject = Phaser.GameObjects.GameObject;
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import {Snake} from "./snake.gameobject";
import {Coin} from "./coin.gameobject";
import TextStyle = Phaser.GameObjects.TextStyle;




export class GameScene extends Phaser.Scene {
  private snake: Snake | undefined
  private coin: Coin | undefined
  private cursors: CursorKeys | undefined
  private scoreText: Phaser.GameObjects.Text | undefined
  private startButton: Phaser.GameObjects.Text | undefined

  constructor() {
    super({ key: 'game' });
  }

  create() {

    //  Create our keyboard controls
    // TODO support mobile
    this.cursors = this.input.keyboard!!.createCursorKeys();
    this.scoreText = this.add.text(16, 16, 'Score: 0');

    this.snake = new Snake(this, this.scene, 8, 8, this.scoreText);
    this.coin = new Coin(this, 3, 4);
  }
  preload() {
    this.load.image('coin', '/assets/coin.png');
    this.load.image('body', '/assets/body.png');
    this.load.image('head-up', '/assets/head-u.png');
    this.load.image('head-down', '/assets/head-d.png');
    this.load.image('head-left', '/assets/head-l.png');
    this.load.image('head-right', '/assets/head-r.png');
  }

  override update(time: any, delta: any) {
    if (!this.snake || !this.cursors || !this.coin || !this.snake.alive) {
      return;
    }

    /**
     * Check which key is pressed, and then change the direction the snake
     * is heading based on that. The checks ensure you don't double-back
     * on yourself, for example if you're moving to the right and you press
     * the LEFT cursor, it ignores it, because the only valid directions you
     * can move in at that time is up and down.
     */
    if (this.cursors.left.isDown) {
      this.snake.faceLeft();
    }
    else if (this.cursors.right.isDown) {
      this.snake.faceRight();
    }
    else if (this.cursors.up.isDown) {
      this.snake.faceUp();
    }
    else if (this.cursors.down.isDown) {
      this.snake.faceDown();
    }

    if (this.snake.update(time))
    {
      //  If the snake updated, we need to check for collision against food
      this.snake.collideWithCoin(this.coin);
    }
  }
}
