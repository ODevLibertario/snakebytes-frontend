import Phaser from "phaser";
import Point = Phaser.Geom.Point;
import Group = Phaser.GameObjects.Group;
import {Coin} from "./coin.gameobject";
import Vector2 = Phaser.Math.Vector2;
import ScenePlugin = Phaser.Scenes.ScenePlugin;
import Sprite = Phaser.GameObjects.Sprite;
import {PlayLog} from "../PlayLog";
import {Observable} from "rxjs";

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

export class Snake {
  private headPosition: Point
  private tail: Point
  private body: Group
  private head: Sprite
  alive: boolean
  private readonly movementDelay: number
  private moveTime: number
  private heading: number
  private direction: number
  private snakePiecePositions: Point[] = []
  private scoreText: Phaser.GameObjects.Text | undefined
  private score: number | undefined
  private scenePlugin: ScenePlugin
  private playLog: PlayLog = new PlayLog()
  private scoreIncrement: number | undefined
  private collectCoinCallback: (currentX: number, currentY: number) => Observable<{x: number, y: number}>
  private finishGameCallback: (currentX: number, currentY: number, playLog: any[]) => Observable<Object>

  constructor(scene: Phaser.Scene,
              scenePlugin: ScenePlugin,
              x: number,
              y: number,
              scoreText: Phaser.GameObjects.Text,
              movementDelay: number,
              scoreIncrement: number,
              collectCoinCallback: (currentX: number, currentY: number) => Observable<{x: number, y: number}>,
              finishGameCallback: (currentX: number, currentY: number, playLog: any[]) => Observable<Object>) {
    this.scenePlugin = scenePlugin
    this.headPosition = new Phaser.Geom.Point(x, y);

    this.body = scene.add.group();

    this.head = this.body.create(x * 32, y * 32, 'head');
    this.head.setTexture('head-right')
    this.head.setOrigin(0)
    this.alive = true;

    this.finishGameCallback = finishGameCallback
    this.collectCoinCallback = collectCoinCallback
    this.movementDelay = movementDelay;
    this.scoreIncrement = scoreIncrement;

    this.moveTime = 0;

    this.score = 0;

    this.tail = new Phaser.Geom.Point(x, y);

    this.scoreText = scoreText

    this.heading = RIGHT;
    this.direction = RIGHT;
  }

  update(time: any) {
    if (time >= this.moveTime){
      this.move(time);
      return true
    } else {
      return false
    }
  }

  faceLeft() {
    if (this.direction === UP || this.direction === DOWN) {
      this.heading = LEFT;
      this.head.setTexture('head-left')
    }
  }

  faceRight(){
    if (this.direction === UP || this.direction === DOWN) {
      this.heading = RIGHT;
      this.head.setTexture('head-right')
    }
  }

  faceUp() {
    if (this.direction === LEFT || this.direction === RIGHT) {
      this.heading = UP;
      this.head.setTexture('head-up')
    }
  }

  faceDown() {
    if (this.direction === LEFT || this.direction === RIGHT) {
      this.heading = DOWN;
      this.head.setTexture('head-down')
    }
  }

  move(time: any) {
    /**
     * Based on the heading property (which is the direction the pgroup pressed)
     * we update the headPosition value accordingly.
     *
     * The Math.wrap call allow the snake to wrap around the screen, so when
     * it goes off any of the sides it re-appears on the other.
     */

    switch (this.heading)
    {
      case LEFT:
        this.playLog.recordMovement("L")
        this.headPosition.x--;
        break;

      case RIGHT:
        this.playLog.recordMovement("R")
        this.headPosition.x++;
        break;

      case UP:
        this.playLog.recordMovement("U")
        this.headPosition.y--;
        break;

      case DOWN:
        this.playLog.recordMovement("D")
        this.headPosition.y++;
        break;
    }

    this.direction = this.heading;

    let tailVector: Vector2 = Vector2.ZERO

    //  Update the body segments
    Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 32, this.headPosition.y * 32, 1, tailVector);

    this.tail.x = tailVector.x
    this.tail.y = tailVector.y

    const hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), {x: this.head.x, y: this.head.y}, 1);

    if(
      this.headPosition.x <= -1 || this.headPosition.x >= 25 ||
      this.headPosition.y <= -1 || this.headPosition.y >= 19 ||
      hitBody
    ){
      this.die();
      this.finishGameCallback(this.headPosition.x, this.headPosition.y, this.playLog.get()).subscribe(result => {}, error => console.error(error))
      return false;
    } else {
      //  Update the timer ready for the next movement
      this.moveTime = time + this.movementDelay;
      this.updateSnakePiecePositions();
      return true;
    }
  }

  private die() {
    this.alive = false;
    this.scenePlugin.start('game-over', {score: this.score})
  }

  grow(){
    const newPart = this.body.create(this.tail.x, this.tail.y, 'body');
    newPart.setOrigin(0);
  }

  collideWithCoin(coin: Coin) {
    if (this.head.x === coin.x && this.head.y === coin.y) {
      this.grow();
      coin.setVisible(false);
      this.collectCoinCallback(this.head.x / 32, this.head.y / 32).subscribe(newCoin => {
        coin.setVisible(true);
        coin.eat(newCoin.x, newCoin.y);
        this.score = this.score!! + this.scoreIncrement!!;
        this.scoreText!!.setText("Score: "+ this.score)
        this.playLog.recordEat(this.head.x, this.head.y)

      }, error => {return false})
      return true;
    } else {
      return false;
    }
  }

  updateSnakePiecePositions () {

    let positions = this.snakePiecePositions
    let counter = 0

    //  Remove all body pieces from valid positions list
    this.body.children.each(function (segment: any) {

      var bx = segment.x / 32;
      var by = segment.y / 32;

      positions[counter] = new Point(bx, by)

      return null
    });

    this.snakePiecePositions = positions
  }

}
