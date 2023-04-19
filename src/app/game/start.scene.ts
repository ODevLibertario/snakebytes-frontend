import Phaser from 'phaser';


export class StartScene extends Phaser.Scene {

  private startButton: Phaser.GameObjects.Text | undefined

  constructor() {
    super({ key: 'start' });
  }

  create() {

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 128, 'logo')

    let scene = this.scene

    this.startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Play')
      .setOrigin(0.5)
      .setPadding(15)
      .setFontStyle('bold')
      .setStyle({ backgroundColor: '#F6911D' })
      .setInteractive({ useHandCursor: true })
      .once('pointerdown', function () {
        scene.start('game');
      }, this)
      .on('pointerover', () => this.startButton?.setStyle({ fill: '#f39c12' }))
      .on('pointerout', () => this.startButton?.setStyle({ fill: '#FFF' }))

  }
  preload() {
    this.load.image('logo', '/assets/snakebytes.png');
  }

  startGame() {
    console.log(this.scene)
    this.scene.start('snake')
  }

  override update(time: any, delta: any) {

  }
}
